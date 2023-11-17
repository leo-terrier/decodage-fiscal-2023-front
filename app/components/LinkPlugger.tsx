import { InnerLink } from '../blog/reusable-components'

type Type = {
    text: string
    target: string
    href: string
}

const LinkPlugger = ({ text, target, href }: Type) => {
    const stringArr = text.split(target)
    return (
        <span className='text-inherit'>
            {stringArr[0]}
            <InnerLink href={href}>{target}</InnerLink>
            {stringArr[1]}
        </span>
    )
}

export default LinkPlugger
