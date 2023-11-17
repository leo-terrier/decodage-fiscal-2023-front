import { dict, joinString } from '@/utils/utils'
import { v4 as uuidv4 } from 'uuid'
import { useCallback } from 'react'
import { useSimulationContext } from '../SimulationContext'
import RoundedBox from '@/app/components/RoundedBox'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ForCompareSimulationParams } from '../../../../common-types/general-types'
import CompareGeneralSummary from './CompareGeneralSummary'

/* resultsForCompare.length > 2 && (
                <p className='text-sm text-orange-400 font-semibold max-w-full text-center italic'>
                    {dict('simulator_max_capacity_message')}
                </p>
            ) */

const StructureComparator = () => {
    const { paramsForCompare, setParamsForCompare } = useSimulationContext()

    const handleDraggingSimulation = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            let payload: ForCompareSimulationParams[] = []
            setParamsForCompare((prev) => {
                payload = [...prev]
                const draggedElement = prev[dragIndex]
                const hoveredElement = prev[hoverIndex]
                payload[dragIndex] = hoveredElement
                payload[hoverIndex] = draggedElement
                return payload
            })
            const res = window.localStorage.getItem('savedSimulation')
            if (res !== null) {
                const { params } = JSON.parse(res)
                window.localStorage.setItem(
                    'savedSimulation',
                    JSON.stringify({ params, forCompare: payload })
                ) // saveParamsToLocalStorage was not working (probably due to caching in useCallbacks, it was saving initial default queryParams)
            }
        },
        []
    )

    const renderStructureCard = useCallback(
        (simulation: ForCompareSimulationParams | null, index: number) => {
            const title = (
                <p className='absolute left-3 top-3 tracking-wider font-bold text-slate-700 text-sm'>
                    {(1 + index).toString()}
                    <sup className='text-inherit lowercase'>
                        {dict(
                            index === 0
                                ? 'first_exp'
                                : index === 1
                                ? 'second_exp'
                                : 'third_exp'
                        )}
                    </sup>{' '}
                    {dict('simulation')}
                </p>
            )

            return simulation !== null ? (
                <CompareGeneralSummary
                    index={index}
                    key={simulation.id}
                    compareParams={simulation}
                    simulationTitleForCompare={title}
                    handleDraggingSimulation={handleDraggingSimulation}
                />
            ) : (
                <RoundedBox
                    key={uuidv4()}
                    shadow=''
                    className='bg-slate-200/60 flex items-center justify-center relative sm:w-[500px] lg:w-1/3 min-h-[400px]'
                >
                    {title}
                    <p>{dict('empty')}</p>
                </RoundedBox>
            )
        },
        []
    )

    return (
        <div className='w-full flex flex-col gap-6'>
            <h2 className='uppercase font-poppins tracking-widest font-bold w-[95%] sm:w-full mx-auto text-center mb-2'>
                {dict('structure_comparator')}
            </h2>
            <DndProvider backend={HTML5Backend}>
                <div
                    className={joinString(
                        'px-2 py-3 sm:py-2 xl:px-4 xl:py-4 gap-2 xl:gap-4 shadow-md w-full lg:w-full sm:bg-slate-400 flex flex-col lg:flex-row mx-auto bg-white/20 sm:border-none sm:w-fit items-stretch'
                    )}
                >
                    {[undefined, undefined, undefined].map((_, i) =>
                        renderStructureCard(paramsForCompare[i] || null, i)
                    )}
                </div>
            </DndProvider>
            <p className='text-center text-sm italic font-bold'>
                {dict('comparator_intro_sentence_arr', 0)}{' '}
                <span className='font-light'>
                    {dict('comparator_intro_sentence_arr', 1)}
                </span>
                {dict('comparator_intro_sentence_arr', 2)} &quot;
                {dict('comparator_intro_sentence_arr', 3)}&quot;.
            </p>
        </div>
    )
}

export default StructureComparator
