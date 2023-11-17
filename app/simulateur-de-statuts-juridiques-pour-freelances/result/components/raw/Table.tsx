import { condiStyle, dict, joinString } from '@/utils/utils'

import SubText from '@/app/components/SubText'
import LinkPlugger from '@/app/components/LinkPlugger'
import { CenteredInfoLink, Underline } from '@/app/blog/reusable-components'
import InfoTooltip from '@/app/components/InfoTooltip'
import { SynthesisLine } from '../../../../../../common-types/synthesis-types'

export type TableType = {
    headers: string[]
    lines: SynthesisLine[]
    tableWidth?: string
    isOtherIncomes?: boolean
}

const taxLinks = [
    'tout-savoir-sur-la-contribution-exceptionnelle-sur-les-hauts-revenus-cehr-avec-simulation',
    'tout-comprendre-a-l-impot-sur-le-revenu-ir-avec-simulation',
    'simulateur-de-taxe-puma-csm-et-explications'
]
const taxLinksNames = ['CEHR', 'IR', 'CSM']

type MainRowTitleType = {
    value: string
    bubbleContent: string
    bubbleInfoLink: string
}
const MainRowTitle = ({
    value,
    bubbleContent,
    bubbleInfoLink
}: MainRowTitleType) =>
    bubbleContent.length === 0 ? (
        <span>{value}</span>
    ) : (
        <span className='flex items-center gap-2'>
            <span>{value}</span>{' '}
            <InfoTooltip
                bubbleContentNode={
                    <>
                        <p>{bubbleContent}</p>
                        {bubbleInfoLink.length > 0 && (
                            <CenteredInfoLink>
                                <a href={bubbleInfoLink} target='_blank'>
                                    {dict('more_information')}
                                </a>
                            </CenteredInfoLink>
                        )}
                    </>
                }
            />
        </span>
    )

const Table = ({
    headers,
    lines,
    tableWidth = (headers.length === 0,
    'max-w-[400px] w-11/12',
    'w-11/12 max-w-[480px]'),
    isOtherIncomes = false
}: TableType) => {
    const cellClassName = joinString(
        'border-gray-300 px-2 py-1 sm:px-4',
        condiStyle([isOtherIncomes, 'text-[15px] sm:text-base'])
    )

    return (
        <table className={joinString('mx-auto', tableWidth)}>
            {headers.length > 0 && (
                <thead>
                    <tr>
                        <th>
                            <span className='sr-only'>Lignes comptables</span>
                        </th>
                        {headers.map((header) => (
                            <th className={cellClassName} key={header}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
            )}
            <tbody>
                {lines.map((line, rowIndex, originalArr) => {
                    const {
                        values,
                        includedTaxesSubtitleArr,
                        style,
                        bubbleContent,
                        bubbleInfoLink
                    } = line
                    return (
                        <tr key={rowIndex}>
                            {Object.values(values).map((value, cellIndex) => (
                                <td
                                    className={joinString(
                                        cellClassName,
                                        style,
                                        condiStyle(
                                            [
                                                rowIndex ===
                                                    originalArr.length - 1,
                                                'border-t',
                                                'border-y'
                                            ],
                                            [
                                                cellIndex !== 0,
                                                'text-right whitespace-nowrap'
                                            ]
                                        )
                                    )}
                                    key={cellIndex}
                                >
                                    {includedTaxesSubtitleArr.length > 0 &&
                                    cellIndex === 0 ? (
                                        <div className='flex flex-col gap-[2px]'>
                                            <MainRowTitle
                                                value={value}
                                                bubbleContent={bubbleContent}
                                                bubbleInfoLink={bubbleInfoLink}
                                            />
                                            <SubText
                                                color='text-inherit'
                                                className={
                                                    'flex gap-y-[1px] flex-wrap'
                                                }
                                            >
                                                <span className='text-inherit font-light'>
                                                    <Underline>
                                                        {dict('included')}
                                                    </Underline>{' '}
                                                    :
                                                </span>
                                                {includedTaxesSubtitleArr
                                                    .sort(
                                                        (a, b) =>
                                                            a.length - b.length
                                                    )
                                                    .map((tax, idx) => {
                                                        const taxLinkIdx =
                                                            taxLinksNames.findIndex(
                                                                (taxName) =>
                                                                    tax.includes(
                                                                        taxName
                                                                    )
                                                            )
                                                        return (
                                                            <span
                                                                className={joinString(
                                                                    'text-sm text-inherit mx-1 font-light',
                                                                    "before:content-['•'] before:mr-1"
                                                                )}
                                                                key={idx}
                                                            >
                                                                {taxLinkIdx ===
                                                                -1 ? (
                                                                    tax
                                                                ) : (
                                                                    <LinkPlugger
                                                                        target={
                                                                            taxLinksNames[
                                                                                taxLinkIdx
                                                                            ]
                                                                        }
                                                                        href={`/blog/${taxLinks[taxLinkIdx]}`}
                                                                        text={
                                                                            tax
                                                                        }
                                                                    />
                                                                )}
                                                            </span>
                                                        )
                                                    })}
                                            </SubText>
                                        </div>
                                    ) : cellIndex === 0 ? (
                                        <MainRowTitle
                                            value={value}
                                            bubbleContent={bubbleContent}
                                            bubbleInfoLink={bubbleInfoLink}
                                        />
                                    ) : (
                                        <span>{value}</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table
