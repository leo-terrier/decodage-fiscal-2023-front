import { joinString } from '@/utils/utils'

type Type = {
    className?: React.ComponentProps<'div'>['className']
    children: React.ReactNode
    bgColor?: string
    borderWidth?: string
    borderRadius?: string
}

const MobileWhiteBox = ({
    className = '',
    children,
    bgColor = 'bg-white',
    borderWidth = 'border-2',
    borderRadius = 'rounded-xl'
}: Type) => {
    return (
        <div
            className={joinString(
                className,
                borderWidth,
                borderRadius,
                'shadow-md sm:border-0 sm:rounded-none sm:shadow-none',
                bgColor
            )}
        >
            {children}
        </div>
    )
}

export default MobileWhiteBox
