import { useEffect, useState } from 'react'

import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import CheckBox from '../raw/CheckBox'
import { dict } from '@/utils/utils'

type Type = {
    handleChange?: () => void
    isModal?: boolean
}
const IsScaleOption = ({ handleChange, isModal = false }: Type) => {
    const { handleAddParams, queryParams, savedParams } = useSimulationContext()
    const [isScaleOption, setIsScaleOption] = useState(
        queryParams.isScaleOption as boolean
    )
    const toggle = () => {
        setIsScaleOption(!isScaleOption)
        if (!isModal) {
            handleAddParams('isScaleOption', !isScaleOption)
        } else if (handleChange) {
            handleChange()
        }
    }
    useEffect(() => {
        if (Object.keys(savedParams).length) {
            setIsScaleOption(savedParams.isScaleOption)
        }
    }, [savedParams])

    return (
        <CheckBox
            mainLabel={'scale_option'}
            id={'isScaleOption'}
            isChecked={isScaleOption}
            handleChange={toggle}
            labelBoldness={'font-normal'}
            bubbleContentNode={
                <p className='text-left'>{dict('is_scale_option_bubble')}</p>
            }
            isModal={isModal}
        />
    )
}
export default IsScaleOption
