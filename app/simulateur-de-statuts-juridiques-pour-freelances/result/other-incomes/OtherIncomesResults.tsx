import { OtherIncomesSynthesis } from '../../../../../common-types/synthesis-types'
import BasicOtherIncomesSynthesis from './BasicOtherIncomeSynthesis'
const OtherIncomesResults = ({ data }: { data: OtherIncomesSynthesis }) => {
    return (
        <div className='flex flex-col'>
            {Object.values(data)
                .filter((data) => data !== null)
                .map((revenueType, i) => (
                    <>
                        {i > 0 && (
                            <div className='invisible sm:visible border border-gray-300 w-full my-8 sm:my-12' />
                        )}
                        <BasicOtherIncomesSynthesis
                            data={revenueType!}
                            key={revenueType!.title}
                        />
                    </>
                ))}
        </div>
    )
}

export default OtherIncomesResults
