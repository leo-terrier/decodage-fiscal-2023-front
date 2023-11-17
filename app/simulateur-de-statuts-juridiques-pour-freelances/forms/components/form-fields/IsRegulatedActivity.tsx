import { useEffect, useState } from 'react'
import { SimulationParams } from '../../../../../../common-types/general-types'
import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import ToggleField from '../raw/ToggleField'
import { dict } from '@/utils/utils'

type Type = {
    id: keyof SimulationParams
}
const IsRegulatedActivity = ({ id }: Type) => {
    const { handleAddParams, queryParams, savedParams } = useSimulationContext()
    const [isRegulatedActivity, setIsRegulatedActivity] = useState(
        queryParams[id] as boolean
    )
    const toggle = () => {
        handleAddParams(id, !isRegulatedActivity)
        setIsRegulatedActivity(!isRegulatedActivity)
    }

    useEffect(() => {
        if (Object.keys(savedParams).length) {
            setIsRegulatedActivity(savedParams[id] as boolean)
        }
    }, [savedParams])

    return (
        <ToggleField
            mainLabel={'regulated_activities'}
            id={id}
            isChecked={isRegulatedActivity}
            labelWhiteSpace={'whitespace-nowrap'}
            handleChange={toggle}
            warning={
                isRegulatedActivity ? dict('regulated_activity_warning') : ''
            }
            ariaLabel={
                "Changer le caractère réglementaire ou non de l'activité"
            }
        />
    )
}
export default IsRegulatedActivity
