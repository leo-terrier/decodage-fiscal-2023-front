import Label, { LabelType } from './Label'
import NumberInput from './NumberInput'
import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import { ErrorObject } from '../../../types'
import dic from 'dict/fr.json'
const getInfoMessage = (
    id: string,
    numberErrors: ErrorObject,
    messageType: 'warning' | 'error'
) => {
    if (typeof numberErrors[id] !== 'undefined') {
        return numberErrors[id][messageType]
    }
    return ''
}

type Type = Partial<LabelType> & {
    id: string
    value: number
    mainLabel: keyof typeof dic // TODO : check why needed to redeclare here
    handleChange: (value: number) => void
    isDisabled?: boolean
    minValue?: number
    isNonZero?: boolean
    isRequired?: boolean
    maxValue?: number
    isModal?: boolean
    width?: 'xs' | 'sm' | 'md' | 'lg'
    stepper?: number
    isFromOutside?: boolean
}

const NumberField = ({
    id,
    isRequired = false,
    isDisabled = false,
    error = '',
    warning = '',
    isModal = false,
    isFromOutside = false,
    //numberField props
    minValue,
    maxValue,
    value,
    isNonZero,
    width,
    stepper,
    handleChange,

    ...props
}: Type) => {
    const { numberErrors } = useSimulationContext()

    const isMissing = isRequired && !value

    return (
        <Label
            warning={
                isModal || isFromOutside
                    ? warning
                    : getInfoMessage(id, numberErrors, 'warning')
            }
            error={
                isDisabled || isFromOutside
                    ? ''
                    : !isModal
                    ? getInfoMessage(id, numberErrors, 'error')
                    : error
            }
            labelHtmlFor={id}
            isMissing={isMissing}
            isRequired={isRequired}
            isDisabled={isDisabled}
            isModal={isModal}
            {...props}
        >
            <NumberInput
                id={id}
                value={value}
                isNonZero={isNonZero}
                width={width}
                stepper={stepper}
                handleChange={handleChange}
                minValue={minValue}
                disabled={isDisabled}
                maxValue={maxValue}
            />
        </Label>
    )
}

export default NumberField
