import Article from '../posts/les-plafonds-de-la-micro-entreprise-pour-un-couple-dont-lmnp.mdx'
import ArticlePageWrapper from '../ArticlePageWrapper'
import { metadataBuilder } from '@/utils/utils'

const {
    meta
} = require('app/blog/posts/les-plafonds-de-la-micro-entreprise-pour-un-couple-dont-lmnp.mdx')

const { title, description, keywords } = meta

export const generateMetadata = () =>
    metadataBuilder({
        relativeUrl:
            '/blog/les-plafonds-de-la-micro-entreprise-pour-un-couple-dont-lmnp',
        title,
        description,
        keywords
    })

const Page = () => {
    return (
        <ArticlePageWrapper
            meta={meta}
            url={
                'app/blog/posts/les-plafonds-de-la-micro-entreprise-pour-un-couple-dont-lmnp.mdx'
            }
        >
            <Article />
        </ArticlePageWrapper>
    )
}
export default Page
