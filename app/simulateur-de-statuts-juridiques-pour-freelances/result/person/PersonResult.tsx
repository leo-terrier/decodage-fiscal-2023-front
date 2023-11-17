import PensionSynthesis from './PensionSynthesis'
import RevenueEntitySynthesis from '../components/RevenueEntitySynthesis'
import PersonIncomeGraph from './PersonIncomeGraph'

import MobileWhiteBox from '@/app/components/MobileWhiteBox'
import { dict } from '@/utils/utils'
import {
    PersonResponseObj,
    RevenueEntityType
} from '../../../../../common-types/synthesis-types'

type Type = {
    data: PersonResponseObj | null | 'N/A'
}

const PersonResult = ({ data }: Type) => {
    if (!data) return <></>
    if (data === 'N/A') return dict('not_applicable')
    const { synthesis, graphData } = data
    return (
        <div className='w-full flex flex-col gap-16 xl:gap-14 items-center'>
            <div className='w-full flex gap-16 xl:gap-0 flex-col xl:flex-row items-center max-w-[1100px]'>
                <MobileWhiteBox className='w-full xl:w-7/12 flex flex-col gap-8 sm:gap-10 items-center px-1 py-6 sm:p-0'>
                    {synthesis.revenueEntities.map(
                        (entity: RevenueEntityType, i: number) => (
                            <RevenueEntitySynthesis
                                title={entity.title}
                                lines={entity.lines}
                                isYearly={false}
                                key={i}
                            />
                        )
                    )}
                </MobileWhiteBox>
                <PersonIncomeGraph
                    graphData={graphData}
                    containerClassName='w-full p-6 pt-[72px] sm:p-0 sm:pt-16 sm:w-7/12 xl:w-4/12 flex flex-col gap-6 justify-center xl:pt-0'
                />
            </div>
            <PensionSynthesis pension={data.synthesis.pension} />
        </div>
    )
}

export default PersonResult
