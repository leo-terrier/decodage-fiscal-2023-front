import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import { useEffect, useRef, useState } from 'react'
import NumberField from '../raw/NumberField'
import { CorpSARLIsLowMargin } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/utils/calculateCompletionRate'
import {
    SimulationParams,
    SocialFormTypeD2
} from '../../../../../../common-types/general-types'
import Button from '../raw/Button'
import { getMaxComp } from '@/requests'
import { condiStyle, dict, formatCurrency, joinString } from '@/utils/utils'
import InfoTooltip from '@/app/components/InfoTooltip'

type Type = {
    id: keyof SimulationParams
    isMonthly: boolean
    isD2: boolean
    socialForm: SocialFormTypeD2
    isRequired?: boolean
}
const subText = (socialForm: SocialFormTypeD2, isMonthly: boolean) => {
    switch (socialForm) {
        case 'employee':
            return isMonthly ? 'monthly_gross_fem' : 'yearly_gross_fem'
        case 'SAS':
            return isMonthly ? 'monthly_net_after_tax' : 'yearly_net_after_tax'
        case 'SARL':
            return isMonthly
                ? 'monthly_net_before_tax'
                : 'yearly_net_before_tax'
    }
    throw new Error('socialForm not found')
}

type CompensationFieldType = {
    socialForm: SocialFormTypeD2
    id: keyof SimulationParams
    isMonthly: boolean
    isRequired: boolean
    isDisabled: boolean
    compensationValue: number
    handleCompensationChange: (value: number) => void
    isFromOutside?: boolean
}
export const CompensationField = ({
    socialForm,
    id,
    isRequired,
    isDisabled,
    isMonthly,
    compensationValue,
    handleCompensationChange,
    isFromOutside = false
}: CompensationFieldType) => {
    return (
        <NumberField
            mainLabel={'compensation'}
            subLabel={subText(socialForm, isMonthly)}
            id={id}
            value={
                isMonthly
                    ? Math.round(compensationValue / 12)
                    : compensationValue
            }
            handleChange={handleCompensationChange}
            isNonZero={socialForm === 'SAS' || isDisabled ? false : true}
            isRequired={isRequired}
            isDisabled={isDisabled}
            labelMaxWidth={'max-w-[330px]'}
            isFromOutside={isFromOutside}
        />
    )
}

