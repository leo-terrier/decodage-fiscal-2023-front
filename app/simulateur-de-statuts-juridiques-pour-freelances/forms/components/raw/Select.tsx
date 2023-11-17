import { joinString } from '@/utils/utils'
import Label, { LabelType } from './Label'
import dic from 'dict/fr.json'

type OptionType = {
    value: string
    name: string
}

type Type = Partial<LabelType> & {
    options: OptionType[]
    id: string
    onChange: (value: string) => void
    value: string
    mainLabel: keyof typeof dic
    selectWidth?: string
}
const Select = ({
    options,
    id,
    onChange,
    value,
    selectWidth = 'w-1/2',
    ...props
}: Type) => {
    return (
        <Label labelHtmlFor={id} {...props}>
            <select
                className={joinString(
                    selectWidth,
                    'p-1 chevron-lg text-base bg-white'
                )}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    onChange(e.target.value)
                }
                value={value}
                id={id}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </Label>
    )
}

export default Select
