import { dict } from '@/utils/utils'
import Table, { TableType } from './raw/Table'
import { RevenueEntityType } from '../../../../../common-types/synthesis-types'

type Type = RevenueEntityType & Partial<TableType>
const RevenueEntitySynthesis = ({ title, lines, isYearly, ...props }: Type) => {
    const headers = isYearly
        ? []
        : [dict('yearly_masc_sing'), dict('monthly_masc_sing')]

    return (
        <div className='w-full'>
            {title ? (
                <h3 className='font-bold text-xl text-center mb-5'>{title}</h3>
            ) : (
                <></>
            )}
            <Table headers={headers} lines={lines} {...props} />
        </div>
    )
}

export default RevenueEntitySynthesis
