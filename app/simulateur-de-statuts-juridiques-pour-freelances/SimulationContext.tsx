'use client'
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react'
import { useSearchParams } from 'next/navigation'

import { defaultValidationObj } from '@/numberValidator'
import { numberValidator } from '@/numberValidator'
import {
    fetchSimulationResult,
    retreiveSavedParams,
    stringifyParams
} from '../../requests'
import defaultResponse from '@/defaultResponse.json'
import { ErrorObject } from './types'
import { calculateCompletionRate } from './utils/calculateCompletionRate'
import {
    ErrorObj,
    ResponseShape,
    SimulationParams,
    SavedSimulation,
    ForCompareSimulationParams
} from '../../../common-types/general-types'
import { toaster } from '@/toaster'

export const defaultQueryParams: SimulationParams = {
    isMarried: false,
    nbOfChildren: 0,
    isScaleOption: false,
    globalTaxableIncomeDeduction: 0,
    otherIncomes: {
        unfurnishedRentals: [],
        furnishedRentals: [],
        financialIncomes: [],
        netTaxableIncomes: []
    },
    socialForm: 'ME',
    revenue: 0,
    expenses: 0,
    compensation: 0,
    shareCapital: 1,
    isService: true,
    isProfessional: true,
    isRegulatedActivity: false,
    isAcre: false,
    isVFL: false,
    isCorporateTax: true,
    dailyRate: 0,
    nbOfWeeks: 43,

    socialFormD2: 'employee',
    revenueD2: 0,
    expensesD2: 0,
    compensationD2: 0,
    shareCapitalD2: 1,
    isServiceD2: false,
    isProfessionalD2: false,
    isRegulatedActivityD2: false,
    isAcreD2: false,
    isVFLD2: false,
    isCorporateTaxD2: true,
    dailyRateD2: 0,
    nbOfWeeksD2: 43
}

export type ContextValues = {
    queryParams: SimulationParams
    simulationResult: ResponseShape
    handleAddParams: (
        key: keyof SimulationParams,
        value: string | boolean | number
    ) => void
    numberErrors: ErrorObject
    isNumberValidationError: boolean
    isLoading: boolean
    setQueryParams: Dispatch<SetStateAction<SimulationParams>>
    formCompletionRate: number
    isFirstRender: boolean
    savedParams: SimulationParams
    setSavedParams: Dispatch<SetStateAction<SimulationParams>>
    paramsForCompare: ForCompareSimulationParams[]
    setParamsForCompare: Dispatch<SetStateAction<ForCompareSimulationParams[]>>
    switchSimulation: (obj: SavedSimulation) => void
    saveParamsToLocalStorage: (
        payload: SimulationParams | ForCompareSimulationParams[],
        isForCompareEdit: boolean
    ) => void
    currentDisplayedParamsSavedId: null | string
}

export const SimulationContext = createContext<ContextValues>(
    {} as ContextValues
)

const defaultCompletionRate = calculateCompletionRate(defaultQueryParams, false)

