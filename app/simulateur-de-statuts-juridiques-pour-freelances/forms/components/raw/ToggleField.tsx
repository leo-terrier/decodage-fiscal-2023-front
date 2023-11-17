import Label, { LabelType } from './Label'
import ToggleButton from './ToggleButton'
import dic from 'dict/fr.json'

type Type = Partial<LabelType> & {
    id: string
    handleChange: () => void
    isChecked: boolean
    width?: 'sm' | 'lg'
    warning?: string
    labelWidth?: string
    mainLabel: keyof typeof dic
    ariaLabel: string
}

const ToggleField = ({
    id,
    handleChange,
    isChecked,
    width,
    ariaLabel,
    labelWidth = 'w-full',
    ...props
}: Type) => {
    return (
        <Label {...props} labelHtmlFor={id} labelWidth={labelWidth}>
            <ToggleButton
                id={id}
                isChecked={isChecked}
                handleChange={handleChange}
                width={width}
                ariaLabel={ariaLabel}
            />
        </Label>
    )
}

export default ToggleField
