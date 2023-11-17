import { dict } from '@/utils/utils'

type Type = {
    text?: string
    href: string
}
const OuterLink = ({ text = dict('more_information'), href }: Type) => (
    <a href={href} target='_blank'>
        {text}
    </a>
)

export default OuterLink
