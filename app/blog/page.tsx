import fs from 'fs'
import AllBlogPosts from './AllBlogPosts'
import { dict, metadataBuilder } from '@/utils/utils'
import { parse } from 'date-fns'

export type PostType = {
    slug: string
    meta: MetaType
}

export const generateMetadata = () =>
    metadataBuilder({
        relativeUrl: '/blog',
        title: dict('blog_page_title')
    })

export function getPosts(isSorting = false) {
    const files = fs.readdirSync('app/blog/posts')
    const posts = files.map((fileName) => {
        const slug = fileName.replace('.mdx', '')
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { meta } = require('app/blog/posts/' + fileName)

        return {
            slug,
            meta
        }
    })
    if (isSorting) {
        posts.sort(
            (a, b) =>
                parse(b.meta.date, 'dd/MM/yyyy', new Date()).getTime() -
                parse(a.meta.date, 'dd/MM/yyyy', new Date()).getTime()
        )
    }
    return posts
}

export type MetaType = {
    title: string
    articleTitle: string
    outsideTitle?: string
    subtitle: React.ReactNode
    date: string
    description: string
    keywords: string[]
    socialFormsArr: string[]
    topicalRanking: number
}
function Page() {
    const posts = getPosts(true)
    return (
        <div className={'articlePageContainerStyle border-x-2'}>
            <h1 className='text-3xl sm:text-4xl'>{dict('last_articles')}</h1>
            <p className='opacity-70'>{dict('blog_intro_p')}</p>
            <AllBlogPosts posts={posts} />
        </div>
    )
}
export default Page
