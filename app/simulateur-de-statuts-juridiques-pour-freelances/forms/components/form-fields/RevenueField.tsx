//import dict from 'dict/fr.json'
import NumberField from '../raw/NumberField'
import { useEffect, useState } from 'react'
import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import RoundedBox from '@/app/components/RoundedBox'
import { dict } from '@/utils/utils'
import { SimulationParams } from '../../../../../../common-types/general-types'

const calculateDailyRate = (nbOfWeeks: number, revenue: number) =>
    Math.round(revenue / (nbOfWeeks * 5))

const calculateRevenue = (nbOfWeeks: number, dailyRate: number) =>
    nbOfWeeks * 5 * dailyRate

type RevenueFieldType = {
    id: keyof SimulationParams
    isMonthly: boolean
    handleRevenueChange: (value: number) => void
    revenueValue: number
    isFromOutside?: boolean
}
export const RevenueValueField = ({
    id,
    isMonthly,
    handleRevenueChange,
    revenueValue,
    isFromOutside = false
}: RevenueFieldType) => {
    return (
        <NumberField
            mainLabel='revenue'
            subLabel={isMonthly ? 'monthly_masc_sing' : 'yearly_masc_sing'}
            id={id}
            handleChange={handleRevenueChange}
            value={isMonthly ? Math.round(revenueValue / 12) : revenueValue}
            isNonZero
            key={id}
            isRequired
            bubbleContentNode={<p>{dict('revenue_bubble')}</p>}
            labelMaxWidth={'max-w-[330px]'}
            labelWhiteSpace={'whitespace-nowrap'}
            isFromOutside={isFromOutside}
        />
    )
}

type Type = {
    id: keyof SimulationParams
    isMonthly: boolean
}
const RevenueFields = ({ id, isMonthly }: Type) => {
    const { handleAddParams, queryParams, savedParams } = useSimulationContext()
    const isD2 = id.includes('D2')
    const nbOfWeeksId = ('nbOfWeeks' +
        (isD2 ? 'D2' : '')) as keyof SimulationParams
    const dailyRateId = ('dailyRate' +
        (isD2 ? 'D2' : '')) as keyof SimulationParams

    const [revenueValue, setRevenueValue] = useState(queryParams[id] as number)
    const [nbOfWeeksValue, setNbOfWeeksValue] = useState(
        queryParams[nbOfWeeksId] as number
    )
    const [dailyRateValue, setDailyRateValue] = useState(
        queryParams[dailyRateId] as number
    )

    const revenueChange = (value: number) => {
        setRevenueValue(value)
        handleAddParams(id, value)
    }
    const nbOfWeeksChange = (value: number) => {
        setNbOfWeeksValue(value)
        handleAddParams(nbOfWeeksId, value)
    }
    const dailyRateChange = (value: number) => {
        setDailyRateValue(value)
        handleAddParams(dailyRateId, value)
    }

    const handleRevenueChange = (value: number) => {
        value *= isMonthly ? 12 : 1
        const currentDailyRate = calculateDailyRate(nbOfWeeksValue, value)
        dailyRateChange(currentDailyRate)
        revenueChange(value)
    }

    const handleDailyRateChange = (value: number) => {
        const revenue = calculateRevenue(nbOfWeeksValue, value)
        revenueChange(revenue)
        dailyRateChange(value)
    }

    const handleNbOfWeeksChange = (value: number) => {
        const revenue = calculateRevenue(value, dailyRateValue)
        revenueChange(revenue)
        nbOfWeeksChange(value)
    }

    useEffect(() => {
        if (Object.keys(savedParams).length) {
            setRevenueValue(savedParams[id] as number)
            setNbOfWeeksValue(savedParams[nbOfWeeksId] as number)
            setDailyRateValue(savedParams[dailyRateId] as number)
        }
    }, [savedParams])

    return (
        <>
            <RevenueValueField
                isMonthly={isMonthly}
                id={id}
                handleRevenueChange={handleRevenueChange}
                revenueValue={revenueValue}
            />
            <RoundedBox
                padding='p-4'
                className='bg-slate-200 w-[250px] sm:w-[300px]'
            >
                <h3 className='font-semibold mb-2 text-center'>
                    {dict('daily_rate_title')}
                </h3>
                <div className='flex flex-col items-center gap-2 text-sm '>
                    <NumberField
                        labelWidth='w-fit'
                        mainLabel='daily_rate'
                        id='TJM'
                        value={dailyRateValue}
                        handleChange={handleDailyRateChange}
                        key='TJM'
                        width='sm'
                        stepper={20}
                        labelGap={'gap-3'}
                        labelBoldness='font-normal'
                        labelWhiteSpace={'whitespace-nowrap'}
                        bubbleContentNode={<p>{dict('daily_rate_bubble')}</p>}
                        isSmallInfoButton
                    />
                    <NumberField
                        labelWidth='w-fit'
                        id='weeks'
                        value={nbOfWeeksValue}
                        mainLabel={'labor_weeks'}
                        subLabel={'by_year'}
                        handleChange={handleNbOfWeeksChange}
                        key='weeks'
                        maxValue={52}
                        minValue={1}
                        width='xs'
                        stepper={1}
                        labelGap={'gap-3'}
                        labelBoldness='font-normal'
                        labelWhiteSpace={'whitespace-nowrap'}
                        bubbleContentNode={<p>{dict('nb_of_weeks_bubble')}</p>}
                        isSmallInfoButton
                    />
                </div>
            </RoundedBox>
        </>
    )
}

export default RevenueFields
