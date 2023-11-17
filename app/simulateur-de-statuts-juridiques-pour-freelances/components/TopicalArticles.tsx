'use client'
import { PostType } from '../../blog/page'
import { useSimulationContext } from '../SimulationContext'
import ArticleList from '@/app/components/topical-articles/ArticleList'

type Type = {
    posts: PostType[]
    className: string
    isSimulationSlider?: boolean
}

const TopicalArticles = (props: Type) => {
    const { queryParams } = useSimulationContext()
    const currentSocialForms = [queryParams.socialForm] as string[]
    if (queryParams.isMarried) {
        currentSocialForms.push(queryParams.socialFormD2)
    }

    return <ArticleList {...props} currentSocialForms={currentSocialForms} />
}

export default TopicalArticles
