import { PiSealFill } from 'react-icons/pi'

import { condiStyle, joinString } from '@/utils/utils'

import { dict } from '@/utils/utils'
import RoundedBox from '@/app/components/RoundedBox'
import {
    GeneralInfoCategory,
    GeneralInfoDataLine,
    SealIconInfo
} from '../../../../common-types/compare-types'
import { YesOrNoIconReplace } from '@/jsx-replace/YesOrNoIconReplace'
import Loader from '@/app/components/Loader'

type CategoryTitleType = {
    iconInfo: SealIconInfo
    className: string
    isCompare: boolean
}
const CategorySeal = ({
    iconInfo,
    className,
    isCompare
}: CategoryTitleType) => {
    const { iconLabel, iconColor } = iconInfo
    return (
        <div className={joinString(className)} style={{ fill: iconColor }}>
            <PiSealFill fill='inherit' className='h-full w-full' />
            <h3
                className={joinString(
                    'absolute text-white text-center font-rancho  max-w-[70%] mx-auto',
                    condiStyle([
                        isCompare,
                        'text-base lg:text-[1.05rem]',
                        'text-base sm:text-lg'
                    ])
                )}
            >
                {iconLabel}
            </h3>
        </div>
    )
}

type DataLineType = {
    line: GeneralInfoDataLine
}

const DataLine = ({ line }: DataLineType) => {
    const { content, style = {} } = line
    const isYesOrNoLine = ['yes', 'no'].some((elt) => content.includes(elt))
    return (
        <p
            style={style as React.CSSProperties}
            className={
                isYesOrNoLine
                    ? 'flex gap-2 items-center w-full justify-center'
                    : 'width' in style
                    ? ''
                    : 'whitespace-nowrap'
            }
        >
            {isYesOrNoLine ? YesOrNoIconReplace(content) : content}
        </p>
    )
}
type DataLiType = {
    line: GeneralInfoDataLine
    isCompare: boolean
}
// subcategory list
const DataLi = ({ line, isCompare }: DataLiType) => {
    const { content, style = {} } = line
    return (
        <li
            style={style as React.CSSProperties}
            className={joinString(
                isCompare
                    ? 'text-[14px] xl:before:mr-2 xl:before:content-["→"]'
                    : 'text-sm before:mr-2 before:content-["→"]'
            )}
        >
            {content}
        </li>
    )
}

