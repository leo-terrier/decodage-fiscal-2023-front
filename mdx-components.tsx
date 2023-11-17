import type { MDXComponents } from 'mdx/types'
import { generateHeadingId } from './app/blog/utils'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
        h2: ({ children }) => (
            <h2 id={generateHeadingId(children as string)} className='bodytext'>
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 id={generateHeadingId(children as string)} className='bodytext'>
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 id={generateHeadingId(children as string)} className='bodytext'>
                {children}
            </h4>
        ),
        h5: ({ children }) => (
            <h5 id={generateHeadingId(children as string)} className='bodytext'>
                {children}
            </h5>
        ),
        ul: ({ children }) => <ul className='bodytext'>{children}</ul>,
        ol: ({ children }) => <ol className='bodytext'>{children}</ol>,
        p: ({ children }) => <p className='bodytext'>{children}</p>,
        li: ({ children }) => <li className='bodytext'>{children}</li>,
        a: ({ children, href }) => (
            <a href={href} className='bodytext' target={'_blank'}>
                {children}
            </a>
        ),
        figcaption: ({ children }) => (
            <figcaption className='bodytext'>{children}</figcaption>
        ),
        ...components
    }
}
