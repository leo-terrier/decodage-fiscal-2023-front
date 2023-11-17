import InfoTooltip, { InfoTooltipType } from '@/app/components/InfoTooltip'
import { condiStyle } from '@/utils/utils'

export type MainLabelType = InfoTooltipType & {
    children: React.ReactNode
    isMissing: boolean
    isRequired: boolean
    /* isModal: boolean
    bubbleContentNode: React.ReactNode  */ // includes null
}
const MainLabel = ({
    children,
    isMissing,
    isRequired,
    isModal,
    bubbleContentNode,
    isSmallInfoButton
}: MainLabelType) => {
    return (
        <span>
            {children}&nbsp;
            {(isRequired || bubbleContentNode !== null) && (
                <span className='whitespace-nowrap -ml-[2px]'>
                    {isRequired && (
                        <span
                            className={condiStyle([
                                isMissing,
                                'text-red-danger'
                            ])}
                        >
                            *
                        </span>
                    )}{' '}
                    {bubbleContentNode !== null && (
                        <InfoTooltip
                            bubbleContentNode={bubbleContentNode}
                            isModal={isModal}
                            isSmallInfoButton={isSmallInfoButton}
                        />
                    )}
                </span>
            )}
        </span>
    )
}

export default MainLabel
