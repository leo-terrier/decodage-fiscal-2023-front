import { ReactNode } from 'react'
import { dict } from '@/utils/utils'
import dic from 'dict/fr.json'

import { condiStyle, joinString } from '@/utils/utils'
import MainLabel from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/MainLabel'
import SubText from '@/app/components/SubText'
import { LinkReplaceStringMEWarning } from '@/jsx-replace/LinkReplaceString'

const messageClassName = 'text-xs font-semibold'

export const ErrorMessage = ({ message }: { message: string }) => (
    <p className={joinString(messageClassName, 'text-red-danger')}>{message}</p>
)

export const WarningMessage = ({
    message,
    isMEWarningApplicable = false
}: {
    message: string
    isMEWarningApplicable?: boolean
}) => (
    <p className={joinString(messageClassName, 'text-orange-400')}>
        {isMEWarningApplicable && message.length > 0
            ? LinkReplaceStringMEWarning(message)
            : message}
    </p>
)

export type LabelType = {
    children: ReactNode
    mainLabel: keyof typeof dic
    //mainLabelIdx?: number | null
    subLabel?: keyof typeof dic | ''
    //subLabelIdx?: number | null
    isRequired?: boolean
    isMissing?: boolean
    isDisabled?: boolean
    labelHtmlFor?: string
    labelIsRight?: boolean
    warning?: string
    error?: string
    labelGap?: string
    labelItems?: string
    labelBoldness?: string
    labelJustify?: string
    labelWhiteSpace?: string
    labelWidth?: string
    labelMaxWidth?: string
    labelCursor?: string
    bubbleContentNode?: React.ReactNode | null
    labelClassName?: React.ComponentProps<'div'>['className']
    isModal?: boolean
    isSmallInfoButton?: boolean
}

const Label = ({
    mainLabel,
    subLabel = '',
    isRequired = false,
    isMissing = false,
    isDisabled = false,
    children,
    labelHtmlFor,
    labelIsRight = false,
    warning,
    error,
    labelClassName = '',
    labelGap = 'gap-3',
    labelItems = 'items-center', // remove ?,
    labelJustify = 'justify-between',
    labelBoldness = 'font-semibold',
    labelWhiteSpace = '',
    labelWidth = 'w-full sm:w-fit',
    labelMaxWidth = '',
    labelCursor = 'cursor-pointer',
    bubbleContentNode = null,
    isModal = false,
    isSmallInfoButton = false
}: LabelType) => {
    return (
        <div
            className={joinString(
                'flex flex-col items-center gap-2',
                labelWidth,
                labelMaxWidth
            )}
        >
            <label
                htmlFor={labelHtmlFor}
                className={joinString(
                    'flex w-full', // width handled in container
                    condiStyle(
                        [!labelIsRight, 'flex-row', 'flex-row-reverse'],
                        [
                            isDisabled,
                            'opacity-50 pointer-events-none',
                            labelCursor
                        ]
                    ),
                    labelGap,
                    labelJustify,
                    labelItems,
                    labelBoldness,
                    labelWhiteSpace,
                    labelClassName
                )}
                /* onClick={(e: React.MouseEvent<HTMLLabelElement>) =>
                    e.stopPropagation()
                } */
            >
                {subLabel.length > 0 ? (
                    <span className='flex flex-col items-center justify-center'>
                        <MainLabel
                            isRequired={isRequired && !isDisabled}
                            isMissing={isMissing}
                            bubbleContentNode={bubbleContentNode}
                            isModal={isModal}
                            isSmallInfoButton={isSmallInfoButton}
                        >
                            {dict(mainLabel /* , mainLabelIdx */)}
                        </MainLabel>
                        <SubText fontSize='text-[14.4px]'>
                            {dict(
                                subLabel as keyof typeof dic /* , subLabelIdx */
                            )}
                        </SubText>
                    </span>
                ) : (
                    <MainLabel
                        isRequired={isRequired}
                        isMissing={isMissing}
                        bubbleContentNode={bubbleContentNode}
                        isModal={isModal}
                        isSmallInfoButton={isSmallInfoButton}
                    >
                        {dict(mainLabel)}
                    </MainLabel>
                )}
                {children}
            </label>
            {error ? (
                <ErrorMessage message={error} />
            ) : warning ? (
                <WarningMessage
                    message={warning}
                    isMEWarningApplicable={'revenueD2 rents'.includes(
                        labelHtmlFor as string
                    )}
                />
            ) : (
                <></>
            )}
        </div>
    )
}

export default Label
