import { useEffect, useState } from 'react'

import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import ToggleField from '../raw/ToggleField'
import { dict } from '@/utils/utils'
import { SimulationParams } from '../../../../../../common-types/general-types'

type Type = {
    id: keyof SimulationParams
}
const IsProfessional = ({ id }: Type) => {
    const { handleAddParams, queryParams, savedParams } = useSimulationContext()
    const [isProfessional, setIsProfessional] = useState(
        queryParams[id] as boolean
    )
    const toggle = () => {
        handleAddParams(id, !isProfessional)
        setIsProfessional(!isProfessional)
    }

    useEffect(() => {
        if (Object.keys(savedParams).length) {
            setIsProfessional(savedParams[id] as boolean)
        }
    }, [savedParams])

    return (
        <ToggleField
            mainLabel={'professional_activities'}
            id={id}
            isChecked={isProfessional}
            handleChange={toggle}
            bubbleContentNode={
                <p /* className='text-left' */>
                    {dict('is_professional_bubble')}
                </p>
            }
            ariaLabel={"Changer le caractère libéral ou non de l'activité"}
        />
    )
}
export default IsProfessional
