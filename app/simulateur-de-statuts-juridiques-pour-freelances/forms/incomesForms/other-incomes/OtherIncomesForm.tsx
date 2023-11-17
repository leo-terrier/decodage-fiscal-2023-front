import { condiStyle, dict, formatCurrency, joinString } from '@/utils/utils'
import { useState } from 'react'

import Modal from '../../components/raw/Modal'
import NetTaxableIncomeForm from './forms/NetTaxableIncomeForm'
import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import { IoMdSettings } from 'react-icons/io'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import FinancialIncomeForm from './forms/FinancialIncomeForm'
import FurnishedRentalForm from './forms/FurnishedRentalForm'
import UnfurnishedRentalForm from './forms/UnfurnishedRentalForm'
import FormSectionTitle from '../../components/raw/FormSectionTitle'

import IconButton from '@/app/components/raw/IconButton'
import Beta from '@/app/components/raw/Beta'

const ModalDescription = ({
    text,
    subText
}: {
    text: string
    subText?: string
}) => (
    <span className='text-gray-500 flex flex-col gap-2'>
        <span>{text}</span>
        {subText ? <span className='italic'>{subText}</span> : <></>}
    </span>
)

type IndividualFormType = {
    handleClose: () => void
    openModal: OpenModal
}
const IndividualForm = ({ ...props }: IndividualFormType) => {
    if (props.openModal) {
        switch (props.openModal.incomeType) {
            case 'netTaxableIncomes':
                return <NetTaxableIncomeForm {...props} />
            case 'financialIncomes':
                return <FinancialIncomeForm {...props} />
            case 'furnishedRentals':
                return <FurnishedRentalForm {...props} />
            case 'unfurnishedRentals':
                return <UnfurnishedRentalForm {...props} />
            default:
                break
        }
    }
    return <></>
}

type IncomeTypesValues = {
    title: string
    listDisplayValue: string
    displayListLabel: string
    description: React.ReactNode
    isBeta: boolean
}

const incomeTypes = {
    netTaxableIncomes: {
        title: dict('net_taxable_incomes'),
        isBeta: false,
        listDisplayValue: 'netBeforeTaxIncome',
        displayListLabel: dict('net_income'),
        description: (
            <ModalDescription
                text={dict('desc_other_net_taxable_incomes', 0) as string}
                subText={dict('desc_other_net_taxable_incomes', 1) as string}
            />
        )
    },
    financialIncomes: {
        title: dict('financial_incomes'),
        isBeta: true,
        listDisplayValue: 'netBeforeTaxIncome',
        displayListLabel: dict('financial_income'),
        description: (
            <ModalDescription
                text={dict('desc_financial_incomes', 0) as string}
                subText={dict('desc_financial_incomes', 1) as string}
            />
        )
    },
    furnishedRentals: {
        title: dict('furnished_rentals'),
        isBeta: true,
        listDisplayValue: 'rents',
        displayListLabel: dict('rents'),
        description: (
            <ModalDescription
                text={dict('desc_furnished_rental', 0) as string}
                subText={dict('desc_furnished_rental', 1) as string}
            />
        )
    },
    unfurnishedRentals: {
        title: dict('unfurnished_rentals'),
        isBeta: true,
        listDisplayValue: 'rents',
        displayListLabel: dict('rents'),
        description: (
            <ModalDescription
                text={dict('desc_unfurnished_rental') as string}
            />
        )
    }
}

export type OpenModal = {
    incomeType: string
    editId: null | string
    title: string
    description: React.ReactNode
}

const OtherIncomesForm = () => {
    const {
        queryParams: { otherIncomes }
    } = useSimulationContext()

    const [openModal, setOpenModal] = useState<OpenModal | null>(null)

    const handleSetModal = (incomeType: string, editId: string | null) => {
        setOpenModal({
            incomeType,
            editId,
            title: incomeTypes[incomeType as keyof typeof incomeTypes].title,
            description:
                incomeTypes[incomeType as keyof typeof incomeTypes].description
        })
    }

    const handleClose = () => {
        setOpenModal(null)
    }

    const buildIncomeList = (
        key: string,
        incomeTypeValues: IncomeTypesValues
    ) => {
        const liStyle =
            'border-b-2 border-gray-300/50 h-8 flex w-full items-center gap-4'

        const listItems = []
        for (let i = 0; i < 3; i++) {
            const income = otherIncomes[key as keyof typeof otherIncomes][i]
            listItems.push(
                typeof income !== 'undefined' ? (
                    <li
                        className={joinString('justify-between', liStyle)}
                        key={income.id}
                    >
                        <p>{incomeTypeValues.displayListLabel}</p>
                        <p>
                            {formatCurrency(
                                income[
                                    incomeTypeValues.listDisplayValue as keyof typeof income
                                ] as unknown as number
                            )}
                        </p>
                        <IconButton
                            aria-label='Modifier'
                            onClick={() => handleSetModal(key, income.id)}
                        >
                            <IoMdSettings className='fill-inherit' />
                        </IconButton>
                    </li>
                ) : (
                    <li
                        className={joinString(liStyle, 'justify-center')}
                        key={i}
                    >
                        <IconButton
                            onClick={() => handleSetModal(key, null)}
                            aria-label='Ajouter'
                        >
                            <BsFillPlusCircleFill
                                className='fill-inherit'
                                size='1em'
                            />
                        </IconButton>
                    </li>
                )
            )
        }
        return listItems
    }

    return (
        <div className={'w-full'}>
            <FormSectionTitle className='mb-1'>
                {dict('other_incomes')}{' '}
            </FormSectionTitle>
            <p className='font-poppins text-gray-500 mb-6 text-center'>
                {dict('optional')}
            </p>
            <div className='flex flex-col-reverse gap-y-8 gap-x-4 md:flex-row justify-evenly items-center flex-wrap'>
                {Object.entries(incomeTypes).map(([key, values]) => (
                    <div key={key} className={'min-w-[250px]'}>
                        <h3
                            className={
                                'font-semibold font-poppins text-center mb-4 underline underline-offset-2'
                            }
                        >
                            {values.title}
                        </h3>
                        <div className='flex flex-col items-center gap-4 w-full'>
                            <ul className='w-full'>
                                {buildIncomeList(key, values)}
                            </ul>
                        </div>

                        <Beta
                            className={joinString(
                                condiStyle([
                                    values.isBeta,
                                    'visible',
                                    'invisible'
                                ]),
                                'mt-4'
                            )}
                            fontSize='text-md'
                        />
                    </div>
                ))}

                <Modal
                    isOpen={openModal !== null}
                    title={openModal ? openModal.title : ''}
                    description={openModal ? openModal.description : ''}
                    handleClose={handleClose}
                >
                    <div className='flex flex-col items-center gap-8 mt-8 max-w-[600px] mx-auto justify-center'>
                        <IndividualForm
                            handleClose={handleClose}
                            openModal={openModal as OpenModal}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default OtherIncomesForm
