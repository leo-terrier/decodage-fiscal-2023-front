import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import RevenueField from '../components/form-fields/RevenueField'
import { dict, individualizeFieldName, joinString } from '@/utils/utils'
import { useState } from 'react'
import Expenses from '../components/form-fields/Expenses'
import Compensation from '../components/form-fields/Compensation'
import SocialForm from '../components/form-fields/SocialForm'
import IsService from '../components/form-fields/IsService'
import IsProfessional from '../components/form-fields/IsProfessional'
import IsRegulatedActivity from '../components/form-fields/IsRegulatedActivity'
import IsAcre from '../components/form-fields/IsAcre'
import IsVFL from '../components/form-fields/IsVFL'
import IsScaleOption from '../components/form-fields/isScaleOption'
import IsCorporateTax from '../components/form-fields/IsCorporateTax'

import ShareCapital from '../components/form-fields/ShareCapital'
import { getIsFreelance } from '../../utils/utils'
import FormSectionTitle from '../components/raw/FormSectionTitle'
import IsMonthlyToggle from '../components/form-fields/IsMonthlyToggle'

type Type = {
    isD2: boolean
}

const PersonIncomeForm = ({ isD2 }: Type) => {
    const { queryParams } = useSimulationContext()
    const [isMonthly, setIsMonthly] = useState(false)
    const socialForm = isD2 ? queryParams.socialFormD2 : queryParams.socialForm

    const isCorporateTax = isD2
        ? queryParams.isCorporateTaxD2
        : queryParams.isCorporateTax

    const isCorporateTaxSARL = socialForm === 'SARL' && isCorporateTax

    const isFreelance = getIsFreelance(socialForm)
    const isCompensation =
        ['SAS', 'employee'].includes(socialForm) || isCorporateTaxSARL

    const isLegalPanelJustSocialForm =
        socialForm === 'employee' || socialForm === 'none'

    const isLeftLegalPanel = socialForm !== 'SAS' // only has fiscal options

    const isMEOrEI = socialForm === 'ME' || socialForm === 'EI'

    const showRegulatedActivitiesToggle =
        socialForm === 'SARL' ||
        (isMEOrEI &&
            queryParams[individualizeFieldName('isService', isD2)] &&
            queryParams[individualizeFieldName('isProfessional', isD2)])

    const fiscalOptionsArr = []

    switch (socialForm) {
        case 'ME':
            fiscalOptionsArr.push(
                <IsAcre
                    id={individualizeFieldName('isAcre', isD2)}
                    key={individualizeFieldName('isAcre', isD2)}
                />,
                <IsVFL
                    id={individualizeFieldName('isVFL', isD2)}
                    key={individualizeFieldName('isVFL', isD2)}
                />
            )
            break
        case 'SARL':
            fiscalOptionsArr.push(
                <IsCorporateTax
                    id={individualizeFieldName('isCorporateTax', isD2)}
                    key={individualizeFieldName('isCorporateTax', isD2)}
                />,
                ...(isCorporateTax
                    ? [
                          <IsScaleOption
                              key={individualizeFieldName(
                                  'isScaleOption',
                                  isD2
                              )}
                          />
                      ]
                    : [])
            )
            break
        case 'SAS':
            fiscalOptionsArr.push(
                <IsScaleOption
                    key={individualizeFieldName('isScaleOption', isD2)}
                />
            )
            break
        default:
            break
    }

    return (
        <div
            className={joinString(
                'flex-col-reverse lg:flex-row flex justify-between w-full gap-8' /*  min-h-fit */
            )}
        >
            <div className='w-full'>
                <FormSectionTitle className={'mb-3 sm:mb-4'}>
                    {dict('finance')}
                </FormSectionTitle>
                {socialForm !== 'none' && (
                    <IsMonthlyToggle
                        isMonthly={isMonthly}
                        setIsMonthly={setIsMonthly}
                    />
                )}
                <div className='flex flex-row flex-wrap justify-evenly lg:flex-col items-center gap-6 min-h-[3rem]'>
                    {socialForm === 'none' && <p>{dict('not_applicable')}</p>}
                    {isFreelance && (
                        <>
                            <RevenueField
                                id={individualizeFieldName('revenue', isD2)}
                                isMonthly={isMonthly}
                            />
                            <Expenses
                                isMonthly={isMonthly}
                                socialForm={socialForm}
                                id={individualizeFieldName('expenses', isD2)}
                            />
                        </>
                    )}
                    {isCompensation && (
                        <Compensation
                            isMonthly={isMonthly}
                            id={individualizeFieldName('compensation', isD2)}
                            socialForm={socialForm}
                            isRequired={
                                isCorporateTaxSARL || socialForm === 'employee'
                            }
                            isD2={isD2}
                        />
                    )}
                </div>
            </div>
            <div
                className={
                    'w-8/12 h-0 border-y lg:w-0 lg:h-[180px] lg:border-x self-center border-gray-300 rounded-full'
                } // DIVIDER
            />
            <div className='min-w-[62%]'>
                <FormSectionTitle className={'mb-5 sm:mb-6'}>
                    {dict('legal')}
                </FormSectionTitle>
                <div className='flex flex-col items-center gap-8 max-w-full'>
                    <SocialForm isD2={isD2} />
                    {!isLegalPanelJustSocialForm && (
                        <div
                            className={
                                'w-full flex gap-8 flex-wrap items-start justify-center'
                            }
                        >
                            {isLeftLegalPanel && (
                                <div className='w-[268px] flex gap-6 flex-col'>
                                    {isCorporateTaxSARL && (
                                        <ShareCapital
                                            id={individualizeFieldName(
                                                'shareCapital',
                                                isD2
                                            )}
                                        />
                                    )}
                                    {isMEOrEI && (
                                        <>
                                            <IsService
                                                id={individualizeFieldName(
                                                    'isService',
                                                    isD2
                                                )}
                                            />
                                            {queryParams[
                                                individualizeFieldName(
                                                    'isService',
                                                    isD2
                                                )
                                            ] && (
                                                <IsProfessional
                                                    id={individualizeFieldName(
                                                        'isProfessional',
                                                        isD2
                                                    )}
                                                />
                                            )}
                                        </>
                                    )}
                                    {showRegulatedActivitiesToggle && (
                                        <IsRegulatedActivity
                                            id={individualizeFieldName(
                                                'isRegulatedActivity',
                                                isD2
                                            )}
                                        />
                                    )}
                                </div>
                            )}
                            {fiscalOptionsArr.length > 0 && (
                                <div className='bg-slate-200 p-3 pl-4 lg:p-4 lg:pl-6 border-l-4 min-w-[300px] sm:min-w-[356px]'>
                                    <h3
                                        className={
                                            'text-center text-[1.05rem] mb-2 font-poppins font-[500]'
                                        }
                                    >
                                        {dict('fiscal_options')} (
                                        {fiscalOptionsArr.length})
                                    </h3>
                                    <div className='flex flex-col items-start gap-1'>
                                        {fiscalOptionsArr}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PersonIncomeForm
