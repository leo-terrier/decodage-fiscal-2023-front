import Image from 'next/image'
import adBanner from 'public/ad-banner.png'
import CheckBox from 'public/slogan-logo-checkbox.png'
import PaintIcon from 'public/paint-icon.png'
import PensionIcon from 'public/pension-icon.png'
import RentalIcon from 'public/rental-icon.png'
import UrssafLogo from 'public/urssaf_logo.svg'
import SocialFormIcon from 'public/corporation-icon.png'
import DividendIcon from 'public/dividend-icon.png'
import { getPosts } from './blog/page'
import { GoToSimulatorButton, InnerLink } from './blog/reusable-components'
import { dict } from '@/utils/utils'

const SloganCheckedItem = ({ text }: { text: string }) => (
    <p className='flex gap-2 items-center text-orange-dark font-poppins font-semibold sm:text-base text-[0.95rem]'>
        <Image src={CheckBox} className='h-8 w-8' alt='Case cochée' />
        {text}
    </p>
)

const checkedItems = [
    dict('main_features_6_social_forms_available'),
    dict('main_features_taxes_contributions_net_income_calculation'),
    dict('main_features_pension_forecast'),
    dict('main_features_adding_fiscal_options'),
    dict('main_features_adding_assets'),
    dict('main_features_accounting_for_household')
]

const titleStyle =
    'text-2xl sm:text-3xl font-poppins font-semibold text-orange-dark bg-orange-light py-1 px-1 mt-12 sm:mt-16 border-b-2 border-orange-dark'

const newFeatures = [
    {
        alt: 'Pinceaux',
        icon: PaintIcon,
        text: <p>{dict('new_feature_new_design')}</p>
    },
    {
        alt: 'alt',
        icon: PensionIcon,
        text: <p>{dict('new_feature_pension_forecast')}</p>
    },
    {
        alt: 'Immeuble',
        icon: RentalIcon,
        text: (
            <p>
                {dict('new_feature_accounting_for_assets_arr', 0)}{' '}
                <span className='font-light'>
                    {dict('new_feature_accounting_for_assets_arr', 1)}
                </span>
            </p>
        )
    },
    {
        alt: "Logo de l'Urssaf",
        icon: UrssafLogo,
        text: <p>{dict('new_feature_urssaf_calculation')}</p>
    },
    {
        alt: 'Contrat',
        icon: SocialFormIcon,
        text: (
            <p>
                {dict('new_feature_adding_2_social_forms_arr', 0)}{' '}
                <span className='font-light'>
                    {dict('new_feature_adding_2_social_forms_arr', 1)}
                </span>
            </p>
        )
    },
    {
        alt: 'Courbe de croissance',
        icon: DividendIcon,
        text: <p>{dict('new_feature_accounting_for_EURL_dividends_')}</p>
    },
    {
        alt: 'Case cochée',
        icon: CheckBox,
        text: (
            <p>
                {dict('new_feature_adding_4_fiscal_options_arr', 0)}{' '}
                <span className='font-light'>
                    {' '}
                    {dict('new_feature_adding_4_fiscal_options_arr', 1)}
                </span>
            </p>
        )
    }
]

const posts = getPosts(true)

export default function Page() {
    return (
        <div className={'articlePageContainerStyle border-x-2'}>
            <div className='flex flex-col lg:flex-row gap-6 sm:gap-10 mt-8 mb-12 xl:my-20 sm:px-12 items-center'>
                <div className='w-full'>
                    <div className='w-full mx-auto max-w-[500px]'>
                        <Image
                            alt="bannière d'accueil"
                            src={adBanner}
                            className='w-full h-auto'
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full mx-auto'>
                    {checkedItems.map((item, i) => (
                        <SloganCheckedItem text={item} key={i} />
                    ))}
                </div>
            </div>
            <GoToSimulatorButton isBlank={false} />
            <h2 className={titleStyle}>{dict('new_features')}</h2>
            <ul className='p-4 mt-4 flex flex-col gap-2'>
                <li className='italic'>{dict('update_of')} 19/09/2023</li>
                {newFeatures.map((feature, i) => (
                    <li
                        key={i}
                        className='flex gap-4 items-center font-semibold text-lg'
                    >
                        <Image
                            src={feature.icon}
                            alt={feature.alt}
                            className='h-8 w-8'
                        />
                        {feature.text}
                    </li>
                ))}
            </ul>
            <h2 className={titleStyle}>{dict('new_articles')}</h2>
            <div className='mt-4 p-4'>
                {posts
                    .filter((_, i) => i < 10)
                    .map((post) => (
                        <p key={post.slug} className=' flex flex-col mb-3'>
                            <InnerLink
                                href={`/blog/${post.slug}`}
                                isBlank={false}
                            >
                                {post.meta.articleTitle}
                            </InnerLink>
                            <span className='text-sm'>{post.meta.date}</span>
                        </p>
                    ))}
            </div>
        </div>
    )
}
