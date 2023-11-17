import { v4 as uuidv4 } from 'uuid'
import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'

import NumberField from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/NumberField'
import { pleaseSmaller } from '@/numberValidator'

import { useRef, useState } from 'react'
import { OpenModal } from '../OtherIncomesForm'
import IsScaleOption from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/form-fields/isScaleOption'
import OtherIncomesFormButtons from './OtherIncomesFormButtons'

const maxValue = 1_000_000
const FinancialIncomeForm = ({
    handleClose,
    openModal
}: {
    handleClose: () => void
    openModal: OpenModal
}) => {
    const isChangesRef = useRef(false)
    const { setQueryParams, queryParams } = useSimulationContext()
    const { financialIncomes } = queryParams.otherIncomes

    const editValuesIdx =
        openModal.editId !== null
            ? financialIncomes.findIndex(
                  (income) => income.id === openModal.editId
              )
            : null

    const [netBeforeTaxIncome, setNetBeforeTaxIncome] = useState(
        editValuesIdx !== null
            ? financialIncomes[editValuesIdx].netBeforeTaxIncome
            : 0
    )
    const [localIsScaleOption, setLocalIsScaleOption] = useState(
        queryParams.isScaleOption
    )

    const handleChange = (value: number) => {
        isChangesRef.current = true
        setNetBeforeTaxIncome(value)
    }

    const handleSubmit = () => {
        setQueryParams((prev) => {
            const state = { ...prev }
            if (openModal.editId !== null) {
                state.otherIncomes.financialIncomes[
                    editValuesIdx as number
                ].netBeforeTaxIncome = netBeforeTaxIncome
            } else {
                state.otherIncomes.financialIncomes.push({
                    id: uuidv4(),
                    netBeforeTaxIncome
                })
            }
            state.isScaleOption = localIsScaleOption
            return state
        })
        handleClose()
    }

    return (
        <>
            <NumberField
                id='financialIncome'
                mainLabel={'financial_incomes'}
                labelWidth={'w-fit'}
                labelWhiteSpace={'whitespace-nowrap'}
                value={netBeforeTaxIncome}
                handleChange={handleChange}
                isModal
                error={
                    netBeforeTaxIncome > maxValue
                        ? pleaseSmaller(maxValue, false)
                        : ''
                }
            />
            <IsScaleOption
                handleChange={() => {
                    isChangesRef.current = true
                    setLocalIsScaleOption(!localIsScaleOption)
                }}
                isModal
            />
            <OtherIncomesFormButtons
                handleSubmit={handleSubmit}
                isSubmitDisabled={
                    netBeforeTaxIncome > maxValue ||
                    netBeforeTaxIncome === 0 ||
                    isChangesRef.current === false
                }
                openModal={openModal}
                handleClose={handleClose}
            />
        </>
    )
}

export default FinancialIncomeForm
