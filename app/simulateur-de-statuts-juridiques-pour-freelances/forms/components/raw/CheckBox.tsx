import Label, { LabelType } from './Label'
import { GiCheckMark } from 'react-icons/gi'
import dic from 'dict/fr.json'
import { SimulationParams } from '../../../../../../common-types/general-types'

export type CheckBoxObj = Partial<LabelType> & {
    id: keyof SimulationParams
    isChecked: boolean
    mainLabel: keyof typeof dic
    fontFamily?: string
    handleChange: (value: boolean) => void
}

const CheckBox = ({
    id,
    isChecked,
    handleChange,
    labelGap = 'gap-3',
    //labelWhiteSpace = 'whitespace-nowrap',
    ...props
}: CheckBoxObj) => {
    const toggle = () => {
        handleChange(!isChecked)
    }
    return (
        <Label
            labelHtmlFor={id}
            labelGap={labelGap}
            labelIsRight
            labelJustify='justify-end'
            labelWidth={'w-fit'}
            {...props}
        >
            <input
                type='checkbox'
                checked={isChecked}
                id={id}
                className='sr-only'
                onChange={toggle}
            />
            <div className='w-4 h-4 flex items-center justify-center border-[1.5px]  rounded-sm flex-shrink-0'>
                {isChecked && (
                    <div className='mt-[-8px] fill-blueGray-dark '>
                        <GiCheckMark size='25px' style={{ fill: 'inherit' }} />
                    </div>
                )}
            </div>
        </Label>
    )
}

export default CheckBox
