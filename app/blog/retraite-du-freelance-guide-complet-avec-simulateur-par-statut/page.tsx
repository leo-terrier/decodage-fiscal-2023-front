import Article from '../posts/retraite-du-freelance-guide-complet-avec-simulateur-par-statut.mdx'
import ArticlePageWrapper from '../ArticlePageWrapper'
import { metadataBuilder } from '@/utils/utils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {
    meta
} = require('app/blog/posts/retraite-du-freelance-guide-complet-avec-simulateur-par-statut.mdx')

const { title, description, keywords } = meta

export const generateMetadata = () =>
    metadataBuilder({
        relativeUrl:
            '/blog/retraite-du-freelance-guide-complet-avec-simulateur-par-statut',
        title,
        description,
        keywords
    })

const Page = () => {
    return (
        <ArticlePageWrapper
            url={
                'app/blog/posts/retraite-du-freelance-guide-complet-avec-simulateur-par-statut.mdx'
            }
            meta={meta}
        >
            <Article />
        </ArticlePageWrapper>
    )
}
export default Page
