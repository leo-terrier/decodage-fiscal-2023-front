import './globals.css' // needed to apply tailwind classes to all routes
import type { Metadata } from 'next'
import Script from 'next/script'
import { WebApplication, WithContext } from 'schema-dts'

import { Nunito, Poppins, Rancho } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import newLogo from '../public/new-logo.png'
import newLogoSm from '../public/new-navlogo-slogan.png'
import NavigationBurgerMenu from './components/NavigationBurgerMenu'
import { condiStyle, dict, joinString } from '@/utils/utils'
import { SlSpeedometer } from 'react-icons/sl'
import { AiFillHome } from 'react-icons/ai'
import { TiDocumentText } from 'react-icons/ti'
import { BsLinkedin } from 'react-icons/bs'
import { TbArrowBigRight } from 'react-icons/tb'

const nunito = Nunito({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
    display: 'swap',
    variable: '--font-nunito'
})
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins'
})
const rancho = Rancho({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-rancho'
})

export const metadata: Metadata = {
    metadataBase: new URL('https://decodage-fiscal.fr'),
    alternates: {
        canonical: '/'
    },
    title: dict('decodage_fiscal_title'),
    description: dict('simulator_page_desc'),
    openGraph: {
        title: dict('decodage_fiscal_title'),
        description: dict('simulator_page_desc'),
        url: '/',
        siteName: 'Décodage Fiscal',
        locale: 'fr_FR',
        type: 'website'
    }
}

const jsonLd: WithContext<WebApplication> = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    image: 'https://decodage-fiscal.fr/og-image.png',
    description: dict('simulator_page_desc'),
    name: 'Décodage Fiscal',
    applicationCategory: 'Finance, Tax'
}

const hrefNavArr = [
    {
        icon: (
            <AiFillHome size='1.5rem' fill='inherit' className='text-inherit' />
        ),
        url: '/',
        title: dict('home')
    },
    {
        icon: (
            <SlSpeedometer
                size='1.5rem'
                fill='inherit'
                className='text-inherit'
            />
        ),
        url: '/simulateur-de-statuts-juridiques-pour-freelances',
        title: dict('simulator')
    },
    {
        icon: (
            <TiDocumentText
                size='1.6rem'
                fill='inherit'
                className='text-inherit'
            />
        ),
        url: '/blog',
        title: dict('blog')
    }
]

const LinkedinFooterElement = () => (
    <div className='flex gap-2 items-center'>
        <p className='italic text-gray-600 sm:hidden'>
            {dict('support_us_following_our_linkedin_page')}
        </p>
        <p className='italic text-gray-600 hidden sm:block'>
            {dict('support_us_following_our_linkedin_page_sm')}
        </p>
        <span className='fill-gray-300 stroke-gray-700'>
            <TbArrowBigRight size='1.5rem' fill='inherit' stroke='inherit' />
        </span>
        <a
            href='https://www.linkedin.com/company/d%C3%A9codage-fiscal'
            target='_blank'
        >
            <span className='sr-only'>Page LinkedIn de Décodage Fiscal</span>
            <BsLinkedin fill='#0072b1' size='1.5rem' />
        </a>
    </div>
)
export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang='fr'
            style={{ minHeight: '100vh' }}
            className='overflow-x-hidden text-[16px] md:text-[17px]'
        >
            <body
                id='body'
                style={{ minHeight: '100vh' }}
                className={`${nunito.variable} ${poppins.variable} ${rancho.variable}`}
            >
                {process.env.NEXT_PUBLIC_IS_DEV === 'false' ? (
                    <Script id='audience-tracking'>
                        {`(function(window, document, dataLayerName, id) {
window[dataLayerName]=window[dataLayerName]||[],window[dataLayerName].push({start:(new Date).getTime(),event:"stg.start"});var scripts=document.getElementsByTagName('script')[0],tags=document.createElement('script');
function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d="; expires="+e.toUTCString();f="; SameSite=Strict"}document.cookie=a+"="+b+d+f+"; path=/"}
var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");var qPString=qP.length>0?("?"+qP.join("&")):"";
tags.async=!0,tags.src="https://decodage-fiscal.containers.piwik.pro/"+id+".js"+qPString,scripts.parentNode.insertBefore(tags,scripts);
!function(a,n,i){a[n]=a[n]||{};for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){var a=[].slice.call(arguments,0);"string"==typeof a[0]&&window[dataLayerName].push({event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)})}}(i[c])}(window,"ppms",["tm","cm"]);
})(window, document, 'dataLayer', 'aca03214-3036-4805-b5ec-a105d74a7520');`}
                    </Script>
                ) : (
                    <></>
                )}
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <header className='flex justify-between items-center border-b sm:border-b-[0.5px] h-16 lg:h-20 bg-white px-3 py-1 sm:py-[6px]'>
                    <Link
                        href='/'
                        className='h-full sm:h-full relative shrink-0'
                    >
                        <div className='h-full'>
                            <Image
                                src={newLogoSm}
                                alt='Logo de Décodage Fiscal - Simulateur de statuts juridiques pour indépendants'
                                className='hidden sm:block h-full w-auto'
                            />
                            <Image
                                src={newLogo}
                                alt='Logo de Décodage Fiscal - Simulateur de statuts juridiques pour indépendants'
                                className='block sm:hidden h-full w-auto'
                            />
                        </div>
                        <p className='hidden sm:block absolute left-[35%] top-[55%] lg:top-[58%] text-center text-base lg:text-xl font-rancho whitespace-nowrap text-orange-dark'>
                            Simulateur de statuts juridiques pour Freelance
                        </p>
                    </Link>

                    <nav className='hidden lg:flex justify-between w-2/6 max-w-[580px] min-w-[450px] text-xl font-semibold items-end pr-2'>
                        {hrefNavArr.map((page, i) => (
                            <p key={page.url}>
                                <Link
                                    className={joinString(
                                        condiStyle([
                                            i < 2,
                                            'gap-[10px]',
                                            'gap-[7px] mb-[-2px]'
                                        ]),
                                        'hover:text-sky-400 hover:fill-sky-400 flex  rounded-2xl items-end'
                                    )}
                                    href={page.url}
                                >
                                    <span>{page.icon}</span>
                                    <span
                                        className={joinString(
                                            'leading-[1.15rem] text-inherit',
                                            condiStyle([i === 2, 'mb-[2px]'])
                                        )}
                                    >
                                        {page.title}
                                    </span>
                                </Link>
                            </p>
                        ))}
                    </nav>
                    <NavigationBurgerMenu
                        navArr={hrefNavArr}
                        className='flex items-center lg:hidden relative'
                    />
                </header>
                <main className='bg-orange-dark grow flex items-stretch relative'>
                    {children}
                </main>
                <footer className='relative p-3 gap-1 sm:gap-2 bg-white h-fit lg:h-24 border-t sm:border-t-[0.5px] justify-evenly items-center flex w-full  text-sm sm:text-base flex-col lg:flex-row'>
                    <p>
                        <Link href='/a-propos'>
                            {dict('about_the_simulator')}
                        </Link>
                    </p>
                    <p>
                        <Link href='/contact'>{dict('contact_us')}</Link>
                    </p>
                    <p>
                        <Link href='/mentions-legales'>
                            {dict('legal_notice')}
                        </Link>
                    </p>
                    <p>
                        <Link href='/sitemap.xml'>{dict('sitemap')}</Link>
                    </p>
                    <LinkedinFooterElement />
                </footer>
            </body>
        </html>
    )
}

// LT :  Defined at top level of App directory, it applies to all routes. Allows modifying initial HTML returned from server. https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
