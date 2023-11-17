import { joinString } from '@/utils/utils'
import Button, {
    ButtonType
} from '../../simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/Button'

type Type = ButtonType & {
    onClick: () => void
    children: React.ReactNode
    'aria-label': string
    fill?: string
    className?: React.ComponentProps<'div'>['className']
    disabled?: boolean
    minWidth?: string
    padding?: string
}

const IconButton = ({
    className = '',
    children,
    disabled = false,
    fill = 'fill-blueGray-dark',
    padding = 'p-[2px]',
    onClick,
    ...props
}: Type) => {
    return (
        <Button
            onClick={onClick}
            className={joinString(fill, padding, className)}
            {...props}
            disabled={disabled}
        >
            {children}
        </Button>
    )
}

export default IconButton
