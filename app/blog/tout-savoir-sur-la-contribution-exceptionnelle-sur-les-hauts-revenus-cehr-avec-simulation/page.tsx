import Article from '../posts/tout-savoir-sur-la-contribution-exceptionnelle-sur-les-hauts-revenus-cehr-avec-simulation.mdx'
import ArticlePageWrapper from '../ArticlePageWrapper'
import { metadataBuilder } from '@/utils/utils'

const {
    meta
} = require('app/blog/posts/tout-savoir-sur-la-contribution-exceptionnelle-sur-les-hauts-revenus-cehr-avec-simulation.mdx')

const { title, description, keywords } = meta

export const generateMetadata = () =>
    metadataBuilder({
        relativeUrl:
            '/blog/tout-savoir-sur-la-contribution-exceptionnelle-sur-les-hauts-revenus-cehr-avec-simulation',
        title,
        description,
        keywords
    })

const Page = () => {
    return (
        <ArticlePageWrapper
            url={
                'app/blog/posts/tout-savoir-sur-la-contribution-exceptionnelle-sur-les-hauts-revenus-cehr-avec-simulation.mdx'
            }
            meta={meta}
        >
            <Article />
        </ArticlePageWrapper>
    )
}
export default Page
