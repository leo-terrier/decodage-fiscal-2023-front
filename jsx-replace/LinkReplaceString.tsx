import reactStringReplace from 'react-string-replace'
import { dict } from '../utils/utils'
import { InnerLink } from '../app/blog/reusable-components'
import { v4 as uuidv4 } from 'uuid'

// TODO : solve TS types

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LinkReplaceStringMEWarning = (text: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let replacedText: any = ''

    replacedText = reactStringReplace(
        text,
        dict('level_1_ME_limit_passed_arr', 2).replace('.', ''),
        (match) => (
            <a
                className='inner-warning-link'
                href="https://entreprendre.service-public.fr/vosdroits/F32353#:~:text=Par%20exemple%2C%20si%20l'entreprise,%2F%20365%20%3D161%20235%20%E2%82%AC."
                target='_blank'
                key={uuidv4()}
            >
                {match}
            </a>
        )
    )
    replacedText = reactStringReplace(
        replacedText,
        dict('level_3_ME_limit_rentals_arr', 0).replace(',', ''),
        (match) => (
            <InnerLink
                CSSClassName='inner-warning-link'
                href='/blog/les-plafonds-de-la-micro-entreprise-pour-un-couple-dont-lmnp'
                key={uuidv4()}
            >
                {match}
            </InnerLink>
        )
    )

    return replacedText
}
