import { joinString } from '@/utils/utils'

type Type = {
    className?: React.ComponentProps<'div'>['className']
    children: React.ReactNode
    padding?: string
    rounding?: string
    shadow?: string
    id?: string
}
const RoundedBox = ({
    className = '',
    padding = 'p-4',
    children,
    rounding = 'rounded-lg',
    shadow = '',
    id = ''
}: Type) => {
    /*  const style = () => {
        const padding = () => {
            switch (size) {
                case 'sm':
                    return 'p-3'
                case 'md':
                    return 'p-3 sm:p-4'
                case 'lg':
                    return 'p-4 sm:p-6'
            }
        }
        return joinString('shadow-md', rounding, className, padding())
    } */
    return (
        <div
            className={joinString(shadow, rounding, className, padding)}
            id={id}
        >
            {children}
        </div>
    )
}

export default RoundedBox