export type GeneralSummaryCompType = {
    isCompare: boolean
    data: GeneralInfoCategory[] | null
    simulationTitleForCompare?: React.ReactNode
    roundedBoxClassName?: string
    roundedBoxPadding?: string
    buttons: React.ReactNode
    isLoading?: boolean
}
const GeneralSummary = ({
    isCompare,
    data,
    simulationTitleForCompare = null,
    roundedBoxClassName = '',
    roundedBoxPadding = '',
    isLoading = false,
    buttons
}: GeneralSummaryCompType) => {
    return (
        <RoundedBox
            shadow={isCompare ? '' : undefined}
            padding={joinString('px-4 py-6', roundedBoxPadding)}
            className={joinString(
                roundedBoxClassName,
                'w-full flex flex-col justify-between items-end gap-6 relative'
            )}
        >
            {' '}
            {!isCompare ? (
                <h2 className='font-poppins font-bold text-center sm:w-fit right-0 left-0 mx-auto sm:absolute sm:bottom-full sm:translate-y-1/2'>
                    {dict('memo')}
                </h2>
            ) : (
                simulationTitleForCompare
            )}
            {isLoading ? (
                <div className='h-full w-full min-h-[400px] flex items-center justify-center'>
                    <Loader />
                </div>
            ) : (
                <>
                    <div
                        className={joinString(
                            'w-full flex flex-col justify-evenly',
                            condiStyle([!isCompare, 'xl:flex-row xl:flex-wrap'])
                        )}
                    >
                        {data !== null &&
                            data.map(
                                ({
                                    label,
                                    data: { mainLines, subcategories }
                                }) => {
                                    const isSealIcon =
                                        label.sealIconInfo !== null
                                    return (
                                        <div
                                            key={label.categoryLabel}
                                            className={joinString(
                                                'w-full flex flex-col gap-3 items-center mb-6 justify-between',
                                                condiStyle([
                                                    !isCompare,
                                                    `justify-between ${
                                                        data.length === 3
                                                            ? 'xl:w-1/3'
                                                            : 'xl:w-[45%]'
                                                    } lg:flex-row xl:flex-col xl:justify-start lg:mb-10`
                                                ])
                                            )}
                                        >
                                            <div
                                                className={
                                                    'flex flex-col gap-1 items-center w-fit relative'
                                                }
                                            >
                                                {label.sealIconInfo !==
                                                    null && (
                                                    <CategorySeal
                                                        isCompare={isCompare}
                                                        iconInfo={
                                                            label.sealIconInfo
                                                        }
                                                        className={joinString(
                                                            'h-[5.5rem] w-[5.5rem] text-white absolute -top-10 flex items-center justify-center',
                                                            condiStyle([
                                                                !isCompare,
                                                                '-right-[25vw] sm:h-[6.3rem] sm:w-[6.3rem] lg:relative lg:top-0 lg:right-0 xl:absolute xl:-right-[130px] xl:-top-10 sm:-right-28',
                                                                '-right-[80px]'
                                                            ])
                                                        )}
                                                    />
                                                )}
                                                <h3
                                                    className={joinString(
                                                        condiStyle(
                                                            [
                                                                isSealIcon,
                                                                'lg:text-xl xl:text-2xl'
                                                            ],
                                                            [
                                                                isSealIcon &&
                                                                    isCompare,
                                                                '-translate-x-6'
                                                            ]
                                                        ),
                                                        'text-2xl tracking-wide text-center font-semibold underline font-poppins relative mb-2'
                                                    )}
                                                >
                                                    {label.categoryLabel}
                                                </h3>
                                            </div>
                                            <div
                                                className={joinString(
                                                    'flex flex-wrap items-center gap-1 justify-center gap-x-4',
                                                    condiStyle([
                                                        !isCompare,
                                                        `sm:items-baseline sm:gap-x-6  xl:max-w-none ${
                                                            subcategories !==
                                                            null
                                                                ? 'lg:max-w-[33%]'
                                                                : 'lg:w-[66%]'
                                                        }`,
                                                        subcategories === null
                                                            ? 'mt-2 mb-4'
                                                            : ''
                                                    ])
                                                )}
                                            >
                                                {mainLines.map((elt, i) => (
                                                    <DataLine
                                                        key={i}
                                                        line={elt}
                                                    />
                                                ))}
                                            </div>
                                            {subcategories !== null && (
                                                <div>
                                                    {subcategories.map(
                                                        ({
                                                            subcategoryLabel,
                                                            subcategoryData,
                                                            subcategoryLabelStyle
                                                        }) => (
                                                            <div
                                                                key={
                                                                    subcategoryLabel
                                                                }
                                                                className='mt-2 mb-4 w-full'
                                                            >
                                                                <h4
                                                                    style={
                                                                        subcategoryLabelStyle as React.CSSProperties
                                                                    }
                                                                >
                                                                    {
                                                                        subcategoryLabel
                                                                    }
                                                                </h4>
                                                                <ul className='w-fit mx-auto'>
                                                                    {subcategoryData.map(
                                                                        (
                                                                            elet
                                                                        ) => (
                                                                            <DataLi
                                                                                key={
                                                                                    elet.content
                                                                                }
                                                                                line={
                                                                                    elet
                                                                                }
                                                                                isCompare={
                                                                                    isCompare
                                                                                }
                                                                            />
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                }
                            )}
                    </div>
                    {buttons}
                </>
            )}
        </RoundedBox>
    )
}

export default GeneralSummary