const Compensation = ({
    isMonthly,
    socialForm,
    id,
    isD2,
    isRequired = false
}: Type) => {
    const {
        handleAddParams,
        queryParams,
        savedParams,
        isFirstRender,
        isNumberValidationError,
        isLoading,
        simulationResult
    } = useSimulationContext()
    const [compensation, setCompensation] = useState(queryParams[id] as number)
    const [isMaxCompLoading, setIsMaxCompLoading] = useState(false)
    const hideSARLMaxCompButtonRef = useRef(false)
    const SARLMaxComp = useRef(0)
    const handleCompensationChange = (value: number) => {
        value *= isMonthly ? 12 : 1
        setCompensation(value)
        handleAddParams(id as keyof SimulationParams, value)
    }

    const isCorporateTax =
        queryParams[isD2 ? 'isCorporateTaxD2' : 'isCorporateTax']

    const grossMargin =
        queryParams[isD2 ? 'revenueD2' : 'revenue'] -
        queryParams[isD2 ? 'expensesD2' : 'expenses']

    const isDisabled =
        (socialForm === 'SARL' &&
            isCorporateTax &&
            CorpSARLIsLowMargin(queryParams, isD2)) ||
        (socialForm === 'SAS' && grossMargin <= 0) // SARL : prevent further deficit on low Margin due to mandatory contributions
    // SAS prevent error message when grossMargin is <= 0 (ex: revenue = empty -> revenue = 0)

    const handleGetSARLMaxComp = async () => {
        setIsMaxCompLoading(true)
        const maxComp = parseInt(
            (await getMaxComp({
                grossMargin
            })) as unknown as string,
            10
        )
        handleCompensationChange(maxComp)
        setIsMaxCompLoading(false)
        hideSARLMaxCompButtonRef.current = true
        SARLMaxComp.current = maxComp
    }

    useEffect(() => {
        if (isDisabled) {
            handleCompensationChange(0)
        }
    }, [isCorporateTax, socialForm, isDisabled])

    useEffect(() => {
        if (Object.keys(savedParams).length) {
            setCompensation(savedParams[id] as number)
        }
    }, [savedParams])

    useEffect(() => {
        if (socialForm === 'SARL' && hideSARLMaxCompButtonRef.current) {
            hideSARLMaxCompButtonRef.current = false
        }
    }, [grossMargin, socialForm])

    useEffect(() => {
        if (
            socialForm === 'SARL' &&
            compensation !== SARLMaxComp.current &&
            hideSARLMaxCompButtonRef.current
        ) {
            hideSARLMaxCompButtonRef.current = false
        }
    }, [compensation])

    const getContribBase = () => {
        if (socialForm === 'SAS') {
            if (!isD2) {
                return simulationResult.person.contribBaseSAS
            } else if (
                simulationResult.personD2 &&
                simulationResult.personD2 !== 'N/A'
            ) {
                return simulationResult.personD2.contribBaseSAS
            }
        }
        return 0
    }

    const contribBaseSAS = getContribBase()

    return (
        <>
            <div
                className={joinString(
                    condiStyle([socialForm === 'SAS', 'mb-8 sm:mb-0']), // needed for gross Rem
                    'relative w-full sm:w-fit flex justify-center'
                )}
            >
                <CompensationField
                    id={id}
                    isMonthly={isMonthly}
                    handleCompensationChange={handleCompensationChange}
                    isDisabled={isDisabled}
                    isRequired={isRequired}
                    compensationValue={compensation}
                    socialForm={socialForm}
                />
                {contribBaseSAS > 0 &&
                    !isDisabled &&
                    !isFirstRender &&
                    !isLoading && (
                        <p className='text-sm italic font-light text-gray-600 absolute -bottom-8 w-full text-center '>
                            {dict('SAS_gross_comp')} :{' '}
                            {formatCurrency(
                                isMonthly
                                    ? (contribBaseSAS as number) / 12
                                    : (contribBaseSAS as number)
                            )}{' '}
                            <span className='ml-[2px]'>
                                <InfoTooltip
                                    isSmallInfoButton
                                    bubbleContentNode={dict(
                                        'gross_comp_info_bubble'
                                    )}
                                />
                            </span>
                        </p>
                    )}
            </div>

            {!isDisabled &&
                socialForm === 'SARL' &&
                !isNumberValidationError &&
                !isLoading &&
                !hideSARLMaxCompButtonRef.current && (
                    <div className='flex flex-col items-center justify-center'>
                        <Button
                            onClick={handleGetSARLMaxComp}
                            className='font-bold text-sky-800 underline'
                            disabled={isMaxCompLoading}
                        >
                            {dict('max_compensation')}
                        </Button>
                        {/* <p className='text-[.82rem] text-gray-400 font-semibold'>
                        {dict('comp_100_percent')}
                    </p> */}
                        <p className='text-sm text-gray-400 font-semibold'>
                            {dict('div_0_percent')}
                        </p>
                    </div>
                )}
        </>
    )
}

export default Compensation

{
    /* <NumberField
            mainLabel={'compensation'}
            subLabel={subText()}
            id={id}
            value={isMonthly ? Math.round(compensation / 12) : compensation}
            handleChange={handleCompensationChange}
            isNonZero={socialForm === 'SAS' || isDisabled ? false : true}
            isRequired={isRequired}
            isDisabled={isDisabled}
            labelMaxWidth={'max-w-[330px]'}
        /> */
}
