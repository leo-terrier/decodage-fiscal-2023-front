import { v4 as uuidv4 } from 'uuid'

import { GeneralInfoCategory } from '../../../../common-types/compare-types'
import { useSimulationContext } from '../SimulationContext'
import { toaster } from '@/toaster'

import GeneralSummary from './GeneralSummary'
import Button from '../forms/components/raw/Button'
import { BiSolidSave } from 'react-icons/bi'
import { dict } from '@/utils/utils'

export type ResultGeneralSummaryType = {
    data: GeneralInfoCategory[]
    simulationTitleForCompare?: React.ReactNode
    roundedBoxClassName?: string
    roundedBoxPadding?: string
}
const ResultGeneralSummary = (props: ResultGeneralSummaryType) => {
    const {
        setParamsForCompare,
        queryParams,
        paramsForCompare,
        saveParamsToLocalStorage,
        isFirstRender,
        currentDisplayedParamsSavedId
    } = useSimulationContext()

    const handleAddForCompare = () => {
        {
            const payload = [
                ...paramsForCompare,
                {
                    params: JSON.parse(JSON.stringify(queryParams)), // att : modify original state if no copy
                    id: uuidv4()
                }
            ]
            setParamsForCompare(payload)
            toaster.success({ text: 'noti_simulation_added_to_comparator' })
            saveParamsToLocalStorage(payload, true)
        }
    }

    return (
        <GeneralSummary
            {...props}
            isCompare={false}
            buttons={
                <Button
                    onClick={handleAddForCompare}
                    disabled={
                        isFirstRender ||
                        currentDisplayedParamsSavedId !== null ||
                        paramsForCompare.length > 2
                    }
                    className='text-white bg-blueGray-dark uppercase tracking-wider font-bold opacity-[97%] hover:opacity-100 border-2 rounded px-4 py-2 border-blueGray-dark flex gap-2 items-center fill-white'
                >
                    <BiSolidSave fill='inherit' size='1.9rem' />
                    <span className='flex flex-col items-center text-inherit'>
                        <span className='text-lg text-inherit font-extrabold leading-tight'>
                            {dict('add_to_comparator_arr', 0)}
                        </span>
                        <span className='text-xs text-inherit font-light tracking-normal lowercase leading-tight'>
                            {dict('add_to_comparator_arr', 1)}
                        </span>
                    </span>
                </Button>
            }
        />
    )
}

export default ResultGeneralSummary
