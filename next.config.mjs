import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: false }

const withMDX = createMDX({
    options: {
        options: {
            providerImportSource: '@mdx-js/react'
        },
        extension: /\.mdx?$/,
        remarkPlugins: [],
        rehypePlugins: []
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
    }
})
export default withMDX(nextConfig)
