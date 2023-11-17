'use client'
import Link from 'next/link'
import { PostType } from '../../blog/page'
import { dict, joinString } from '@/utils/utils'

type Type = {
    posts: PostType[]
    className?: string
    currentSocialForms: string[]
}
const ArticleList = ({ currentSocialForms, className = '', posts }: Type) => {
    // shows only articles which do not only includes social form which are inapplicable to the matter
    const displayPosts = posts.filter((post) =>
        !post.meta.socialFormsArr.length
            ? true
            : post.meta.socialFormsArr.some((socialForm) =>
                  currentSocialForms.includes(socialForm)
              )
    )
    displayPosts.sort((a, b) => b.meta.topicalRanking - a.meta.topicalRanking)

    return (
        <section
            className={joinString(
                className,
                'relative w-full lg:w-10/12 xl:9/12 mx-auto mt-4 sm:mt-6 md:mt-8 xl:mt-10 2xl:mt-12 3xl:mt-14 p-6 bg-orange-light border-[0.5px] rounded-sm border-orange-md/70'
            )}
        >
            <h2 className='font-poppins text-orange-dark text-xl mb-6 border-b-2 border-orange-dark'>
                {dict('on_this_theme_article')}
            </h2>
            <ul className='flex flex-col ml-8 list-disc disc-inside'>
                {displayPosts
                    .filter((_, i) => i < 5)
                    .map(({ slug, meta }) => (
                        <li key={slug} className='mb-[0.5em]'>
                            <Link
                                href={`/blog/${slug}`}
                                className={'w-full group hover:sm:underline'}
                                target={'_blank'}
                            >
                                {meta.outsideTitle !== undefined
                                    ? meta.outsideTitle
                                    : meta.articleTitle}
                            </Link>
                        </li>
                    ))}
            </ul>
        </section>
    )
}

export default ArticleList
