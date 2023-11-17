import Image from 'next/image'
import ltImg from 'public/lt.png'
import { BsLinkedin } from 'react-icons/bs'
import IconContainer from '../components/raw/IconContainer'
import { dict, metadataBuilder } from '@/utils/utils'

export const generateMetadata = () =>
    metadataBuilder({
        relativeUrl: '/a-propos',
        title: dict('about_page_title'),
        robots: {
            index: false
        }
    })

export default function Page() {
    return (
        <div className={'articlePageContainerStyle'}>
            <h1>{dict('about_the_simulator')}</h1>
            <p className='bodytext'>{dict('about_p_1')}</p>
            <p className='bodytext'>
                {dict('about_p_4_arr', 0)}{' '}
                <span className='font-bold'>{dict('about_p_4_arr', 1)}</span>{' '}
                {dict('about_p_4_arr', 2)}{' '}
                <span className='font-bold'>{dict('about_p_4_arr', 3)}</span>.{' '}
                {dict('about_p_4_arr', 4)}{' '}
                <span className='font-bold'> {dict('about_p_4_arr', 5)}</span>
                {dict('about_p_4_arr', 6)}
            </p>
            <p className='bodytext italic'>
                <span className='font-bold'>{dict('about_p_5_arr', 0)}</span>{' '}
                <a
                    href='https://www.linkedin.com/company/d%C3%A9codage-fiscal'
                    target='_blank'
                >
                    {dict('about_p_5_arr', 1)}
                </a>{' '}
                {dict('about_p_5_arr', 2)}
            </p>
            <figure className='w-[150px] p-2 mt-10 ml-auto mr-[8%]'>
                <Image
                    src={ltImg}
                    className='w-full h-auto'
                    alt='Photo de Léo Terrier, créateur du site Décodage Fiscal'
                    unoptimized
                />
                <figcaption className='flex flex-col gap-1 text-gray-600 justify-center mt-2 text-sm items-center'>
                    <div className='flex gap-3 items-baseline text-inherit'>
                        <p className='text-inherit'>Léo Terrier</p>
                        <a
                            href='https://www.linkedin.com/in/l%C3%A9o-terrier/'
                            className='text-inherit'
                            target='_blank'
                        >
                            <IconContainer>
                                <BsLinkedin />
                            </IconContainer>
                        </a>
                    </div>
                    <p className='text-center italic text-inherit'>
                        {dict('creator_of_decodage')}
                    </p>
                </figcaption>
            </figure>
        </div>
    )
}
