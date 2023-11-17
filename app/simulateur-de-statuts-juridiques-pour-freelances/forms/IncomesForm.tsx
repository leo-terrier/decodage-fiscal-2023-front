'use client'
import { useEffect, useState } from 'react'

import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import OtherIncomesForm from './incomesForms/other-incomes/OtherIncomesForm'
import PersonIncomeForm from './incomesForms/PersonIncomeForm'
import { dict } from '@/utils/utils'
import { condiStyle, joinString } from '@/utils/utils'
import Progress from './Progress'
import RequiredField from '@/app/components/RequiredField'
import { SimulationParams } from '../../../../common-types/general-types'

const IncomesForm = () => {
    const { queryParams, savedParams, setSavedParams } = useSimulationContext()
    const [openIncomeKey, setOpenIncomeKey] = useState(0)

    const handleSwitch = (key: number) => {
        setOpenIncomeKey(key)
        if (Object.keys(savedParams).length) {
            setSavedParams({} as SimulationParams)
            // allows to prevent restauring individual fields to saved param on each mounts e.g., form switch
        }
    }

    const incomeTypes = [
        {
            title: dict('declarant') + ' 1',
            key: 0,
            display: true,
            component: <PersonIncomeForm isD2={false} key={0} />,
            onClick: () => setOpenIncomeKey(0)
        },
        {
            title: dict('declarant') + ' 2',
            key: 1,
            display: queryParams.isMarried,
            component: <PersonIncomeForm isD2 key={1} />,
            onClick: () => handleSwitch(1)
        },
        {
            title: dict('other_incomes'),
            key: 2,
            display: true,
            component: <OtherIncomesForm key={2} />,
            onClick: () => handleSwitch(2)
        }
    ]

    useEffect(() => {
        if (openIncomeKey === 1 && !queryParams.isMarried) {
            setOpenIncomeKey(0)
        }
    }, [queryParams.isMarried])

    return (
        <div
            className={
                'rounded-xl rounded-t-none sm:rounded-lg sm:rounded-tl-lg sm:rounded-tr-none flex flex-col items-center justify-between w-full relative shadow-md p-6 pb-12 sm:p-8 sm:pb-8 gap-8 lg:gap-6 xl:gap-8 sm:border border-gray-300 bg-white'
            }
        >
            <nav
                className={
                    'flex w-full justify-stretch sm:w-fit sm:justify-start absolute bottom-full right-0 sm:right-[-1px]'
                }
            >
                {[...incomeTypes].reverse().map((income) => {
                    if (income.display) {
                        return (
                            <button
                                className={joinString(
                                    'w-full sm:w-fit py-[10px] sm:py-2 px-2 sm:text-base sm:px-4 rounded-t-xl sm:rounded-t-lg relative font-poppins border',
                                    condiStyle([
                                        openIncomeKey === income.key,
                                        'bg-white font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] after:translate-y-1/2 after:bg-white border-white sm:border-gray-300',
                                        'bg-gray-200 border-gray-200 sm:border-gray-300'
                                    ])
                                )}
                                onClick={income.onClick}
                                key={income.key}
                                type='button'
                            >
                                {income.title}
                            </button>
                        )
                    }
                })}
            </nav>
            {incomeTypes[openIncomeKey].component}
            <Progress className='z-40 sm:z-0 px-4 py-2 sm:static sm:px-0 sm:py-0 bg-white bg-opacity-70 rounded-lg fixed bottom-5 right-1/2 translate-x-1/2 sm:translate-x-0 sm:self-end sm:flex sm:flex-col sm:items-center' />
            {openIncomeKey !== 2 && (
                <RequiredField className='absolute bottom-3 w-full' />
            )}
        </div>
    )
}

export default IncomesForm

//
