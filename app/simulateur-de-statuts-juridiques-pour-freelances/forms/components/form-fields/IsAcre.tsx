import { useEffect, useState } from 'react'

import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import CheckBox from '../raw/CheckBox'
import { dict } from '@/utils/utils'
import LinkPlugger from '@/app/components/LinkPlugger'
import { SimulationParams } from '../../../../../../common-types/general-types'
type Type = {
    id: keyof SimulationParams
}
const IsAcre = ({ id }: Type) => {
    const { handleAddParams, queryParams, savedParams } = useSimulationContext()
    const [isAcre, setIsAcre] = useState(queryParams[id] as boolean)
    const toggle = () => {
        handleAddParams(id, !isAcre)
        setIsAcre(!isAcre)
    }

    useEffect(() => {
        if (Object.keys(savedParams).length) {
            setIsAcre(savedParams[id] as boolean)
        }
    }, [savedParams])

    return (
        <CheckBox
            mainLabel={'ACRE_beneficiary'}
            labelWhiteSpace={'whitespace-nowrap'}
            id={id}
            isChecked={isAcre}
            handleChange={toggle}
            labelBoldness={'font-normal'}
            bubbleContentNode={
                <p className='text-left'>
                    <LinkPlugger
                        target='ACRE'
                        href='/blog/tout-comprendre-a-l-acre-test-d-eligibilite-simulation-conditions-demarches'
                        text={dict('is_ACRE_bubble')}
                    />
                </p>
            }
        />
    )
}
export default IsAcre
