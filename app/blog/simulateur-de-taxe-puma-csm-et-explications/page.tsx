import Article from '../posts/simulateur-de-taxe-puma-csm-et-explications.mdx'
import ArticlePageWrapper from '../ArticlePageWrapper'
import { metadataBuilder } from '@/utils/utils'

const {
    meta
} = require('app/blog/posts/simulateur-de-taxe-puma-csm-et-explications.mdx')

const { title, description, keywords } = meta

export const generateMetadata = () =>
    metadataBuilder({
        relativeUrl: '/blog/simulateur-de-taxe-puma-csm-et-explications',
        title,
        description,
        keywords
    })

const Page = () => {
    return (
        <ArticlePageWrapper
            url={
                'app/blog/posts/simulateur-de-taxe-puma-csm-et-explications.mdx'
            }
            meta={meta}
        >
            <Article />
        </ArticlePageWrapper>
    )
}
export default Page
