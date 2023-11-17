import { v4 as uuidv4 } from 'uuid'
import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'

import NumberField from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/NumberField'
import { pleaseSmaller } from '@/numberValidator'

import { useRef, useState } from 'react'
import { OpenModal } from '../OtherIncomesForm'
import OtherIncomesFormButtons from './OtherIncomesFormButtons'

const maxValue = 1_000_000
const NetTaxableIncomeForm = ({
    handleClose,
    openModal
}: {
    handleClose: () => void
    openModal: OpenModal
}) => {
    const isChangesRef = useRef(false)

    const { setQueryParams, queryParams } = useSimulationContext()
    const { netTaxableIncomes } = queryParams.otherIncomes
    const editValuesIdx =
        openModal.editId !== null
            ? netTaxableIncomes.findIndex(
                  (income) => income.id === openModal.editId
              )
            : null
    const [netBeforeTaxIncome, setNetBeforeTaxIncome] = useState(
        editValuesIdx !== null
            ? netTaxableIncomes[editValuesIdx].netBeforeTaxIncome
            : 0
    )

    const handleChange = (value: number) => {
        isChangesRef.current = true
        setNetBeforeTaxIncome(value)
    }

    const handleSubmit = () => {
        setQueryParams((prev) => {
            const state = { ...prev }
            if (openModal.editId !== null) {
                state.otherIncomes.netTaxableIncomes[
                    editValuesIdx as number
                ].netBeforeTaxIncome = netBeforeTaxIncome
            } else {
                state.otherIncomes.netTaxableIncomes.push({
                    id: uuidv4(),
                    netBeforeTaxIncome
                })
            }
            return state
        })
        handleClose()
    }

    return (
        <>
            <NumberField
                id='netTaxableIncome'
                mainLabel={'net_taxable_income'}
                labelJustify={'justify-evenly'}
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
            <OtherIncomesFormButtons
                handleSubmit={handleSubmit}
                openModal={openModal}
                isSubmitDisabled={
                    netBeforeTaxIncome > maxValue ||
                    netBeforeTaxIncome === 0 ||
                    isChangesRef.current === false
                }
                handleClose={handleClose}
            />
        </>
    )
}

export default NetTaxableIncomeForm
