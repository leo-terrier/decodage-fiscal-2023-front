import { dict, joinString } from '@/utils/utils'
type Type = {
    className?: string
}
const RequiredField = ({ className = '' }: Type) => (
    <p
        className={joinString(
            className,
            'text-sm text-center italic lowercase'
        )}
    >
        * {dict('required_fields')}
    </p>
)

export default RequiredField
