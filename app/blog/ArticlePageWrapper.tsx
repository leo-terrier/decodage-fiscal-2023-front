import { generateHeadingId } from './utils'
import matter from 'gray-matter'
import fs from 'fs'
import { dict, joinString } from '@/utils/utils'
import CustomSocialMediaButtons from './CustomSocialMediaButtons'
import { getPosts } from './page'
import ArticleList from '../components/topical-articles/ArticleList'
import adBannerSimple from '@/public/ad-banner-simple.png'
import Image from 'next/image'

import { GoToSimulatorButton } from './reusable-components'
type Heading = {
    text: string
    level: number
}

type HeadingsType = {
    headings: Heading[]
    display: string
    className?: string
    tocDepth?: number
}
function getHeadings(source: string) {
    // Get each line individually, and filter out anything that
    // isn't a heading.
    // eslint-disable-next-line no-useless-escape

    const regex = /^(#+)\s/
    const headingLines = source.split('\n').filter((line) => {
        return line.match(regex)
    })

    // Transform the string '## Some text' into an object
    // with the shape '{ text: 'Some text', level: 2 }'
    const response = headingLines.map((raw) => {
        const text = raw.replace(regex, '')
        const level = raw.split('').filter((elt) => elt === '#').length

        return { text, level }
    })
    return response
}

/* function getHeadings(source: string) {
    // Get each line individually, and filter out anything that
    // isn't a heading.
    const headingLines = source.split('\n').filter((line) => {
        return line.match(/^##\s/)
    })

    // Transform the string '## Some text' into an object
    // with the shape '{ text: 'Some text', level: 2 }'
    const response = headingLines.map((raw) => {
        const text = raw.replace(/^##\s/, '')
        // I only care about h2 and h3.
        // If I wanted more levels, I'd need to count the
        // number of #s.
        const level = raw.split('').filter((elt) => elt === '#').length

        return { text, level }
    })
    return response
} */

const TableOfContents = ({
    headings,
    display,
    className = '',
    tocDepth = 2
}: HeadingsType) => {
    return (
        <div
            className={joinString(
                display,
                className,
                'bg-slate-200 p-4 py-5 sm:p-6'
            )}
        >
            <p className='text-center font-semibold font-poppins leading-6 text-xl mb-4'>
                {dict('in_this_article')}
            </p>
            <ul>
                {headings
                    .filter((heading) => heading.level <= tocDepth)
                    .map(({ level, text }) => {
                        const levelStyle = `${
                            level === 3
                                ? 'font-light text-[0.85rem] ml-1'
                                : 'text-[1.1rem]'
                        }`
                        return (
                            <li
                                key={text}
                                className={joinString(
                                    levelStyle,
                                    'mt-2 first:mt-0 text-slate-800 leading-tight'
                                )}
                            >
                                <a
                                    key={text}
                                    href={`#${generateHeadingId(text)}`}
                                    className='inner-text-link'
                                >
                                    {text}
                                </a>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}

type Type = {
    children: React.ReactNode
    meta: Record<string, string | React.ReactNode>
    url: string
}

export default function ArticlePageWrapper({ children, url, meta }: Type) {
    const file = fs.readFileSync(url)
    const slug = (url.split('posts/').pop() as string).replace('.mdx', '')
    const { content } = matter(file)
    const headings = getHeadings(content)

    const { date, title, subtitle, articleTitle, socialFormsArr, tocDepth } =
        meta

    const posts = getPosts()
    return (
        <article className={'articlePageContainerStyle flex flex-col gap-6'}>
            <div className='flex flex-row-reverse gap-14'>
                <div className='hidden xl:flex min-w-[420px] 2xl:min-w-[500px] flex-col gap-5 2xl:gap-7 self-start'>
                    <div className='w-10/12 mx-auto'>
                        <Image
                            src={adBannerSimple}
                            alt='Bannière publicitaire Décodage Fiscal'
                        />
                    </div>
                    <GoToSimulatorButton my='' />
                    <TableOfContents
                        headings={headings}
                        display='block'
                        className='w-full mt-2'
                        tocDepth={(tocDepth || undefined) as number | undefined}
                    />
                </div>
                <div>
                    <h1 className='bodytext'>{articleTitle}</h1>
                    <div className='relative flex flex-col gap-2 mb-2 items-end'>
                        <CustomSocialMediaButtons
                            title={title as string}
                            url={'https://decodage-fiscal.fr/blog/' + slug}
                        />
                        <p className='text-sm '>
                            <span className='underline'>
                                {dict('publishing')}
                            </span>{' '}
                            : {date}
                        </p>
                    </div>

                    <TableOfContents
                        headings={headings}
                        display='xl:hidden'
                        className='w-full sm:w-11/12 max-w-[600px] mx-auto my-8'
                        tocDepth={(tocDepth || undefined) as number | undefined}
                    />
                    <div className='intro-div'>{subtitle}</div>
                    <div id='articleContainer'>{children}</div>
                </div>
            </div>
            <ArticleList
                posts={posts.filter((post) => post.slug !== slug)}
                className=''
                currentSocialForms={socialFormsArr as string[]}
            />
        </article>
    )
}
