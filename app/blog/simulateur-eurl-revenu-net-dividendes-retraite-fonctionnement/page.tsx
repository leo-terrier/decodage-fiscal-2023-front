import Article from '../posts/simulateur-eurl-revenu-net-dividendes-retraite-fonctionnement.mdx'
import ArticlePageWrapper from '../ArticlePageWrapper'
import { metadataBuilder } from '@/utils/utils'

const {
    meta
} = require('app/blog/posts/simulateur-eurl-revenu-net-dividendes-retraite-fonctionnement.mdx')

const { title, description, keywords } = meta

export const generateMetadata = () =>
    metadataBuilder({
        relativeUrl:
            '/blog/simulateur-eurl-revenu-net-dividendes-retraite-fonctionnement',
        title,
        description,
        keywords
    })

const Page = () => {
    return (
        <ArticlePageWrapper
            meta={meta}
            url={
                'app/blog/posts/simulateur-eurl-revenu-net-dividendes-retraite-fonctionnement.mdx'
            }
        >
            <Article />
        </ArticlePageWrapper>
    )
}
export default Page
