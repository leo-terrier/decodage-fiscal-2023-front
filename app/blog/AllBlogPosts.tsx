'use client'
import Link from 'next/link'
import { PostType } from './page'
import { useState } from 'react'
import IconButton from '../components/raw/IconButton'
import { LiaSearchSolid } from 'react-icons/lia'
import { dict } from '@/utils/utils'

type Type = {
    posts: PostType[]
}

const AllBlogPosts = ({ posts }: Type) => {
    const [search, setSearch] = useState('')
    const [result, setResult] = useState(posts)

    const handleNewSearch = () => {
        if (search.length > 0) {
            setResult(
                posts.filter((post) => {
                    const joinedArticle =
                        post.meta.articleTitle +
                        ' ' +
                        (post.meta.keywords as string[]).join(' ')
                    if (
                        search
                            .toLowerCase()
                            .split(' ')
                            .some((word) =>
                                joinedArticle.toLowerCase().includes(word)
                            )
                    ) {
                        return true
                    }
                    return false
                })
            )
        } else {
            setResult(posts)
        }
    }
    return (
        <>
            <form
                className='flex my-8 items-stretch w-1/2 max-w-[600px] min-w-[290px] sm:min-w-[320px] ml-auto mr-0 h-[2.15rem]'
                onSubmit={(e) => {
                    e.preventDefault()
                    handleNewSearch()
                }}
            >
                <input
                    type='text'
                    className='rounded-l-md rounded-r-none bg-orange-light/60 border-orange-dark border-[0.5px] px-2 placeholder-orange-dark/60 carret-gray-700 w-[90%] text-orange-dark'
                    placeholder={
                        'Ex : "Micro" "' +
                        dict('contributions').split(' ')[0] +
                        '"'
                    }
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
                <IconButton
                    type='button'
                    fill='fill-white'
                    aria-label={'Rechercher'}
                    className='bg-orange-dark flex justify-center items-center w-[10%] rounded-r-md border-[0.5px] border-orange-dark'
                    onClick={handleNewSearch}
                >
                    <LiaSearchSolid size='1.5rem' fill='inherit' />
                </IconButton>
            </form>
            <div className='flex flex-col gap-6'>
                {result.map(({ slug, meta }) => (
                    <div
                        key={slug}
                        className={
                            'border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col gap-2 sm:gap-3 p-6 blog-list-intro-div relative'
                        }
                    >
                        <Link href={`/blog/${slug}`}>
                            <h2 className=' text-inherit font-[700] sm:hover:text-sky-400 flex flex-col text-[1.3rem] sm:text-2xl'>
                                {meta.outsideTitle !== undefined
                                    ? meta.outsideTitle
                                    : meta.articleTitle}
                                <span className='text-opacity-60 text-sm italic font-light'>
                                    {meta.date}
                                </span>
                            </h2>
                        </Link>
                        {meta.subtitle}
                    </div>
                ))}
            </div>
        </>
    )
}

export default AllBlogPosts
