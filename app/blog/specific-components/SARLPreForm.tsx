'use client'
import { useRouter } from 'next/navigation'
import { CompensationField } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/form-fields/Compensation'
import { ExpensesField } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/form-fields/Expenses'
import { IsCorporateTaxField } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/form-fields/IsCorporateTax'
import IsMonthlyToggle from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/form-fields/IsMonthlyToggle'
import { RevenueValueField } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/form-fields/RevenueField'
import { ShareCapitalField } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/form-fields/ShareCapital'
import { SARLBreakEvenMarginPointPlus10 } from '@/legal-data'
import { useEffect, useState } from 'react'
import { PreFormSubmitButton } from '../reusable-components'

import { defaultQueryParams } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'

export const SARLPreForm = () => {
    const [isMonthly, setIsMonthly] = useState(false)
    const [revenueValue, setRevenueValue] = useState(0)
    const [expensesValue, setExpensesValue] = useState(0)
    const [compensationValue, setCompensationValue] = useState(0)
    const [isCorporateTax, setIsCorporateTax] = useState(true)
    const [shareCapitalValue, setShareCapitalValue] = useState(1)
    const router = useRouter()

    const handleRevenueChange = (value: number) => {
        value *= isMonthly ? 12 : 1
        setRevenueValue(value)
    }
    const handleExpensesChange = (value: number) => {
        value *= isMonthly ? 12 : 1
        setExpensesValue(value)
    }
    const handleCompensationChange = (value: number) => {
        value *= isMonthly ? 12 : 1
        setCompensationValue(value)
    }
    const handleChangeIsCorporateTax = () => {
        if (isCorporateTax) {
            setCompensationValue(0)
        }
        setIsCorporateTax(!isCorporateTax)
    }

    const isCompensationDisabled =
        revenueValue - expensesValue < SARLBreakEvenMarginPointPlus10

    const handleSubmit = () => {
        const preFormParams = {
            ...defaultQueryParams,
            revenue: revenueValue,
            socialForm: 'SARL',
            expenses: expensesValue,
            compensation: compensationValue,
            isCorporateTax,
            shareCapital: shareCapitalValue
        }
        window.localStorage.setItem('preForm', JSON.stringify(preFormParams))
        router.push(
            '/simulateur-de-statuts-juridiques-pour-freelances?isPreForm=true'
        )
    }
    useEffect(() => {
        handleCompensationChange(0)
    }, [isCompensationDisabled])

    return (
        <form className='rounded relative sm:p-2 flex flex-col gap-7 sm:w-10/12 my-7'>
            <div className='px-3 sm:p-4 py-8 flex flex-col gap-3 border-l-8  border-double bg-slate-200'>
                <IsMonthlyToggle
                    isMonthly={isMonthly}
                    setIsMonthly={setIsMonthly}
                />
                <RevenueValueField
                    id='revenue'
                    isMonthly={isMonthly}
                    handleRevenueChange={handleRevenueChange}
                    revenueValue={revenueValue}
                    isFromOutside
                />
                <ExpensesField
                    socialForm='SARL'
                    isMonthly={isMonthly}
                    id='expenses'
                    expensesValue={expensesValue}
                    handleExpensesChange={handleExpensesChange}
                    isFromOutside
                />
                {isCorporateTax && (
                    <CompensationField
                        socialForm='SARL'
                        isMonthly={isMonthly}
                        id='compensation'
                        compensationValue={compensationValue}
                        handleCompensationChange={handleCompensationChange}
                        isRequired={false}
                        isDisabled={isCompensationDisabled}
                        isFromOutside
                    />
                )}
            </div>
            <div className='flex flex-col gap-5 items-center'>
                <IsCorporateTaxField
                    isCorporateTax={isCorporateTax}
                    toggle={handleChangeIsCorporateTax}
                    id='isCorporateTax'
                    isFromOutside
                    labelWhitespace=''
                />
                {isCorporateTax && (
                    <div className='p-4'>
                        <ShareCapitalField
                            id='shareCapital'
                            shareCapitalValue={shareCapitalValue}
                            handleShareCapitalChange={(value: number) =>
                                setShareCapitalValue(value)
                            }
                            isFromOutside
                        />
                    </div>
                )}
            </div>
            <PreFormSubmitButton handleSubmit={handleSubmit} />
        </form>
    )
}
