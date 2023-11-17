import { useEffect, useState } from 'react'

import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import CheckBox from '../raw/CheckBox'
import { dict } from '@/utils/utils'
import LinkPlugger from '@/app/components/LinkPlugger'
import { SimulationParams } from '../../../../../../common-types/general-types'

type Type = {
    id: keyof SimulationParams
}
const IsVFL = ({ id }: Type) => {
    const { handleAddParams, queryParams, savedParams } = useSimulationContext()
    const [isVFL, setIsVFL] = useState(queryParams[id] as boolean)
    const toggle = () => {
        handleAddParams(id, !isVFL)
        setIsVFL(!isVFL)
    }
    useEffect(() => {
        if (Object.keys(savedParams).length) {
            setIsVFL(savedParams[id] as boolean)
        }
    }, [savedParams])

    return (
        <CheckBox
            mainLabel={'VFL_option'}
            id={id}
            isChecked={isVFL}
            handleChange={toggle}
            labelBoldness={'font-normal'}
            bubbleContentNode={
                <p className='text-left'>
                    <LinkPlugger
                        target='VFL'
                        href='/blog/simulateur-option-versement-liberatoire-conditions-avantages-demarches'
                        text={dict('is_VFL_bubble')}
                    />
                </p>
            }
        />
    )
}
export default IsVFL
