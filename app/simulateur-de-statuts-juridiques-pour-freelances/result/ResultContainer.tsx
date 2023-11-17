'use client'
import { useEffect, useState } from 'react'
import OtherIncomesResults from './other-incomes/OtherIncomesResults'
import PersonResult from './person/PersonResult'
import { useSimulationContext } from '../SimulationContext'
import { dict, joinString } from '@/utils/utils'
import { condiStyle } from '@/utils/utils'

import Button from '../forms/components/raw/Button'
import { BsLink45Deg } from 'react-icons/bs'
import Select from '../forms/components/raw/Select'
import Modal from '../forms/components/raw/Modal'

import { saveParams } from '@/requests'
import { ResponseShape } from '../../../../common-types/general-types'
/* import { StructureComparator } from './StructureComparator' */
import ResultGeneralSummary from './ResultGeneralSummary'
import StructureComparator from './StructureComparator'
import Loader from '@/app/components/Loader'
import { BiCopy } from 'react-icons/bi'
import { toaster } from '@/toaster'

const ResultContainer = () => {
    const [openResult, setOpenResult] =
        useState<keyof typeof resultTypes>('person')

    const { simulationResult, queryParams, isFirstRender, paramsForCompare } =
        useSimulationContext()

    // LINK MODAL
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
    const [searchId, setSearchId] = useState<string | null>(null)

    const handleOpenLinkModal = async () => {
        setIsLinkModalOpen(true)
        const id = await saveParams({
            params: queryParams,
            forCompare: paramsForCompare
        })
        setSearchId(id)
    }

    const handleCloseLinkModal = () => {
        setSearchId(null)
        setIsLinkModalOpen(false)
    }

    type ResultType = {
        title: string
        key: number
        component: React.ReactNode
    }

    const resultTypes: Partial<{
        [key in keyof ResponseShape]: ResultType | null
    }> = {
        person: {
            title: dict('declarant') + ' 1',
            key: 0,
            component: <PersonResult data={simulationResult.person} key={0} />
        },
        personD2: simulationResult.personD2
            ? {
                  title: dict('declarant') + ' 2',
                  key: 1,
                  component: (
                      <PersonResult data={simulationResult.personD2} key={1} />
                  )
              }
            : null,
        otherIncomes: simulationResult.otherIncomes
            ? {
                  title: dict('other_incomes'),
                  key: 2,
                  component: (
                      <OtherIncomesResults
                          data={simulationResult.otherIncomes}
                          key={2}
                      />
                  )
              }
            : null
    }

    // if form update results in result === null, default to personD1
    useEffect(() => {
        if (!simulationResult[openResult]) setOpenResult('person')
    }, [simulationResult, openResult])

    const resultTypeEntries = Object.entries(resultTypes).filter(
        (pair) => pair[1] // resultType[openResult] is not null
    )

    const [isScreenSm, setIsScreenSm] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsScreenSm(window.innerWidth > 640)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className={'flex flex-col gap-14 w-full items-center relative'}>
            <div
                className={
                    'hidden sm:block border-white sm:border-gray-300 w-7/12 border-y mx-auto rounded-full'
                } //DIVIDER
            />
            {resultTypeEntries.length > 1 ? (
                <div className='flex gap-10 w-full justify-center font-extrabold xl:-mt-2 xl:mb-2'>
                    {isScreenSm ? (
                        resultTypeEntries.map(([key, value]) => (
                            <Button
                                className={
                                    'text-[1.6rem]' +
                                    condiStyle([
                                        key === openResult,
                                        'text-orange-dark',
                                        'hover:text-orange-dark'
                                    ])
                                }
                                onClick={() =>
                                    setOpenResult(key as keyof ResponseShape)
                                }
                                key={key}
                            >
                                {(value as ResultType).title}
                            </Button>
                        ))
                    ) : (
                        <Select
                            mainLabel={'results'}
                            labelJustify={'justify-center'}
                            labelBoldness={'font-extrabold'}
                            labelClassName={'text-xl'}
                            options={resultTypeEntries.map((entries) => ({
                                value: entries[0],
                                name: entries[1]!.title
                            }))}
                            id='resultType'
                            onChange={(value) =>
                                setOpenResult(value as keyof ResponseShape)
                            }
                            value={openResult}
                        />
                    )}
                </div>
            ) : (
                <p className='text-3xl font-extrabold xl:-mt-2 xl:mb-2'>
                    {dict('results')}
                </p>
            )}
            {resultTypes[openResult] !== null &&
                resultTypes[openResult]!.component}

            <div
                className={'sm:border-gray-300 w-7/12 border-y rounded-full'} //DIVIDER
            />
            <div
                className={joinString(
                    'w-full sm:w-10/12 lg:w-full bg-white rounded-lg mx-auto',
                    condiStyle([
                        simulationResult.generalInfo.length > 2,
                        'xl:w-full 2xl:w-11/12',
                        'xl:w-10/12'
                    ])
                )}
            >
                <ResultGeneralSummary
                    data={simulationResult.generalInfo}
                    roundedBoxClassName={joinString(
                        condiStyle([isFirstRender, 'opacity-70']),
                        'sm:bg-slate-200/90 bg-white'
                    )}
                    roundedBoxPadding='sm:px-6 sm:py-8 lg:p-10 lg:pt-12'
                />
            </div>
            <div
                className={'sm:border-gray-300 w-7/12 border-y rounded-full'} //DIVIDER
            />

            <StructureComparator />
            <Button
                className='relative text-xl flex items-center gap-1 fill-blueGray-dark sm:fill-sky-800 sm:hover:fill-sky-900 sm:text-sky-800 sm:hover:text-sky-900 -mb-8 sm:mb-0'
                onClick={handleOpenLinkModal}
                opacity={''}
                disabled={isFirstRender}
            >
                <BsLink45Deg
                    fill='inherit'
                    size='2.15rem'
                    className='absolute right-full -translate-x-1'
                />
                <p className='underline underline-offset-4 text-2xl text-inherit font-poppins font-semibold'>
                    {dict('share')}
                </p>
            </Button>
            <Modal
                isOpen={isLinkModalOpen}
                title={dict('simulation_link')}
                description={
                    <span className='text-xl sm:mb-3'>
                        {dict('simulation_result_at_this_url')}
                    </span>
                }
                handleClose={handleCloseLinkModal}
            >
                <form className='w-full h-full flex items-stretch justify-center sm:px-2 lg:px-6 xl:px-8 py-2 sm:py-4'>
                    {searchId === null ? (
                        <Loader />
                    ) : (
                        <>
                            <Button
                                className='rounded-md rounded-r-none w-fit p-2 border border-orange-dark bg-orange-dark fill-white'
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        (process.env.NEXT_PUBLIC_IS_DEV ===
                                        'true'
                                            ? 'localhost:3000/'
                                            : 'https://decodage-fiscal.fr/') +
                                            'simulateur-de-statuts-juridiques-pour-freelances?saved-search=' +
                                            searchId
                                    )
                                    toaster.info({ text: 'noti_copied_link' })
                                    handleCloseLinkModal()
                                }}
                            >
                                <BiCopy fill='inherit' size='1.5rem' />
                            </Button>
                            <input
                                readOnly
                                type='text'
                                className='w-full rounded-md rounded-l-none p-2 text-orange-dark bg-orange-light border-orange-dark selection:bg-blueGray-light selection:text-white font-semibold'
                                value={
                                    (process.env.NEXT_PUBLIC_IS_DEV === 'true'
                                        ? 'localhost:3000/'
                                        : 'https://decodage-fiscal.fr/') +
                                    'simulateur-de-statuts-juridiques-pour-freelances?saved-search=' +
                                    searchId
                                }
                            />
                        </>
                    )}
                </form>
            </Modal>
        </div>
    )
}

export default ResultContainer
