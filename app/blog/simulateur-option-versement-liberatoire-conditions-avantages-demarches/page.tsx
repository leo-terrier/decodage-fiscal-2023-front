import Article from '../posts/simulateur-option-versement-liberatoire-conditions-avantages-demarches.mdx'
import ArticlePageWrapper from '../ArticlePageWrapper'
import { metadataBuilder } from '@/utils/utils'

const {
    meta
} = require('app/blog/posts/simulateur-option-versement-liberatoire-conditions-avantages-demarches.mdx')

const { title, description, keywords } = meta

export const generateMetadata = () =>
    metadataBuilder({
        relativeUrl:
            '/blog/simulateur-option-versement-liberatoire-conditions-avantages-demarches',
        title,
        description,
        keywords
    })

const Page = () => {
    return (
        <ArticlePageWrapper
            url={
                'app/blog/posts/simulateur-option-versement-liberatoire-conditions-avantages-demarches.mdx'
            }
            meta={meta}
        >
            <Article />
        </ArticlePageWrapper>
    )
}
export default Page

// simulateur-option-versement-liberatoire-conditions-avantages-demarches
