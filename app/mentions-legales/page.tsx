import { dict, metadataBuilder } from '@/utils/utils'

export const generateMetadata = () =>
    metadataBuilder({
        relativeUrl: '/mentions-legales',
        title: dict('legal_notice_page_title'),
        robots: {
            index: false
        }
    })

export default function Page() {
    return (
        <div className={'articlePageContainerStyle relative border-x'}>
            <h1>{dict('legal_notice')}</h1>
            <p className=''>{dict('legal_notice_p1')}</p>
            <h2 className='mb-3 mt-4 text-base font-bold underline'>
                {dict('personal_data_processing')}
            </h2>
            <p className='mb-2'>{dict('legal_notice_p2')}</p>
            <p className='mb-2'>{dict('legal_notice_p3')}</p>
            <h2 className='mt-4 mb-3 text-base'>
                <span className='font-bold underline'>Credits</span>
            </h2>
            <ul className='list-disc list-inside text-sm'>
                <li className='text-sm'>
                    logo : icons by{' '}
                    <a
                        className='normal-color-link'
                        href='https://icones8.fr/'
                        target='_blank'
                        rel='nofollow'
                    >
                        Icon8
                    </a>
                    , thunder icon created by Pojok d -{' '}
                    <a
                        className='normal-color-link'
                        href='https://www.flaticon.com/free-icons/thunder'
                        title='thunder icons'
                        target='_blank'
                        rel='nofollow'
                    >
                        flaticon
                    </a>
                </li>
                <li className='text-sm'>
                    homepage : icons by{' '}
                    <a
                        className='normal-color-link'
                        href='https://icones8.fr/'
                        target='_blank'
                        rel='nofollow'
                    >
                        Icon8
                    </a>
                </li>
            </ul>
            {/*   <h2 className='font-bold'>Icon credits</h2>
                <div className='flex gap-1'>
                    <span>LOGO</span>
                    <span>

                    </span>
                    <span>

                    </span>
                </div>
                <div className='gap-1 flex'>
                    <span>HOMEPAGE</span>
                    <span>
                        Icons by{' '}
                        <a href='https://icones8.fr/' target='_blank'>
                            Icon8
                        </a>
                    </span>
                </div>
            </div> */}
        </div>
    )
}
