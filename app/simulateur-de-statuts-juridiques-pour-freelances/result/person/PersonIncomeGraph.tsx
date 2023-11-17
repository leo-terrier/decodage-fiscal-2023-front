import { condiStyle, dict, formatPercentage, joinString } from '@/utils/utils'

import { useSimulationContext } from '../../SimulationContext'
import MobileWhiteBox from '@/app/components/MobileWhiteBox'
import {
    AnnotationLine,
    GraphData
} from '../../../../../common-types/synthesis-types'
import InfoTooltip from '@/app/components/InfoTooltip'

type LineType = {
    annotationLine: AnnotationLine
    chartHeight: number
    isTranslate?: boolean
    isTop?: boolean
}

const Line = ({
    annotationLine,
    isTranslate = false,
    chartHeight,
    isTop = false
}: LineType) => {
    const { total, negativePercentage, label } = annotationLine
    const { isFirstRender } = useSimulationContext()
    return (
        <div
            className='absolute w-[213px] sm:w-[266px] right-0 left-0 mx-auto'
            style={{ top: Math.round(chartHeight * negativePercentage) + 'px' }}
        >
            <div
                className={joinString(
                    condiStyle([isTranslate, '-translate-y-1/2']),
                    'w-full border-t-2  mx-auto'
                )}
            />
            <div
                className={joinString(
                    'absolute translate-x-1/2 flex flex-col items-center',
                    condiStyle(
                        [
                            isTop || Math.round(negativePercentage * 100) > 90, // 35px small (for 350px chartHeight)
                            'bottom-2',
                            'top-2 '
                        ],
                        [
                            isTop && negativePercentage > 0,
                            '-right-11',
                            '-right-[8vw] sm:-right-8'
                        ]
                    )
                )}
            >
                <p className='font-poppins'>{label}</p>
                <p className='font-poppins font-semibold'>
                    {!isFirstRender ? total : '- - €'}
                </p>
            </div>
        </div>
    )
}

type TooltipType = {
    isDisabled: boolean
    percentage: number
    color: string
    label: string
    total: string
    children: React.ReactNode
}

const Tooltip = ({
    isDisabled,
    percentage,
    color,
    label,
    total,
    children
}: TooltipType) => {
    return (
        <div className='group relative w-fit mx-auto'>
            {children}
            <div
                className={
                    'absolute text-center w-fit border-[0.5px] border-slate-400 opacity-0 z-10 bg-white p-4 pointer-events-none' +
                    condiStyle([
                        !isDisabled,
                        'group-hover:opacity-100 bottom-full left-0 right-0 mx-auto -translate-y-2'
                    ])
                }
            >
                <p className={joinString(color, 'font-bold')}>{label}</p>
                <p className={joinString('font-bold')}>
                    {(percentage * 100).toFixed(1) + '%'}
                </p>
                <p>{total}</p>
                <div
                    className={
                        'w-4 h-4 bg-inherit absolute -bottom-2 left-1/2 -translate-x-1/2 transform rotate-45 border-l-transparent border-t-transparent border border-slate-400'
                    }
                />
            </div>
        </div>
    )
}

const firstRenderColors = [
    'bg-slate-300',
    'bg-slate-400',
    'bg-slate-500',
    'bg-slate-600'
]

const colors = {
    netProIncome: {
        color: 'text-green-600',
        bg: 'bg-green-600/60'
    },

    netDiv: {
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/60'
    },

    divTax: { color: 'text-[#CD5C5C]', bg: 'bg-[#FFC0CB]' },

    corporateTax: {
        color: 'text-gray-600	',
        bg: 'bg-gray-300'
    },

    proTax: {
        color: 'text-sky-400',
        bg: 'bg-sky-400'
    },
    contributions: {
        color: 'text-orange-300',
        bg: 'bg-[#FEEBC8]'
    },
    expenses: { color: 'text-orange-dark', bg: 'bg-[#fcbc8b]' }
}

type Type = {
    graphData: GraphData
    containerClassName: React.ComponentProps<'div'>['className']
}

const PersonIncomeGraph = ({ graphData, containerClassName }: Type) => {
    const chartHeight = 350
    const barArr: React.ReactNode[] = []
    const legendArr: React.ReactNode[] = []
    const { graphItems, base, totalNetIncome } = graphData
    const { isFirstRender } = useSimulationContext()

    graphItems.forEach((item, idx) => {
        barArr.push(
            <Tooltip
                percentage={item.percentage}
                color={colors[item.id as keyof typeof colors].color}
                label={item.label}
                total={item.total}
                isDisabled={isFirstRender}
                key={item.id}
            >
                <div
                    style={{
                        height: (item.percentage * chartHeight).toFixed() + 'px'
                    }} // anything below 0.25% is not received from backend
                    className={joinString(
                        isFirstRender
                            ? firstRenderColors[idx]
                            : colors[item.id as keyof typeof colors].bg,
                        'w-[160px] sm:w-[200px] bar mx-auto'
                    )}
                />
            </Tooltip>
        )
        legendArr.push(
            <div className='flex gap-1 items-center' key={item.id}>
                <div
                    className={joinString(
                        'w-4 h-3',
                        isFirstRender
                            ? firstRenderColors[idx]
                            : colors[item.id as keyof typeof colors].bg
                    )}
                />
                <p className={'text-sm'}>{item.label}</p>
            </div>
        )
    })

    return (
        <MobileWhiteBox className={containerClassName}>
            <div
                className='w-10/12 mx-auto relative sm:ml-auto -ml-4'
                style={{ height: chartHeight.toString() + 'px' }}
            >
                {barArr}
                <Line chartHeight={chartHeight} annotationLine={base} isTop />
                {totalNetIncome !== null && (
                    <Line
                        chartHeight={chartHeight}
                        annotationLine={totalNetIncome}
                        isTranslate
                    />
                )}
            </div>
            {totalNetIncome !== null &&
                totalNetIncome.negativePercentage < 0.99 && (
                    <p className='w-10/12 text-center font-poppins font-semibold mx-auto sm:ml-auto -ml-4'>
                        <span className='font-poppins font-normal underline underline-offset-2'>
                            {dict('profitability')}
                        </span>
                        <span>{' : '}</span>
                        {isFirstRender
                            ? '-- %'
                            : formatPercentage(
                                  1 - totalNetIncome.negativePercentage
                              )}{' '}
                        <span className='ml-0.5'>
                            <InfoTooltip
                                bubbleContentNode={dict(
                                    'structure_profitability_bubble'
                                )}
                            />
                        </span>
                    </p>
                )}
            <div className='w-full flex flex-wrap gap-x-5 gap-y-2 justify-center'>
                {legendArr}
            </div>
        </MobileWhiteBox>
    )
}

export default PersonIncomeGraph
