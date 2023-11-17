import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import { v4 as uuidv4 } from 'uuid'
import NumberField from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/NumberField'
import NumberInput from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/NumberInput'
import RadioButtons from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/RadioButtons'
import Select from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/Select'
import { condiStyle, dict, joinString } from '@/utils/utils'
import { useEffect, useRef, useState } from 'react'
import Label, {
    ErrorMessage,
    WarningMessage
} from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/Label'
import { pleaseSmaller } from '@/numberValidator'
import {
    ErrorObject,
    FieldErrorObj
} from '@/app/simulateur-de-statuts-juridiques-pour-freelances/types'
import { OpenModal } from '../OtherIncomesForm'
import { defaultRentalErrorObj, numberFieldsMaxObj } from '../utils'
import { getMEFurnishedWarning } from '@/GetMEThresholdsWarnings'
import OtherIncomesFormButtons from './OtherIncomesFormButtons'
import { FormGroup } from './UnfurnishedRentalForm'
import { CenteredInfoLink } from '@/app/blog/reusable-components'

import RequiredField from '@/app/components/RequiredField'
import { SimulationParams } from '../../../../../../../common-types/general-types'

// COPY IN Unfurnished
const FurnishedRentalForm = ({
    handleClose,
    openModal
}: {
    handleClose: () => void
    openModal: OpenModal
}) => {
    const isChangesRef = useRef(false)

    const { setQueryParams, queryParams } = useSimulationContext()
    const { furnishedRentals } = queryParams.otherIncomes

    const hasExistingFurnishedRentals =
        furnishedRentals.length - (openModal.editId ? 1 : 0) > 0

    const editValuesIdx =
        openModal.editId !== null
            ? furnishedRentals.findIndex(
                  (income) => income.id === openModal.editId
              )
            : null

    const editFormValues =
        editValuesIdx !== null
            ? queryParams.otherIncomes.furnishedRentals[editValuesIdx]
            : null

    const hasNonMEFurnishedRentals = furnishedRentals.some(
        (rental) => !rental.isME
    )
        ? true
        : false

    const [isD2, setIsD2] = useState(
        editFormValues ? editFormValues.isD2 : false
    )

    const [isME, setIsME] = useState(
        editFormValues
            ? editFormValues.isME
            : hasNonMEFurnishedRentals
            ? false
            : true
    )
    const [rents, setRents] = useState(
        editFormValues ? editFormValues.rents : 0
    )
    const [expenses, setExpenses] = useState(
        editFormValues ? editFormValues.expenses : 0
    )
    const [expensesLoan, setExpensesLoan] = useState(
        editFormValues ? editFormValues.expensesLoan : 0
    )
    const [loanPayment, setLoanPayment] = useState(
        editFormValues ? editFormValues.loanPayment : 0
    )
    const [interestPayments, setInterestPayments] = useState(
        editFormValues ? editFormValues.interestPayments : 0
    )
    const [depreciationExpenses, setDepreciationExpenses] = useState(
        editFormValues ? editFormValues.depreciationExpenses : 0
    )

    const [errorObj, setErrorObj] = useState<ErrorObject>({
        ...defaultRentalErrorObj
    })
    const [isError, setIsError] = useState(false)

    const errorHandler = (errorObj: ErrorObject) => {
        setErrorObj(errorObj)
        setIsError(
            Object.values(errorObj).some(
                (obj: FieldErrorObj) => obj.error !== ''
            )
        )
    }

    const numberInputValidation = (
        key: keyof typeof numberFieldsMaxObj,
        value: number
    ) => {
        if (value > numberFieldsMaxObj[key]) {
            errorHandler({
                ...errorObj,
                [key]: {
                    warning: '',
                    error: pleaseSmaller(numberFieldsMaxObj[key], false)
                }
            })
        } else {
            const warning =
                key === 'rents' && isME
                    ? getMEFurnishedWarning(
                          queryParams,
                          value,
                          isD2,
                          openModal.editId || ''
                      )
                    : ''
            errorHandler({
                ...errorObj,
                [key]: { warning, error: '' }
            })
        }
    }

    const handleSubmit = () => {
        const newRentalObj = {
            isD2,
            isME,
            rents,
            expenses,
            expensesLoan,
            loanPayment,
            interestPayments,
            depreciationExpenses
        }
        setQueryParams((prev: SimulationParams) => {
            const state = { ...prev }
            if (editValuesIdx !== null) {
                state.otherIncomes.furnishedRentals[editValuesIdx] = {
                    id: openModal.editId as string,
                    ...newRentalObj
                }
            } else {
                state.otherIncomes.furnishedRentals.push({
                    id: uuidv4(),
                    ...newRentalObj
                })
            }
            return state
        })
        handleClose()
    }

    const selectOptions = [
        { name: dict('declarant') + ' 1', value: 'false' },
        { name: dict('declarant') + ' 2', value: 'true' }
    ]
    const taxSchemeOptions = [
        { title: dict('furnished_ME') as string, value: 'true' },
        { title: dict('real') as string, value: 'false' }
    ]

    useEffect(() => {
        if (isChangesRef.current === false) {
            isChangesRef.current = true // does not trigger re-render => allows form validation on next render ( => after changes are made)
        }
        if (isME) {
            // needs to reset depreciation to 0 and to get warnings
            setDepreciationExpenses(0)
            const rentsWarning = getMEFurnishedWarning(
                queryParams,
                rents,
                isD2,
                openModal.editId || ''
            )

            if (rentsWarning || errorObj.depreciationExpenses.error) {
                errorHandler({
                    ...errorObj,
                    depreciationExpenses: {
                        error: '',
                        warning: ''
                    },
                    rents: {
                        ...errorObj.rents,
                        warning: rentsWarning
                    }
                })
            }
        } else if (errorObj.rents.warning) {
            setErrorObj((prev) => ({
                ...prev,
                rents: {
                    ...prev.rents,
                    warning: ''
                }
            }))
        }
    }, [isME, isD2])

    useEffect(() => {
        if (expenses === 0) {
            // allows clearing expensesLoan when it becomes disabled
            setExpensesLoan(0)
        }
    }, [expenses])

    return (
        <>
            {queryParams.isMarried && (
                <Select
                    options={selectOptions}
                    mainLabel={'declarant'}
                    id={'isD2'}
                    onChange={(value: string) =>
                        setIsD2(value === 'true' ? true : false)
                    }
                    value={isD2.toString()}
                    labelWidth='w-full'
                />
            )}
            <Label
                mainLabel={'tax_scheme'}
                labelWidth={'w-full'}
                labelWhiteSpace={'whitespace-nowrap'}
                labelCursor={''}
            >
                <RadioButtons
                    options={taxSchemeOptions}
                    handleChange={(value: string) =>
                        setIsME(value === 'true' ? true : false)
                    }
                    value={isME.toString()}
                    gapX={'gap-x-4 sm:gap-x-6'}
                    justify={'justify-end'}
                />
            </Label>
            <NumberField
                isModal
                id='rents'
                isRequired
                error={errorObj.rents.error}
                warning={errorObj.rents.warning}
                value={rents}
                mainLabel={'rents'}
                handleChange={(value: number) => {
                    numberInputValidation('rents', value)
                    setRents(value)
                }}
                labelWidth='w-full'
            />
            <FormGroup>
                <NumberField
                    isModal
                    labelWhiteSpace={'whitespace-nowrap'}
                    id='expenses'
                    error={errorObj.expenses.error}
                    value={expenses}
                    mainLabel={isME ? 'actual_expenditures' : 'expenditures'}
                    subLabel={'excluding_loan'}
                    handleChange={(value: number) => {
                        numberInputValidation('expenses', value)
                        setExpenses(value)
                    }}
                    labelWidth='w-full'
                    bubbleContentNode={
                        <>
                            <p>
                                {dict(
                                    isME
                                        ? 'rental_expenses_bubble_ME'
                                        : 'furnished_rental_expenses_bubble_real'
                                )}
                            </p>
                            {!isME && (
                                <CenteredInfoLink>
                                    <a
                                        target='_blank'
                                        href='https://www.impots.gouv.fr/particulier/les-regimes-dimposition#:~:text=Cr%C3%A9er%20mon%20entreprise.-,D%C3%A9duction%20des%20charges,-Le%20loueur%20en'
                                    >
                                        {dict('more_information')}
                                    </a>
                                </CenteredInfoLink>
                            )}
                        </>
                    }
                />
                <label
                    htmlFor='expensesLoan'
                    className={joinString(
                        condiStyle([
                            expenses === 0,
                            'opacity-50 pointer-events-none'
                        ]),
                        'pl-2 flex gap-3 items-center justify-center'
                    )}
                >
                    {dict('expenses_financed_via_loan_arr', 0)}
                    <NumberInput
                        id='expensesLoan'
                        handleChange={(value: number) => {
                            //numberInputValidation('expensesLoan', value)
                            setExpensesLoan(value)
                        }}
                        value={expensesLoan}
                        disabled={expenses === 0}
                    />
                    {dict('expenses_financed_via_loan_arr', 1)}
                </label>
                {expensesLoan > expenses && (
                    <ErrorMessage message={pleaseSmaller(expenses, false)} />
                )}
            </FormGroup>

            <NumberField
                isModal
                id='interestPayments'
                error={errorObj.interestPayments.error}
                value={interestPayments}
                mainLabel='loan_interest_part'
                handleChange={(value: number) => {
                    numberInputValidation('interestPayments', value)
                    setInterestPayments(value)
                }}
                labelWidth='w-full'
            />
            <NumberField
                isModal
                id='loanPayment'
                error={errorObj.loanPayment.error}
                value={loanPayment}
                mainLabel='loan_principal_part'
                handleChange={(value: number) => {
                    numberInputValidation('loanPayment', value)
                    setLoanPayment(value)
                }}
                labelWidth='w-full'
            />

            {!isME && (
                <NumberField
                    isModal
                    id='depreciationExpenses'
                    error={errorObj.depreciationExpenses.error}
                    value={depreciationExpenses}
                    mainLabel='depreciation'
                    handleChange={(value: number) => {
                        numberInputValidation('depreciationExpenses', value)
                        setDepreciationExpenses(value)
                    }}
                    labelWidth='w-full'
                    bubbleContentNode={
                        <>
                            <p>{dict('depreciation_bubble')}</p>
                            <CenteredInfoLink>
                                <a
                                    href='https://www.impots.gouv.fr/particulier/les-regimes-dimposition#:~:text=D%C3%A9duction%20des%20amortissements'
                                    target={'_blank'}
                                >
                                    Plus d&apos;information
                                </a>
                            </CenteredInfoLink>
                        </>
                    }
                />
            )}
            {hasExistingFurnishedRentals && (
                <WarningMessage
                    message={dict('existing_furished_rentals_warning')}
                />
            )}
            <RequiredField />
            <OtherIncomesFormButtons
                handleSubmit={handleSubmit}
                isSubmitDisabled={
                    isError ||
                    rents === 0 ||
                    isChangesRef.current === false ||
                    expensesLoan > expenses
                }
                openModal={openModal}
                handleClose={handleClose}
            />
        </>
    )
}

export default FurnishedRentalForm
