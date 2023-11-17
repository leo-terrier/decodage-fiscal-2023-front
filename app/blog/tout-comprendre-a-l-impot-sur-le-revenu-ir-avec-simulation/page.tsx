import Article from '../posts/tout-comprendre-a-l-impot-sur-le-revenu-ir-avec-simulation.mdx'
import ArticlePageWrapper from '../ArticlePageWrapper'
import { metadataBuilder } from '@/utils/utils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {
    meta
} = require('app/blog/posts/tout-comprendre-a-l-impot-sur-le-revenu-ir-avec-simulation.mdx')

const { title, description, keywords } = meta

export const generateMetadata = () =>
    metadataBuilder({
        relativeUrl:
            '/blog/tout-comprendre-a-l-impot-sur-le-revenu-ir-avec-simulation',
        title,
        description,
        keywords
    })

const Page = () => {
    return (
        <ArticlePageWrapper
            url={
                'app/blog/posts/tout-comprendre-a-l-impot-sur-le-revenu-ir-avec-simulation.mdx'
            }
            meta={meta}
        >
            <Article />
        </ArticlePageWrapper>
    )
}
export default Page
