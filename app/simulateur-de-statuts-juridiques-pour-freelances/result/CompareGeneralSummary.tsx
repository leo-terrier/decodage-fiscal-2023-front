import { condiStyle, dict, joinString } from '@/utils/utils'
import { ImCross } from 'react-icons/im'

import GeneralSummary from './GeneralSummary'
import type { Identifier, XYCoord } from 'dnd-core'
import { useEffect, useRef, useState } from 'react'

import { useDrag, useDrop } from 'react-dnd'
import { useSimulationContext } from '../SimulationContext'
import { GeneralInfoCategory } from '../../../../common-types/compare-types'
import { fetchFromComparator, stringifyParams } from '@/requests'
import {
    ForCompareSimulationParams,
    ResponseShape,
    SimulationParams
} from '../../../../common-types/general-types'
import { toaster } from '@/toaster'
import Button from '../forms/components/raw/Button'

import { IoIosOptions } from 'react-icons/io'

interface DragItem {
    index: number
    id: string
    type: string
}

type Type = {
    index: number
    compareParams: ForCompareSimulationParams
    simulationTitleForCompare: React.ReactNode
    handleDraggingSimulation: (dragIndex: number, hoverIndex: number) => void
}

const CompareGeneralSummary = ({
    index,
    compareParams,
    handleDraggingSimulation,
    simulationTitleForCompare
}: Type) => {
    // // LOGIC // //

    const id = compareParams.id

    const {
        paramsForCompare,
        setParamsForCompare,
        saveParamsToLocalStorage,
        switchSimulation,
        isFirstRender,
        currentDisplayedParamsSavedId
    } = useSimulationContext()

    const [compareGeneralInfo, setCompareGeneralInfo] = useState<
        GeneralInfoCategory[] | null
    >(null)
    const [isLoading, setIsLoading] = useState(true)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const deleteSimulationFromCompare = async () => {
        setIsLoading(true)
        return new Promise<ForCompareSimulationParams[]>((resolve) => {
            setTimeout(() => {
                const payload = paramsForCompare.filter(
                    (forCompareParams) => forCompareParams.id !== id
                )
                setParamsForCompare(payload)
                resolve(payload)
                setIsLoading(false)
            }, 500)
        })
    }

    const handleDeleteFromCompare = async () => {
        const newForCompare = deleteSimulationFromCompare()
        saveParamsToLocalStorage(await newForCompare, true)
        toaster.info({
            text: 'noti_simulation_removed_from_comparator'
        })
    }

    const handleEditSimulation = async () => {
        await deleteSimulationFromCompare()
        switchSimulation({ params: compareParams.params as SimulationParams })
        // no need to save to local params since updating ParamsForCompare and QueryParams which will trigger main useEffect
    }

    const handleDisplaySimulation = () => {
        switchSimulation({ params: compareParams.params as SimulationParams })
    }

    useEffect(() => {
        const fetchGeneralInfoFromParams = async () => {
            const response = (await fetchFromComparator(
                stringifyParams(compareParams.params) as string,
                {},
                true
            )) as ResponseShape
            setCompareGeneralInfo(response.generalInfo)
            setIsLoading(false)
        }

        setTimeout(() => fetchGeneralInfoFromParams(), isFirstRender ? 4000 : 0) // when displayed params also saved in compared structure, allows for displayed params result to be fetched and stored in cache, before current saved simulation tries to access cache (if not, double request for no reason)
    }, [])

    useEffect(() => {
        const handleClose = () => {
            setIsMenuOpen(false)
        }
        if (isMenuOpen) {
            document.addEventListener('click', handleClose)
        }
        return () => {
            document.removeEventListener('click', handleClose)
        }
    }, [isMenuOpen])

    // // DND // //

    const [isLgScreen, setIsLgScreen] = useState(false)

    const canDrag = paramsForCompare.length > 2 && isLgScreen // Passed as a prop (not working)
    const ref = useRef<HTMLDivElement>(null)

    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'simulation',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverWidthFraction =
                (hoverBoundingRect.right - hoverBoundingRect.left) / 8

            // Determine rectangle on screen
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the right
            const hoverClientX =
                (clientOffset as XYCoord).x - hoverBoundingRect.left

            // Get pixels to the left
            const hoverClientXLeft =
                (clientOffset as XYCoord).x - hoverBoundingRect.right

            // Only perform the move when the mouse has passed 1/8 of the item's width
            // When dragging rightward, only move when the cursor has passed left + 1/8 of width
            // When dragging leftward, only move when the cursor is under right - 1/8 of width

            if (
                (dragIndex < (hoverIndex as number) &&
                    hoverClientX > hoverWidthFraction) ||
                (dragIndex > (hoverIndex as number) &&
                    hoverClientXLeft < -hoverWidthFraction)
            ) {
                // Time to actually perform the action
                handleDraggingSimulation(dragIndex, hoverIndex as number)

                // Note: we're mutating the monitor item here!
                // Generally, it's better to avoid mutations,
                // but it's good here for the sake of performance
                // to avoid expensive index searches.
                item.index = hoverIndex as number
            }
        }
    })
    const [{ isDragging }, drag] = useDrag({
        type: 'simulation',
        canDrag,
        item: () => {
            return { id, index }
        },
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging()
        })
    })

    const draggingStyle = () => {
        const opacity = isDragging ? 'opacity-0' : 'opacity-100'
        const cursor = canDrag || isDragging ? 'cursor-move' : 'cursor-auto'
        return joinString(opacity, cursor)
    }

    drag(drop(ref))

    useEffect(() => {
        const handleResize = () => {
            setIsLgScreen(window.innerWidth > 1064)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    // // // //

    return (
        <div
            ref={ref}
            style={{ transform: 'translate(0, 0)' }} //libbug
            data-handler-id={handlerId}
            className={joinString(
                'w-full sm:w-[500px] lg:w-1/3 lg:min-h-full flex items-stretch rounded-lg',
                draggingStyle()
            )}
        >
            <GeneralSummary
                isCompare
                isLoading={isLoading}
                data={compareGeneralInfo}
                roundedBoxClassName='bg-white sm:bg-slate-100'
                roundedBoxPadding='pt-10'
                simulationTitleForCompare={simulationTitleForCompare}
                buttons={
                    <>
                        <Button
                            onClick={handleDeleteFromCompare}
                            className='fill-red-500 hover:fill-white p-2 bg-red-100 hover:bg-red-500 flex items-center justify-center rounded-lg shadow border-slate-400 absolute right-[0.55rem] top-[0.55rem]'
                        >
                            <ImCross fill='inherit' size='0.9rem' />
                        </Button>
                        <div className='relative'>
                            <Button
                                className={joinString(
                                    'hover:fill-white p-2 hover:bg-slate-700  flex items-center justify-center rounded-xl shadow',
                                    condiStyle([
                                        isMenuOpen,
                                        'fill-white bg-slate-700',
                                        'bg-slate-300 fill-slate-700'
                                    ])
                                )}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                disabled={
                                    currentDisplayedParamsSavedId === id &&
                                    !isFirstRender
                                }
                            >
                                <IoIosOptions size='2rem' fill='inherit' />
                            </Button>
                            {isMenuOpen && (
                                <div className='shadow-lg absolute right-full -translate-x-2 bottom-0 tracking-wide text-center flex flex-col border-gray-400/20 border rounded-sm z-10 bg-slate-200'>
                                    <Button
                                        onClick={handleEditSimulation}
                                        className='px-6 py-3 border-b border-gray-400/20 last:border-b-transparent text-center whitespace-nowrap font-bold uppercase hover:text-sky-500 text-slate-700 text-lg tracking-widest'
                                    >
                                        {dict('edit')}
                                    </Button>
                                    <Button
                                        onClick={handleDisplaySimulation}
                                        className='px-6 py-3 border-b border-gray-400/20 last:border-b-transparent text-center whitespace-nowrap font-bold uppercase hover:text-sky-500 text-slate-700 text-lg tracking-widest'
                                    >
                                        {dict('display')}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                }
            />
        </div>
    )
}

export default CompareGeneralSummary

{
    /* <Button
onClick={handleEditSimulation}
className='text-white bg-blueGray-dark uppercase tracking-wider font-bold opacity-[97%] hover:opacity-100 border-2 rounded px-4 border-blueGray-dark fill-white flex flex-col items-center text-inherit justify-center'
disabled={
    currentDisplayedParamsSavedId === id &&
    !isFirstRender
} // allows to switch back to saved params even when setCurrentDisplayedParamsSavedIndex was not called du to an error
>
<span className='text-inherit font-extrabold leading-tight'>
    {dict('resume_arr', 0)}
</span>
<span className='text-xs text-inherit font-light tracking-normal lowercase leading-tight'>
    {dict('resume_arr', 1)}
</span>
</Button>
<Button
onClick={handleDisplaySimulation}
className='text-white bg-blueGray-dark uppercase tracking-wider font-bold opacity-[97%] hover:opacity-100 border-2 rounded px-4 border-blueGray-dark fill-white flex flex-col items-center text-inherit justify-center'
disabled={
    currentDisplayedParamsSavedId === id &&
    !isFirstRender
} // allows to switch back to saved params even when setCurrentDisplayedParamsSavedIndex was not called du to an error
>
voir
</Button>

<Button
onClick={handleDeleteFromCompare}
className='bg-gray-400 opacity-[97%] hover:opacity-100 border-[1px] rounded px-2 py-1 border-gray-400 flex justify-center items-center w-full fill-white'
>
<BsFillTrash2Fill fill='inherit' size='1.25rem' />
</Button> */
}
