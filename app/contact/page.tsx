import { dict, metadataBuilder } from '@/utils/utils'

export const generateMetadata = () =>
    metadataBuilder({
        relativeUrl: '/contact',
        title: dict('contact_page_title'),
        robots: {
            index: false
        }
    })

export default function Page() {
    return (
        <div className={'articlePageContainerStyle border-x'}>
            <h1>{dict('contact_us')}</h1>
            <p className='bodytext'>{dict('contact_us_p_arr', 0)}</p>
            <p className='font-bold bodytext'>
                {dict('contact_us_p_arr', 1)}
                {' : '}
                <a href='mailto:leo.terrier@decodage-fiscal.fr'>
                    leo.terrier@decodage-fiscal.fr
                </a>
                .
            </p>
        </div>
    )
}
