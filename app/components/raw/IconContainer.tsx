import { joinString } from '@/utils/utils'

type Type = {
    className?: React.ComponentProps<'div'>['className']
    children: React.ReactNode
    justify?: string
}

const IconContainer = ({
    className = '',
    justify = 'justify-center',
    children
}: Type) => {
    return (
        <div className={joinString(className, 'items-center flex', justify)}>
            {children}
        </div>
    )
}

export default IconContainer
