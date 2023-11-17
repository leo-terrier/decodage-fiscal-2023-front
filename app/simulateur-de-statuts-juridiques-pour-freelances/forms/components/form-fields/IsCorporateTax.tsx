import { useEffect, useState } from 'react'
import { SimulationParams } from '../../../../../../common-types/general-types'

import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import CheckBox from '../raw/CheckBox'

type CorporateTaxFieldType = {
    id: keyof SimulationParams
    isCorporateTax: boolean
    toggle: () => void
    isFromOutside?: boolean
    labelWhitespace?: string
}

export const IsCorporateTaxField = ({
    id,
    isCorporateTax,
    toggle,
    isFromOutside = false,
    labelWhitespace = 'whitespace-nowrap'
}: CorporateTaxFieldType) => {
    return (
        <CheckBox
            mainLabel={
                isFromOutside
                    ? 'corporate_tax_option_long'
                    : 'corporate_tax_option'
            }
            labelWhiteSpace={labelWhitespace}
            id={id}
            isChecked={isCorporateTax}
            handleChange={toggle}
            labelBoldness={'font-normal'}
        />
    )
}

type Type = {
    id: keyof SimulationParams
}

const IsCorporateTax = ({ id }: Type) => {
    const { handleAddParams, queryParams, savedParams } = useSimulationContext()
    const [isCorporateTax, setIsCorporateTax] = useState(
        queryParams[id] as boolean
    )
    const toggle = () => {
        handleAddParams(id, !isCorporateTax)
        setIsCorporateTax(!isCorporateTax)
    }
    useEffect(() => {
        // not really needed as default form is ME, so it would still work by initiating state to queryParams after they have been switched to saved Params
        if (Object.keys(savedParams).length) {
            setIsCorporateTax(savedParams[id] as boolean)
        }
    }, [savedParams])

    return (
        <IsCorporateTaxField
            id={id}
            isCorporateTax={isCorporateTax}
            toggle={toggle}
        />
    )
}
export default IsCorporateTax
