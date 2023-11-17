import { joinString } from '@/utils/utils'

type Type = {
    children: React.ReactNode
    className?: React.ComponentProps<'div'>['className']
    fontSize?: string
    color?: string
}

/* ADD A class for inheritance of color ?
.inherit-color > * {
  color: inherit;
} */

const SubText = ({
    children,
    className = '',
    fontSize = 'text-sm',
    color = 'text-gray-400'
}: Type) => (
    <span className={joinString(color, fontSize, className)}>{children}</span>
)

export default SubText
