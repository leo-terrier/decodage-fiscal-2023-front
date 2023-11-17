import { ToastContainer } from 'react-toastify'

import { dict, joinString, metadataBuilder } from '@/utils/utils'
import MobileWhiteBox from '../components/MobileWhiteBox'
import { SimulationContextProvider } from './SimulationContext'
import ResultContainer from './result/ResultContainer'
import { getPosts } from '../blog/page'
import TopicalArticles from './components/TopicalArticles'
import monEntrepriseLogo from 'public/logo-mon-entreprise-urssaf.jpg'
import Image from 'next/image'
import RetreiveSearchParams from './components/RetreiveSearchParams'
import HouseholdForm from './forms/HouseholdForm'
import IncomesForm from './forms/IncomesForm'
import { Bold } from '../components/raw/Bold'
import { Underline } from '../blog/reusable-components'
import 'react-toastify/dist/ReactToastify.css'
import MobileGoToSimulatorButton from './components/MobileGoToSimulatorButton'

export const generateMetadata = () =>
    metadataBuilder({
        relativeUrl: '/simulateur-de-statuts-juridiques-pour-freelances',
        title: dict('simulator_page_title')
    })

export default function Simulation() {
    const posts = getPosts()

    return (
        <div
            style={{ minHeight: '100vh' }}
            className={joinString(
                'bg-transparent sm:bg-white sm:border-x w-[95%] borderContainerWidth borderContainerPadding'
            )}
        >
            <ToastContainer
                //style={{ width: 'fit-content' }}
                className={'toast-container'}
                position='top-right'
                autoClose={4500}
                closeOnClick
                hideProgressBar={true}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme='light'
            />
            <MobileGoToSimulatorButton />
            <MobileWhiteBox className='mt-4 mb-16 p-6 pb-8 sm:p-0 sm:mb-0 sm:mt-0'>
                <h1>{dict('simulator_page_header')}</h1>
                <section className='flex flex-col gap-2 w-full sm:w-11/12 mx-auto sm:mb-14'>
                    <p>
                        Bienvenue sur le Simulateur de statuts juridiques pour
                        Freelance du site Décodage Fiscal !
                    </p>
                    <p>
                        Ce simulateur s’adresse principalement aux freelances,
                        bien qu’il puisse être utilisé par les autres
                        indépendants, les chefs d’entreprise et les
                        particuliers.
                    </p>
                    <p>
                        Le Simulateur permet d’inscrire son{' '}
                        <Bold>
                            <Underline>
                                Taux Journalier Moyen à facturer (TJM)
                            </Underline>{' '}
                        </Bold>
                        ainsi que{' '}
                        <Bold>
                            <Underline>ses frais de fonctionnement</Underline>{' '}
                        </Bold>
                        et d’obtenir{' '}
                        <Bold>
                            son revenu net, ses dividendes, sa retraite estimée,
                            son impôt et ses cotisations sociales
                        </Bold>
                        .
                    </p>
                    <p>
                        Vous pourrez choisir parmi six statuts juridiques (
                        <Bold>
                            EURL à l’IS, EURL à l’IR, SASU, Micro-Entreprise,
                            Entreprise Individuelle et Salariat
                        </Bold>
                        ) et quatre options fiscales (
                        <Bold>
                            Versement Forfaitaire Libératoire, ACRE, option pour
                            l’imposition des dividendes au barème, option pour
                            l’Impôt sur les Sociétés
                        </Bold>
                        ).
                    </p>
                    <p>
                        Afin de gagner en précision (et rendre les choses plus
                        intéressantes), il est également possible d’ajouter des
                        revenus du patrimoine (revenus locatifs meublée et
                        non-meublé, revenus financiers) ainsi que d’autres
                        revenus nets imposables.
                    </p>
                    <p>
                        <Bold>
                            Vous avez donc toutes les clés pour trouver la
                            structure et le modèle de rémunération qu’il vous
                            faut pour votre activité !
                        </Bold>
                    </p>
                    <p className='italic text-sm mt-4'>
                        {dict('simulator_intro_pRest_arr', 2)}
                    </p>
                </section>
            </MobileWhiteBox>
            <SimulationContextProvider>
                <div className='flex flex-col gap-24'>
                    <section
                        className='flex flex-col items-center gap-14'
                        id='formSection'
                    >
                        <RetreiveSearchParams />
                        <form className='w-full flex flex-col gap-[105px] sm:gap-20 max-w-[1458px]'>
                            <HouseholdForm />
                            <IncomesForm />
                        </form>
                        <ResultContainer />
                    </section>
                    <div className='flex flex-col gap-2'>
                        <MobileWhiteBox
                            className={
                                'mx-auto font-light italic p-6 sm:py-0 flex flex-col sm:block sm:w-11/12 xl:w-full'
                            }
                        >
                            <div className='flex flex-col sm:flex-row gap-2 lg:gap-3 xl:gap-4 items-center xl:mb-4 lg:mb-3 mb-2'>
                                <a
                                    className='flex items-center justify-center h-8 shrink-0'
                                    href='https://mon-entreprise.urssaf.fr/simulateurs-et-assistants'
                                    target='_blank'
                                >
                                    <Image
                                        src={monEntrepriseLogo}
                                        alt='Logo du site Mon Entreprise'
                                        className='h-full w-auto'
                                    />
                                </a>
                                <p>
                                    {dict('urssaf_phrase_arr', 0)}{' '}
                                    <a
                                        href='https://mon-entreprise.urssaf.fr/simulateurs-et-assistants'
                                        target='_blank'
                                        rel='nofollow'
                                    >
                                        {dict('urssaf_phrase_arr', 1)}
                                    </a>{' '}
                                    (
                                    <a
                                        href='https://github.com/betagouv/mon-entreprise/blob/master/LICENSE'
                                        target='_blank'
                                        className='normal-color-link'
                                        rel='nofollow'
                                    >
                                        licence
                                    </a>
                                    ).
                                </p>
                            </div>
                            <p>{dict('bottom_disclaimer')}</p>
                        </MobileWhiteBox>
                        <TopicalArticles
                            posts={posts}
                            className='mb-4 sm:mb-0'
                        />
                    </div>
                </div>
            </SimulationContextProvider>
        </div>
    )
}
