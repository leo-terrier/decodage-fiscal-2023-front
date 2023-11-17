import { condiStyle, joinString } from '@/utils/utils'
import { ButtonHTMLAttributes } from 'react'

export type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: React.ComponentProps<'div'>['className']
    children: React.ReactNode
    disabled?: boolean
    opacity?: string
    isMobile?: boolean
    width?: string
    onClick?: () => void
}
const Button = ({
    className = 'text-white bg-sky-400 uppercase tracking-wider font-bold opacity-[97%] hover:opacity-100 border-2 rounded px-4 py-2 border-sky-400 ',
    children,
    disabled = false,
    isMobile = false,
    opacity = 'opacity-[95%]',
    width = '',
    onClick,
    ...props
}: ButtonType) => {
    return (
        <button
            type='button'
            className={joinString(
                className,
                opacity,
                condiStyle(
                    [!disabled, 'cursor-pointer'],
                    [!isMobile, 'hover:opacity-100']
                ),
                width,
                'disabled:pointer-events-none disabled:opacity-50'
            )}
            disabled={disabled}
            {...props}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
