import reactStringReplace from 'react-string-replace'

import { ImCross } from 'react-icons/im'
import { FaCheck } from 'react-icons/fa'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const YesOrNoIconReplace = (text: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let replacedText: any = ''
    const className = 'inline-flex justify-center items-center'

    // green-500
    if (text.includes('yes')) {
        replacedText = reactStringReplace(text, ': yes', () => (
            <span
                className={className}
                style={{ fill: 'rgb(34 197 94)' }}
                key='yes'
            >
                <FaCheck size='1.15rem' fill='inherit' />
            </span>
        ))
    } else {
        //red
        replacedText = reactStringReplace(text, ': no', () => (
            <span className={className} style={{ fill: 'red' }} key='no'>
                <ImCross size='1rem' fill='inherit' />
            </span>
        ))
    }
    return replacedText
}
