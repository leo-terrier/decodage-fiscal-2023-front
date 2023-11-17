import { condiStyle, dict } from '@/utils/utils'
import ToggleButton from '../raw/ToggleButton'

const IsMonthlyToggle = ({
    isMonthly,
    setIsMonthly
}: {
    isMonthly: boolean
    setIsMonthly: (value: boolean) => void
}) => (
    <label
        htmlFor='isMonthly'
        className='justify-center mb-4 flex gap-2 items-center cursor-pointer'
    >
        <span
            className={condiStyle([
                !isMonthly,
                'text-sky-500 font-bold',
                'font-light'
            ])}
        >
            {dict('by_year')}
        </span>
        <ToggleButton
            id={'isMonthly'}
            isChecked={isMonthly}
            width='sm'
            divBg={'bg-sky-400'}
            handleChange={() => setIsMonthly(!isMonthly)}
            switchBg={'bg-white'}
            ariaLabel='Changer de périodicité'
        />
        <span
            className={condiStyle([
                isMonthly,
                'text-sky-500 font-bold',
                'font-light'
            ])}
        >
            {dict('by_month')}
        </span>
    </label>
)

export default IsMonthlyToggle
