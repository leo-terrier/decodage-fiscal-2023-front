import { condiStyle, joinString } from '@/utils/utils'
import IconButton from './raw/IconButton'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'

export type InfoTooltipType = {
    bubbleContentNode: React.ReactNode
    isModal?: boolean
    isSmallInfoButton?: boolean
}

const InfoTooltip = ({
    bubbleContentNode,
    isModal = false,
    isSmallInfoButton = false
}: InfoTooltipType) => {
    const [isOpen, setIsOpen] = useState(false)
    const [tooltipLeft, setTooltipLeft] = useState(0)
    const anchorRef = useRef({} as HTMLDivElement)
    const tooltipRef = useRef({} as HTMLSpanElement)
    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false)
        }
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (
            anchorRef.current &&
            tooltipRef.current &&
            !anchorRef.current.contains(e.target as Node) &&
            !tooltipRef.current.contains(e.target as Node)
        ) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        const calculatePosition = async () => {
            if (anchorRef.current && tooltipRef.current) {
                const anchorRect = anchorRef.current.getBoundingClientRect()
                const tooltipRect = tooltipRef.current.getBoundingClientRect()
                let modalRectLeft = 0
                if (isModal) {
                    const modal = document.getElementById('modal')
                    const modalRect = (
                        modal as HTMLElement
                    ).getBoundingClientRect()
                    modalRectLeft = (modalRect as DOMRect).left
                }

                // Calculate the initial horizontal position (centered relative to the anchor)
                const left = -tooltipRect.width / 2 + anchorRect.width / 2

                // Check if the tooltip extends beyond the left or right of the viewport / modal
                const leftOverflow = anchorRect.left + left - modalRectLeft
                const rightOverflow =
                    document.documentElement.clientWidth -
                    modalRectLeft -
                    anchorRect.left -
                    tooltipRect.width / 2 -
                    anchorRect.width / 2

                if (leftOverflow < 8) {
                    // Tooltip extends beyond the left edge of the viewport
                    // Adjust the horizontal position to make it appear on the left side of the anchor
                    const adjustedLeft = left - leftOverflow + 8 // Add a 8px buffer
                    setTooltipLeft(adjustedLeft)
                } else if (rightOverflow < 8) {
                    const adjustedLeft = left + rightOverflow - 8 // Add a 8px buffer
                    setTooltipLeft(adjustedLeft)
                } else {
                    // Tooltip fits within the viewport, use the initial horizontal position
                    setTooltipLeft(left)
                }
            }
        }

        calculatePosition()

        // Recalculate position on window resize
        window.addEventListener('resize', calculatePosition)
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('resize', calculatePosition)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <span
            id='tooltipContainer'
            ref={anchorRef}
            className={'inline group relative text-base'}
        >
            <IconButton
                onClick={() => {
                    setIsOpen(true)
                }}
                //onBlur={() => setIsOpen(false)}
                onKeyDown={handleKeyPress}
                fill={!isOpen ? 'fill-gray-500' : 'fill-sky-500'}
                aria-label='Infobulle'
                className={joinString(
                    condiStyle([isSmallInfoButton, 'h-4', 'h-[1.1rem]']),
                    'w-fit'
                )}
                padding='p-[1px]'
                // needed so icon does not appear cut on mobile
            >
                <BsInfoCircle
                    fill='inherit'
                    size={condiStyle([isSmallInfoButton, '0.86rem', '0.95rem'])}
                    className='m-auto'
                />
            </IconButton>

            <span
                ref={tooltipRef}
                style={{
                    left: tooltipLeft
                }}
                onClick={(e: React.MouseEvent) => {
                    if (e.target instanceof HTMLAnchorElement) {
                        // Allow clicks on links
                        return
                    }
                    // stops clicks on tooltip from toggling / adding input to form field
                    e.preventDefault()
                }}
                className={joinString(
                    'absolute z-50 cursor-auto bottom-full opacity-0 transition-opacity border-slate-400 p-[1em] pr-[1.3rem] pt-[1.3rem] whitespace-normal bg-white border-[.5px] -translate-y-4 shadow-lg font-light italic rounded text-left',
                    condiStyle(
                        [isOpen, 'opacity-100', 'pointer-events-none'],
                        [isModal, 'w-[320px]', 'w-[320px] sm:w-[350px]']
                    )
                )}
            >
                <IconButton
                    className='absolute top-1 right-1 text-[1.1rem] fill-slate-400'
                    onClick={() => setIsOpen(false)}
                    aria-label='Fermer infobulle'
                >
                    <MdClose fill='fill-inherit' />
                </IconButton>
                {bubbleContentNode}
            </span>
        </span>
    )
}

export default InfoTooltip
