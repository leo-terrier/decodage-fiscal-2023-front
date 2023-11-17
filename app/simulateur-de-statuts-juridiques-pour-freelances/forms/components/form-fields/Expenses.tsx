import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import { useEffect, useState } from 'react'
import NumberField from '../raw/NumberField'
import { dict } from '@/utils/utils'
import OuterLink from '@/app/components/raw/OuterLink'
import {
    SimulationParams,
    SocialFormTypeD2
} from '../../../../../../common-types/general-types'

type ExpenseFieldType = {
    isMonthly: boolean
    socialForm: SocialFormTypeD2
    id: keyof SimulationParams
    handleExpensesChange: (value: number) => void
    expensesValue: number
    isFromOutside?: boolean
}
export const ExpensesField = ({
    isMonthly,
    id,
    handleExpensesChange,
    expensesValue,
    socialForm,
    isFromOutside = false
}: ExpenseFieldType) => {
    return (
        <NumberField
            mainLabel={socialForm === 'ME' ? 'actual_expenses' : 'expenses'}
            id={id}
            subLabel={isMonthly ? 'monthly_fem_plu' : 'yearly_fem_plu'}
            value={isMonthly ? Math.round(expensesValue / 12) : expensesValue}
            handleChange={handleExpensesChange}
            labelMaxWidth={'max-w-[330px]'}
            isFromOutside={isFromOutside}
            bubbleContentNode={
                <>
                    <p /* className='text-left' */>
                        {socialForm === 'ME'
                            ? dict('expenses_bubble_ME')
                            : dict('expenses_bubble_real', isMonthly ? 1 : 0)}
                    </p>
                    {socialForm !== 'ME' && (
                        <p /* className='text-left' */>
                            {dict('expenses_bubble_real', 2)} (
                            <OuterLink
                                text={dict('more_information').toLowerCase()}
                                href='https://entreprendre.service-public.fr/vosdroits/F31973'
                            />
                            ).
                        </p>
                    )}
                </>
            }
        />
    )
}

type Type = {
    id: keyof SimulationParams
    isMonthly: boolean
    socialForm: SocialFormTypeD2
}

const Expenses = ({ isMonthly, socialForm, id }: Type) => {
    const { handleAddParams, queryParams, savedParams } = useSimulationContext()
    const [expenses, setExpenses] = useState(queryParams[id] as number)

    const handleExpensesChange = (value: number): void => {
        value *= isMonthly ? 12 : 1
        setExpenses(value)
        handleAddParams(id as keyof SimulationParams, value)
    }
    useEffect(() => {
        if (Object.keys(savedParams).length) {
            setExpenses(savedParams[id] as number)
        }
    }, [savedParams])

    return (
        <ExpensesField
            isMonthly={isMonthly}
            expensesValue={expenses}
            socialForm={socialForm}
            id={id}
            handleExpensesChange={handleExpensesChange}
        />
    )
}

export default Expenses
