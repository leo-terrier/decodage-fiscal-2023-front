import RoundedBox from '@/app/components/RoundedBox'
import { Pension } from '../../../../../common-types/synthesis-types'

import { dict } from '@/utils/utils'
import InfoTooltip from '@/app/components/InfoTooltip'
import { InnerLink } from '@/app/blog/reusable-components'

const cellClassName = 'px-2'

const PensionSynthesis = ({ pension }: { pension: Pension }) => {
    const { quarters, yearly, monthly } = pension
    return (
        <RoundedBox
            padding='p-4'
            className='w-full sm:w-[450px] mx-auto bg-orange-light sm:bg-opacity-80 flex flex-col items-center gap-2'
        >
            <h3 className='text-lg font-bold'>
                {dict('forseen_pension')}{' '}
                <InfoTooltip
                    bubbleContentNode={
                        <p className='text-base'>
                            {dict('pension_bubble')} (
                            {
                                <InnerLink href='/blog/retraite-du-freelance-guide-complet-avec-simulateur-par-statut'>
                                    plus d&apos;information
                                </InnerLink>
                            }
                            ).
                        </p>
                    }
                />
            </h3>
            <p className='text-sm'>{dict('for_43_years_of_labor')}</p>
            <div className='flex gap-2 justify-center'>
                <div className='flex flex-col gap-2 items-center'>
                    <p className='underline'>{dict('validated_quarters')}</p>
                    <p>
                        <span className='text-5xl'>{quarters} </span>/{' '}
                        <span className='lowercase'>{dict('year')}</span>
                    </p>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <p className='underline'>{dict('gross_pension')}</p>
                    <table>
                        <tbody>
                            <tr>
                                <td className={cellClassName + ' text-left'}>
                                    {dict('yearly_fem_sing')}
                                </td>
                                <td className={cellClassName + ' text-left'}>
                                    {yearly}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={
                                        cellClassName + ' text-right py-1'
                                    }
                                >
                                    {dict('monthly_fem_sing')}
                                </td>
                                <td className={cellClassName + ' text-right'}>
                                    {monthly}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </RoundedBox>
    )
}

export default PensionSynthesis
