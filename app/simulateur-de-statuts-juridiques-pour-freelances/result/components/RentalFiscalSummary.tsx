import RoundedBox from '@/app/components/RoundedBox'

import InfoTooltip from '@/app/components/InfoTooltip'
import { CenteredInfoLink } from '@/app/blog/reusable-components'
import { dict } from '@/utils/utils'
import { OtherIncomeSummaryLine } from '../../../../../common-types/synthesis-types'

//localhost:3000/simulateur-de-statuts-juridiques-pour-freelances?saved-search=VuZPkQD57j3k6MmoMwcw

const RentalFiscalSummary = ({
    summary
}: {
    summary: OtherIncomeSummaryLine[]
}) => {
    return (
        <RoundedBox
            padding='p-4'
            className={'bg-gray-200 w-[75%] min-w-[300px]'}
        >
            <h3 className=' text-lg text-center mb-2 font-bold'>
                {dict('fiscal_impact')}
            </h3>
            <ul className='list list-inside flex flex-col gap-[0.4rem]'>
                {summary.map((line, i) => {
                    const { value, bubbleContent, bubbleInfoLink } = line
                    const [title, rest] = value.split(' : ')
                    const isBubble = bubbleContent.length > 0
                    return (
                        <li key={i} className=''>
                            {isBubble ? (
                                <span className='font-bold'>
                                    {title}
                                    <span className='whitespace-nowrap'>
                                        {' '}
                                        <span>
                                            <InfoTooltip
                                                bubbleContentNode={
                                                    <>
                                                        <p>{bubbleContent}</p>
                                                        {bubbleInfoLink.length >
                                                            0 && (
                                                            <CenteredInfoLink>
                                                                <a
                                                                    href={
                                                                        bubbleInfoLink
                                                                    }
                                                                    target='_blank'
                                                                >
                                                                    {dict(
                                                                        'more_information'
                                                                    )}
                                                                </a>
                                                            </CenteredInfoLink>
                                                        )}
                                                    </>
                                                }
                                            />
                                        </span>
                                        {' : '}
                                    </span>
                                    <span className='font-light'>{rest}</span>
                                </span>
                            ) : (
                                <span className='font-bold'>
                                    {title}
                                    {' : '}
                                    <span className='font-light'>{rest}</span>
                                </span>
                            )}
                        </li>
                    )
                })}
            </ul>
        </RoundedBox>
    )
}

export default RentalFiscalSummary
