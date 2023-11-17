'use client'
import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import NumberField from './components/raw/NumberField'
import ToggleField from './components/raw/ToggleField'
import RoundedBox from '../../components/RoundedBox'
import { useEffect, useState } from 'react'
import FormSectionTitle from './components/raw/FormSectionTitle'
import { dict } from '@/utils/utils'
import OuterLink from '@/app/components/raw/OuterLink'

const HouseholdForm = () => {
    const { handleAddParams, queryParams, savedParams } = useSimulationContext()

    const [isMarried, setIsMarried] = useState(queryParams.isMarried)
    const [nbOfChildren, setNbOfChildren] = useState(queryParams.nbOfChildren)
    const [globalTaxableIncomeDeduction, setGlobalTaxableIncomeDeduction] =
        useState(queryParams.globalTaxableIncomeDeduction)

    const handleChangeIsMarried = () => {
        handleAddParams('isMarried', !isMarried)
        setIsMarried(!isMarried)
    }

    const handleChangeNbOfChildren = (value: number) => {
        handleAddParams('nbOfChildren', value)
        setNbOfChildren(value)
    }

    const handleChangeGlobalTaxableIncomeDeduction = (value: number) => {
        handleAddParams('globalTaxableIncomeDeduction', value)
        setGlobalTaxableIncomeDeduction(value)
    }

    useEffect(() => {
        // no pb since never unmounted
        if (Object.keys(savedParams).length) {
            setIsMarried(savedParams.isMarried)
            setNbOfChildren(savedParams.nbOfChildren)
            setGlobalTaxableIncomeDeduction(
                savedParams.globalTaxableIncomeDeduction
            )
        }
    }, [savedParams])

    return (
        <RoundedBox
            padding='p-4 sm:p-6'
            className='w-full sm:w-10/12 flex flex-col gap-2 mx-auto bg-orange-light relative'
        >
            <FormSectionTitle className='sm:absolute sm:bottom-full sm:right-0 sm:left-0 sm:mx-auto sm:translate-y-1/2 static translate-y-0'>
                {dict('household')}
            </FormSectionTitle>
            <div className='flex items-center justify-evenly gap-x-5 gap-y-2 flex-wrap '>
                <ToggleField
                    labelWidth='w-full sm:w-fit'
                    mainLabel='married_or_civil_union'
                    id='isMarried'
                    handleChange={handleChangeIsMarried}
                    isChecked={isMarried}
                    labelWhiteSpace={'whitespace-nowrap'}
                    ariaLabel={'Changer le statut marital'}
                />
                <NumberField
                    labelWidth='w-full sm:w-fit'
                    mainLabel='number_of_children'
                    id='nbOfChildren'
                    handleChange={handleChangeNbOfChildren}
                    value={nbOfChildren}
                    maxValue={20}
                    stepper={1}
                    width='xs'
                    bubbleContentNode={
                        <>
                            <p>{dict('nb_of_children_bubble')}</p>
                            <OuterLink href='https://www.service-public.fr/particuliers/vosdroits/F2705#:~:text=nombre%20de%20parts.-,Ce%20nombre%20de%20parts%20d%C3%A9pend%20de%20la%20situation%20du%20contribuable,chaque%20quart%20de%20part%20suppl%C3%A9mentaire' />
                        </>
                    }
                    labelWhiteSpace={'whitespace-nowrap'}
                />
                <NumberField
                    labelWidth='w-full sm:w-fit'
                    mainLabel='global_income_deductible_expenses'
                    id='globalTaxableIncomeDeduction'
                    handleChange={handleChangeGlobalTaxableIncomeDeduction}
                    value={globalTaxableIncomeDeduction}
                    width='md'
                    bubbleContentNode={
                        <>
                            <p /* className='text-left' */>
                                {dict(
                                    'global_income_deductible_expenses_bubble'
                                )}
                            </p>
                            <OuterLink href='https://www.economie.gouv.fr/particuliers/revenu-imposable-revenu-fiscal-reference' />
                        </>
                    }
                    labelWhiteSpace={'whitespace-normal sm:whitespace-nowrap'}
                />
            </div>
        </RoundedBox>
    )
}

export default HouseholdForm
