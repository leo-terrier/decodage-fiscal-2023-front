import Article from '../posts/tout-comprendre-a-l-acre-test-d-eligibilite-simulation-conditions-demarches.mdx'
import ArticlePageWrapper from '../ArticlePageWrapper'
import { metadataBuilder } from '@/utils/utils'

const {
    meta
} = require('app/blog/posts/tout-comprendre-a-l-acre-test-d-eligibilite-simulation-conditions-demarches.mdx')

const { title, description, keywords } = meta

export const generateMetadata = () =>
    metadataBuilder({
        relativeUrl:
            '/blog/tout-comprendre-a-l-acre-test-d-eligibilite-simulation-conditions-demarches',
        title,
        description,
        keywords
    })

const Page = () => {
    return (
        <ArticlePageWrapper
            meta={meta}
            url={
                'app/blog/posts/tout-comprendre-a-l-acre-test-d-eligibilite-simulation-conditions-demarches.mdx'
            }
        >
            <Article />
        </ArticlePageWrapper>
    )
}
export default Page
