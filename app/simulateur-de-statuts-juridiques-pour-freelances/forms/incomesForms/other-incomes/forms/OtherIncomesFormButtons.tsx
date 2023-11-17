import { dict } from '@/utils/utils'
import ActionButton from '../../../components/raw/ActionButton'
import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import { OtherIncomes } from '../../../../../../../common-types/other-incomes-types'
import { OpenModal } from '../OtherIncomesForm'

type Type = {
    isSubmitDisabled: boolean
    handleSubmit: () => void
    handleClose: () => void
    openModal: OpenModal
}

const OtherIncomesFormButtons = ({
    isSubmitDisabled,
    openModal,
    handleSubmit,
    handleClose
}: Type) => {
    const { setQueryParams } = useSimulationContext()

    const handleDelete = () => {
        setQueryParams((prev) => {
            // TODO : solve TS error for "arr.filter"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newArr = [] as any
            prev.otherIncomes[
                openModal.incomeType as keyof OtherIncomes
            ].forEach((income) => {
                if (income.id !== (openModal.editId as string)) {
                    newArr.push(income)
                }
            })
            return {
                ...prev,
                otherIncomes: {
                    ...prev.otherIncomes,
                    [openModal.incomeType as keyof OtherIncomes]: newArr
                }
            }
        })
        handleClose()
    }

    return (
        <div className='flex flex-col sm:flex-row justify-evenly w-7/12 sm:w-full gap-4'>
            <ActionButton onClick={handleSubmit} disabled={isSubmitDisabled}>
                {dict(openModal.editId === null ? 'add' : 'save')}
            </ActionButton>
            {openModal.editId !== null && (
                <ActionButton onClick={handleDelete} variant='danger'>
                    {dict('delete')}
                </ActionButton>
            )}
        </div>
    )
}

export default OtherIncomesFormButtons
