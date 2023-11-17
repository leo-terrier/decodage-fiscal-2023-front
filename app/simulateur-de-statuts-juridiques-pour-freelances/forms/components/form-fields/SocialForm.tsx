import { useEffect, useState } from 'react'
import RadioButtons from '../raw/RadioButtons'
import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import { SocialFormTypeD2 } from '../../../../../../common-types/general-types'

import { dict } from '@/utils/utils'

type Type = {
    isD2: boolean
}

const socialForms = (isD2: boolean) => {
    return [
        { value: 'employee', title: dict('employee') },
        { value: 'SAS', title: 'SASU' },
        { value: 'SARL', title: 'EURL' },
        { value: 'ME', title: 'Micro-Entreprise' },
        { value: 'EI', title: 'Entreprise Individuelle' },
        ...(isD2 ? [{ value: 'none', title: dict('inactive') }] : [])
    ]
}
const SocialForm = ({ isD2 }: Type) => {
    const id = isD2 ? 'socialFormD2' : 'socialForm'
    const { handleAddParams, queryParams, savedParams } = useSimulationContext()

    const [socialForm, setSocialForm] = useState<SocialFormTypeD2>(
        queryParams[id]
    )

    const handleSocialFormChange = (value: string) => {
        setSocialForm(value as SocialFormTypeD2)
        handleAddParams(id, value as SocialFormTypeD2)
    }

    useEffect(() => {
        if (Object.keys(savedParams).length) {
            setSocialForm(savedParams[id] as SocialFormTypeD2)
        }
    }, [savedParams])

    return (
        <RadioButtons
            options={socialForms(isD2)}
            handleChange={handleSocialFormChange}
            value={socialForm}
            width={'w-full max-w-full'}
            gapX={'gap-x-4 gap-y-3 xl:gap-x-6 xl-gap-y-4'}
        />
    )
}
export default SocialForm
