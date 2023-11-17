import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import { useEffect, useState } from 'react'
import NumberField from '../raw/NumberField'
import { dict } from '@/utils/utils'
import { SimulationParams } from '../../../../../../common-types/general-types'

type ShareCapitalFieldType = {
    id: keyof SimulationParams
    handleShareCapitalChange: (value: number) => void
    shareCapitalValue: number
    isFromOutside?: boolean
}
export const ShareCapitalField = ({
    id,
    handleShareCapitalChange,
    shareCapitalValue,
    isFromOutside
}: ShareCapitalFieldType) => {
    return (
        <NumberField
            mainLabel={'share_capital'}
            subLabel={'and_equivalents'}
            id={id}
            value={shareCapitalValue}
            isRequired
            handleChange={handleShareCapitalChange}
            minValue={1}
            width='lg'
            bubbleContentNode={
                <>
                    <p className='text-left'>
                        {dict('share_capital_bubble_arr', 0)}
                    </p>
                    <p>{dict('share_capital_bubble_arr', 1)}</p>
                </>
            }
            labelMaxWidth={'max-w-[330px]'}
            isFromOutside={isFromOutside}
        />
    )
}
type Type = {
    id: keyof SimulationParams
}

const ShareCapital = ({ id }: Type) => {
    const { handleAddParams, queryParams, savedParams } = useSimulationContext()
    const [shareCapital, setShareCapital] = useState(queryParams[id] as number)

    const handleShareCapitalChange = (value: number) => {
        setShareCapital(value)
        handleAddParams(id, value)
    }

    useEffect(() => {
        if (Object.keys(savedParams).length) {
            setShareCapital(savedParams[id] as number)
        }
    }, [savedParams])

    return (
        <ShareCapitalField
            id={id}
            handleShareCapitalChange={handleShareCapitalChange}
            shareCapitalValue={shareCapital}
        />
    )
}

export default ShareCapital