export const SimulationContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const searchParams = useSearchParams()

    const [queryParams, setQueryParams] = useState(defaultQueryParams)
    const [simulationResult, setSimulationResult] = useState<ResponseShape>(
        defaultResponse as ResponseShape // TODO : find TS Error on json import of ResponseShape (GeneralInfo)
    )
    const [paramsForCompare, setParamsForCompare] = useState<
        ForCompareSimulationParams[]
    >([])
    const [formCompletionRate, setFormCompletionRate] = useState(
        defaultCompletionRate
    )
    const [isFirstRender, setIsFirstRender] = useState(true)

    const [currentDisplayedParamsSavedId, setCurrentDisplayedParamsSavedId] =
        useState<null | string>(null)

    const [isLoading, setIsLoading] = useState(true)
    const [numberErrors, setNumberErrors] =
        useState<ErrorObject>(defaultValidationObj)
    const [isNumberValidationError, setIsNumberValidationError] =
        useState(false) // a bit useless

    const handleAddParams = (key: string, value: string | boolean | number) => {
        setQueryParams((prevParams) => ({ ...prevParams, [key]: value }))
        if (Object.keys(savedParams).length > 0) {
            setSavedParams({} as SimulationParams)
            // allows to prevent restauring individual fields to saved param on each mounts => eg: socialform switch)
        }
    }
    const [savedParams, setSavedParams] = useState({} as SimulationParams)

    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

    const stringifiedParams = stringifyParams(queryParams)

    /*
    Summary :
    On each form change, callback is executed.
    If form not filled 100%, no request sent, no errors "showing" but percentage < 100% (and * required)
    If frontend error (number too large) :
    - no request sent
    - errors showing
    - if user deletes, error goes away since 0 < maxValue and new ValidationObj replacing old one
    - If error due to user bringing down the max limit by changing other field, the error shows again
    If backend number error, error shows and completion rate is diminished

localhost:3000/simulateur-de-statuts-juridiques-pour-freelances?saved-search=fjcgizyElNxTErBHEKmT

    */

    const saveParamsToLocalStorage = (
        payload: SimulationParams | ForCompareSimulationParams[],
        isForCompareEdit: boolean
    ) => {
        const savedParams: SavedSimulation = {
            params: isForCompareEdit
                ? queryParams
                : (payload as SimulationParams),
            forCompare: isForCompareEdit
                ? (payload as ForCompareSimulationParams[])
                : paramsForCompare
        }
        window.localStorage.setItem(
            'savedSimulation',
            JSON.stringify(savedParams)
        )

        const displayedSavedIndex = (
            savedParams.forCompare as ForCompareSimulationParams[]
        )
            .map((forCompare) => forCompare.params)
            .findIndex(
                (params) =>
                    JSON.stringify(params) ===
                    JSON.stringify(savedParams.params)
            )
        setCurrentDisplayedParamsSavedId(
            displayedSavedIndex === -1
                ? null
                : (savedParams.forCompare as ForCompareSimulationParams[])[
                      displayedSavedIndex
                  ].id
        )
    }

    const switchSimulation = ({ params, forCompare = [] }: SavedSimulation) => {
        setQueryParams(params) // needed to update first rendered form params via useEffect
        setSavedParams(params) // needed to update POST request body and not first rendered form params (other incomes)
        if (forCompare.length > 0) {
            setParamsForCompare(forCompare)
        }
        toaster.info({ text: 'current_situation_modified' })
    }

    useEffect(() => {
        const handlePreForm = () => {
            const res = window.localStorage.getItem('preForm')
            if (res !== null) {
                const newParams = JSON.parse(res)
                switchSimulation({
                    params: newParams as SimulationParams,
                    forCompare: []
                })
            }
            window.history.pushState(
                null,
                '',
                '/simulateur-de-statuts-juridiques-pour-freelances'
            )
        }

        async function getSimulationSavedByLink(searchId: string) {
            const res = await retreiveSavedParams(searchId as string)
            if (!res.params) {
                toaster.warning({
                    text: ['noti_lost_simulation', 'noti_lost_simulation_sub']
                })
            } else {
                switchSimulation({
                    params: res.params,
                    forCompare: res.forCompare
                })
            }
            window.history.pushState(
                null,
                '',
                '/simulateur-de-statuts-juridiques-pour-freelances'
            )
        }
        const searchId = searchParams.get('saved-search')
        const isPreForm = searchParams.get('isPreForm')

        if (typeof searchId === 'string') {
            getSimulationSavedByLink(searchId)
        }

        if (typeof isPreForm === 'string') {
            handlePreForm()
        }

        setIsLoading(false)
    }, [])

    useEffect(() => {
        const abortController = new AbortController()
        const newFormUpdate = async () => {
            setIsLoading(true)
            const frontValidationErrors = numberValidator(queryParams)
            setNumberErrors(frontValidationErrors.validationObj) //need to give right away feedback to user on its error when input change
            let currentIsNumberError = frontValidationErrors.isError
            let currentCompletion = calculateCompletionRate(
                queryParams,
                currentIsNumberError
            )
            let currentResponse = defaultResponse as ResponseShape // TODO : find TS Error on json import of ResponseShape (GeneralInfo)

            debounceTimerRef.current = setTimeout(async () => {
                setIsLoading(true) // needed it (due to timing?), aborted request resulted in isLoading = false while pending request
                if (currentCompletion === 100) {
                    try {
                        const result = (await fetchSimulationResult(
                            stringifiedParams,
                            abortController,
                            {},
                            true
                        )) as unknown
                        if (result) {
                            if (result === 'abort') {
                                setIsLoading(false)
                                return
                            }
                            if ((result as ErrorObj).isError !== undefined) {
                                setNumberErrors((result as ErrorObj).errors)
                                currentCompletion = calculateCompletionRate(
                                    queryParams,
                                    true
                                )
                                currentIsNumberError = true
                                setIsFirstRender(true)
                            } else {
                                currentResponse = result as ResponseShape
                                setIsFirstRender(false)
                                saveParamsToLocalStorage(
                                    queryParams as SimulationParams,
                                    false
                                )
                                toaster.info({
                                    text: 'noti_new_available_results',
                                    autoClose: 2000
                                })
                            }
                        }
                    } catch (e) {
                        // in case of network/server error
                        setIsLoading(false)
                        throw new Error(
                            `Error recorded check backend. Error : ${e}`
                        )
                    }
                } else {
                    setIsFirstRender(true)
                }
                setIsLoading(false)
                setSimulationResult(currentResponse)
                setFormCompletionRate(currentCompletion)
                setIsNumberValidationError(currentIsNumberError)
                if (currentIsNumberError) {
                    toaster.inputError()
                }
            }, 500) // debounce timeout, for user typing
        }
        newFormUpdate()

        return () => {
            // for subsequent request
            abortController.abort()
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stringifiedParams])
    const toggleMobileElementsVisibility = () => {
        const scrollY = window.scrollY
        const totalHeight = document.documentElement.scrollHeight
        const scrolledPercentage = scrollY ? scrollY / totalHeight : 0
        const progressElt = document.querySelector('#progress') as HTMLElement
        const mobileGoToSimulatorButton = document.querySelector(
            '#mobileGoToSimulatorButton'
        ) as HTMLElement
        if (progressElt) {
            if (scrolledPercentage < 0.1 || scrolledPercentage > 0.4) {
                progressElt.classList.add('hideElement')
            } else {
                progressElt.classList.remove('hideElement')
            }
        }
        if (mobileGoToSimulatorButton) {
            if (scrolledPercentage > 0.03) {
                mobileGoToSimulatorButton.classList.add('hideElement')
            }
        }
    }
    useEffect(() => {
        toggleMobileElementsVisibility()
        window.addEventListener('scroll', toggleMobileElementsVisibility)
        return () =>
            window.removeEventListener('scroll', toggleMobileElementsVisibility)
    }, [])

    return (
        <SimulationContext.Provider
            value={{
                queryParams,
                numberErrors,
                handleAddParams,
                simulationResult,
                isNumberValidationError,
                isLoading,
                setQueryParams,
                formCompletionRate,
                isFirstRender,
                savedParams,
                setSavedParams,
                paramsForCompare,
                setParamsForCompare,
                switchSimulation,
                saveParamsToLocalStorage,
                currentDisplayedParamsSavedId
            }}
        >
            {children}
        </SimulationContext.Provider>
    )
}

export const useSimulationContext = () => useContext(SimulationContext)
