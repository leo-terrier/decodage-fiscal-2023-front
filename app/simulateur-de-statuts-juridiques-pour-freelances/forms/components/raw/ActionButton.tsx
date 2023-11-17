import { joinString } from '@/utils/utils'
import { ButtonHTMLAttributes } from 'react'
import Button from './Button'

type Type = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    onClick: () => void
    className?: React.ComponentProps<'div'>['className']
    disabled?: boolean
    variant?: 'primary' | 'secondary' | 'danger'
    px?: string
    py?: string
}
const ActionButton = ({
    children,
    onClick,
    className = '',
    disabled = false,
    variant = 'primary',
    px = 'px-4',
    py = 'py-2',
    ...props
}: Type) => {
    const bgColor = () => {
        switch (variant) {
            case 'primary':
                return 'bg-blueGray-light border-blueGray-light'
            case 'danger':
                return 'bg-red-danger border-red-danger'
            default:
                return 'bg-white'
        }
    }

    const color = () => {
        switch (variant) {
            case 'primary':
            case 'danger':
            default:
                return 'text-white'
        }
    }
    variant === 'primary'
        ? 'text-white'
        : variant === 'danger'
        ? 'text-red-danger'
        : 'text-white'

    const tailwindClass = joinString(
        bgColor(),
        color(),
        py,
        px,
        'uppercase tracking-wider font-bold opacity-[92%] hover:opacity-100 disabled:opacity-50 border-2 rounded shadow-sm',
        className
    )

    return (
        <Button
            className={tailwindClass}
            disabled={disabled}
            {...props}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}

export default ActionButton
