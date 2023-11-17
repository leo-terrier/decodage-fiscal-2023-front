import { useEffect, useState } from 'react'
import { SimulationParams } from '../../../../../../common-types/general-types'

import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
/* import ToggleField from '../raw/ToggleField' */
import { dict } from '@/utils/utils'
import Select from '../raw/Select'

type Type = {
    id: keyof SimulationParams
}

const optionsArr = [
    { value: 'true', name: dict('services') },
    { value: 'false', name: dict('buy_and_sell') }
]
const IsService = ({ id }: Type) => {
    const { handleAddParams, queryParams, savedParams } = useSimulationContext()
    const [isService, setIsService] = useState(queryParams[id] as boolean)

    const handleChange = (value: string) => {
        const booleanValue = value === 'true'
        handleAddParams(id, booleanValue)
        setIsService(booleanValue)
    }
    useEffect(() => {
        if (Object.keys(savedParams).length) {
            setIsService(savedParams[id] as boolean)
        }
    }, [savedParams])

    return (
        <Select
            options={optionsArr}
            id={id}
            mainLabel='activity_type'
            selectWidth='w-fit'
            labelWidth='w-full'
            bubbleContentNode={
                <p /* className='text-left' */>{dict('is_service_bubble')}</p>
            }
            value={isService ? 'true' : 'false'}
            onChange={handleChange}
        />
    )
}
export default IsService
/* const IsService = ({ id }: Type) => {
    const { handleAddParams, queryParams, savedParams } = useSimulationContext()
    const [isService, setIsService] = useState(queryParams[id] as boolean)
    const toggle = () => {
        handleAddParams(id, !isService)
        setIsService(!isService)
    }
    const isD2 = id.includes('D2')

    useEffect(() => {
        if (Object.keys(savedParams).length && !isD2) {
            setIsService(savedParams[id] as boolean)
        }
    }, [savedParams])

    return (
        <ToggleField
            mainLabel={'services_activities'}
            id={id}
            isChecked={isService}
            handleChange={toggle}
            bubbleContentNode={
                <p >{dict('is_service_bubble')}</p>
            }
        />
    )
}
export default IsService */
