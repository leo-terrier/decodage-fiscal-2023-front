'use client'

import RadioButtons from '@/app/simulateur-de-statuts-juridiques-pour-freelances/forms/components/raw/RadioButtons'
import { condiStyle, dict, joinString } from '@/utils/utils'
import { useState } from 'react'

const trueOrFalseOptions = [
    { title: dict('true') as string, value: 'true' },
    { title: dict('false') as string, value: 'false' }
]

const unstringBool = (value: string) => (value === 'true' ? true : false)

const AcreEligibilityForm = () => {
    const [isCreator, setIsCreator] = useState(false)
    const [hasNotAlreadyBenefited, setHasNotAlreadyBenefited] = useState(false)
    const [meetsCase, setMeetsCase] = useState(false)

    const isGranted = isCreator && hasNotAlreadyBenefited && meetsCase
    return (
        <form className='bg-slate-200 p-6 sm:p-8'>
            <label className='bodytext'>
                {dict('acre_eligibility_meets_case')}
            </label>
            <RadioButtons
                my={'mt-4 mb-6'}
                options={trueOrFalseOptions}
                handleChange={(value: string) =>
                    setMeetsCase(unstringBool(value))
                }
                value={meetsCase.toString()}
            />

            <label className='bodytext'>
                {dict('acre_eligibility_is_creator')}
            </label>
            <RadioButtons
                my={'mt-4 mb-6'}
                options={trueOrFalseOptions}
                handleChange={(value: string) =>
                    setIsCreator(unstringBool(value))
                }
                value={isCreator.toString()}
            />
            <label className='bodytext'>
                {dict('acre_eligibility_has_not_already_benefited')}
            </label>
            <RadioButtons
                my={'mt-4 mb-6'}
                options={trueOrFalseOptions}
                handleChange={(value: string) =>
                    setHasNotAlreadyBenefited(unstringBool(value))
                }
                value={hasNotAlreadyBenefited.toString()}
            />
            <div className='flex gap-6 sm:justify-end items-center'>
                <p className='hidden sm:block uppercase tracking-wider font-extrabold text-xl'>
                    {dict('result')}
                </p>
                <div className='w-full sm:w-fit h-12 align-center bg-white sm:px-12 flex items-center justify-center'>
                    <p
                        className={joinString(
                            'font-bold tracking-wider',
                            condiStyle([
                                isGranted,
                                'text-green-400',
                                'text-rose-600'
                            ])
                        )}
                    >
                        {dict(isGranted ? 'eligible' : 'ineligible')}
                    </p>
                </div>
            </div>
        </form>
    )
}

export default AcreEligibilityForm
