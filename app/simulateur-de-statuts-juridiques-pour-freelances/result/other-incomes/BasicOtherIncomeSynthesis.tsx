import MobileWhiteBox from '@/app/components/MobileWhiteBox'

import RentalFiscalSummary from '../components/RentalFiscalSummary'
import RevenueEntitySynthesis from '../components/RevenueEntitySynthesis'
import { joinString } from '@/utils/utils'
import {
    OtherIncomeRevenueEntity,
    OtherIncomeSummaryLine,
    RevenueEntityType
} from '../../../../../common-types/synthesis-types'

const BasicOtherIncomesSynthesis = ({
    data
}: {
    data: OtherIncomeRevenueEntity
}) => {
    const { title, revenueEntities } = data
    return (
        <MobileWhiteBox className='flex flex-col gap-10 sm:gap-12 items-center px-1 py-8 sm:p-0'>
            <div className='flex flex-col gap-8 sm:gap-10 w-full'>
                <h2 className='font-bold text-[22px] sm:text-2xl text-center text-orange-dark w-[95%] sm:w-full mx-auto'>
                    {title}
                </h2>
                {revenueEntities.map((entity: RevenueEntityType, i: number) => (
                    <RevenueEntitySynthesis
                        title={entity.title}
                        lines={entity.lines}
                        isYearly={entity.isYearly}
                        key={i}
                        tableWidth={joinString(
                            'max-w-[550px] w-[90%] sm:w-full mx-auto'
                        )}
                        isOtherIncomes
                    />
                ))}
            </div>
            {'summary' in data && (
                <RentalFiscalSummary
                    summary={data.summary as OtherIncomeSummaryLine[]}
                />
            )}
        </MobileWhiteBox>
    )
}

export default BasicOtherIncomesSynthesis
