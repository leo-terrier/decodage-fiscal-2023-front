import { v4 as uuidv4 } from 'uuid'
import { useEffect, useRef, useState } from 'react'

import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import NumberField from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/NumberField'
import NumberInput from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/NumberInput'
import RadioButtons from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/RadioButtons'
import { condiStyle, dict, formatCurrency, joinString } from '@/utils/utils'
import { defaultRentalErrorObj, numberFieldsMaxObj } from '../utils'
import { pleaseSmaller } from '@/numberValidator'
import Label, {
    ErrorMessage
} from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/Label'
import { maxUnfurnishedMERents } from '@/legal-data'
import {
    ErrorObject,
    FieldErrorObj
} from '@/app/simulateur-de-statuts-juridiques-pour-freelances/types'
import { OpenModal } from '../OtherIncomesForm'
import OtherIncomesFormButtons from './OtherIncomesFormButtons'
import { CenteredInfoLink } from '@/app/blog/reusable-components'
import RequiredField from '@/app/components/RequiredField'

export const FormGroup = ({ children }: { children: React.ReactNode }) => (
    <div className='flex flex-col gap-2 w-full'>{children}</div>
)

const UnfurnishedRentalForm = ({
    handleClose,
    openModal
}: {
    handleClose: () => void
    openModal: OpenModal
}) => {
    const isChangesRef = useRef(false)

    const { setQueryParams, queryParams } = useSimulationContext()
    const { unfurnishedRentals } = queryParams.otherIncomes

    const editValuesIdx =
        openModal.editId !== null
            ? unfurnishedRentals.findIndex(
                  (income) => income.id === openModal.editId
              )
            : null

    const editFormValues =
        editValuesIdx !== null
            ? queryParams.otherIncomes.unfurnishedRentals[editValuesIdx]
            : null

    const existingUnfurnishedRentals = !unfurnishedRentals.length
        ? []
        : openModal.editId
        ? unfurnishedRentals.filter((_, idx) => idx !== editValuesIdx)
        : unfurnishedRentals

    let alreadyHasRealRentals = false
    let alreadyHasMERentals = false
    if (existingUnfurnishedRentals.length) {
        if (existingUnfurnishedRentals.some((income) => income.isME)) {
            alreadyHasMERentals = true
        } else {
            alreadyHasRealRentals = true
        }
    }

    const [isME, setIsME] = useState(
        editFormValues
            ? editFormValues.isME
            : alreadyHasRealRentals
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
            errorHandler({
                ...errorObj,
                [key]: {
                    warning: '',
                    error: ''
                }
            })
        }
    }

    const validateTaxScheme = (isME: boolean) => {
        const shouldNotBeME = isME && alreadyHasRealRentals
        const shouldNotBeReal = !isME && alreadyHasMERentals
        if (shouldNotBeME || shouldNotBeReal) {
            errorHandler({
                ...errorObj,
                isME: {
                    warning: '',
                    error: dict('wrong_unfurnished_tax_scheme') as string
                }
            })
        } else {
            errorHandler({
                ...errorObj,
                isME: {
                    warning: '',
                    error: ''
                }
            })
        }
    }

    // order : only checks absolute max and if isME max condition is respected
    const validateRents = (value: number) => {
        if (isME) {
            const totalRents =
                value +
                (existingUnfurnishedRentals.length > 0
                    ? existingUnfurnishedRentals.reduce(
                          (acc, income) => acc + income.rents,
                          0
                      )
                    : 0)
            if (totalRents > maxUnfurnishedMERents) {
                errorHandler({
                    ...errorObj,
                    rents: {
                        warning: '',
                        error:
                            dict('unfurnished_ME_limit_passed_arr', 0) +
                            `(${formatCurrency(maxUnfurnishedMERents)})` +
                            dict('unfurnished_ME_limit_passed_arr', 1)
                    }
                })
                return // no reset
            }
        }
        errorHandler({
            ...errorObj,
            rents: {
                warning: '',
                error: ''
            }
        })
        numberInputValidation('rents', value)
    }

    const handleSubmit = () => {
        const newRentalObj = {
            isD2: false,
            isME,
            rents,
            expenses,
            expensesLoan,
            loanPayment,
            interestPayments,
            depreciationExpenses: 0
        }
        setQueryParams((prev) => {
            const state = { ...prev }
            if (editValuesIdx !== null) {
                state.otherIncomes.unfurnishedRentals[editValuesIdx] = {
                    id: openModal.editId as string,
                    ...newRentalObj
                }
            } else {
                state.otherIncomes.unfurnishedRentals.push({
                    id: uuidv4(),
                    ...newRentalObj
                })
            }
            return state
        })
        handleClose()
    }

    const taxSchemeOptions = [
        { title: dict('unfurnished_ME') as string, value: 'true' },
        { title: dict('real') as string, value: 'false' }
    ]

    useEffect(() => {
        if (isChangesRef.current === false) {
            // does not trigger rerender => next state update => ok to submit
            isChangesRef.current = true
        } else {
            // due to rents validation being dependent on taxScheme (isME), need to revalidate after taxScheme change
            validateRents(rents)
        }
    }, [isME])

    useEffect(() => {
        if (expenses === 0) {
            setExpensesLoan(0)
        }
    }, [expenses])

    return (
        <>
            <Label
                mainLabel={'tax_scheme'}
                error={errorObj.isME.error}
                labelWidth='w-full'
                labelWhiteSpace={'whitespace-nowrap'}
                labelJustify={'justify-between'}
                labelCursor=''
            >
                <RadioButtons
                    options={taxSchemeOptions}
                    handleChange={(value: string) => {
                        const booleanValue = value === 'true' ? true : false
                        validateTaxScheme(booleanValue)
                        setIsME(booleanValue)
                    }}
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
                value={rents}
                mainLabel={'rents'}
                handleChange={(value: number) => {
                    validateRents(value)
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
                                        : 'unfurnished_rental_expenses_bubble_real'
                                )}
                            </p>
                            {!isME && (
                                <CenteredInfoLink>
                                    <a
                                        target='_blank'
                                        href='https://www.service-public.fr/particuliers/vosdroits/F1991'
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
            <RequiredField />
            <OtherIncomesFormButtons
                handleSubmit={handleSubmit}
                handleClose={handleClose}
                isSubmitDisabled={
                    isError ||
                    rents === 0 ||
                    isChangesRef.current === false ||
                    expensesLoan > expenses
                }
                openModal={openModal}
            />
        </>
    )
}

export default UnfurnishedRentalForm
