import { condiStyle, dict, joinString } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import { TbArrowBigRight } from 'react-icons/tb'
//import logoImg from '../../public/logo-img.png'

type ImgType = {
    variant: 'banner' | 'center' | 'right' | 'left'
    alt: string
    src: 'string'
    className?: React.ComponentProps<'div'>['className']
    caption?: string
    my?: string
    unoptimized?: boolean
}
export const CustomImg = ({
    alt,
    src,
    className = 'w-[285px] sm:w-[450px] mx-auto',
    my = 'my-6 sm:my-8',
    caption = '',
    unoptimized = false
}: ImgType) => {
    return (
        <figure className={joinString(my, className)}>
            <div className={'w-full'}>
                <Image
                    src={src}
                    className={'w-full h-auto'}
                    alt={alt}
                    unoptimized={unoptimized}
                />
            </div>
            {caption.length > 0 && (
                <figcaption className='italic text-gray-500 text-justify mt-1'>
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}

type ChildrenType = {
    children: React.ReactNode
    className?: string
}

export const Underline = ({ children, className = '' }: ChildrenType) => (
    <span className={joinString(className, 'underline')}>{children}</span>
)

export const UnderlineP = ({ children, className = '' }: ChildrenType) => (
    <p className={joinString(className, 'underline bodytext')}>{children}</p>
)

type CallOutType = {
    className?: React.ComponentProps<'div'>['className']
    children: React.ReactNode
    bgColor?: string
}
export const Callout = ({
    children,
    className = '',
    bgColor = 'bg-gray-200'
}: CallOutType) => {
    return (
        <div
            className={joinString(
                'callout rounded-lg p-[1em] sm:p-[1.5em] w-[95%] sm:w-11/12 mx-auto my-6 sm:my-8',
                bgColor,
                className
            )}
        >
            {children}
        </div>
    )
}

export const CenteredInfoLink = ({ children }: ChildrenType) => (
    <div className={'flex justify-center'}>{children}</div>
)

type InnerLinkType = {
    children: React.ReactNode
    href?: string
    isBlank?: boolean
    CSSClassName?: string
    key?: string | number | undefined
}

export const InnerLink = ({
    children,
    href = '/simulateur-de-statuts-juridiques-pour-freelances',
    isBlank = true,
    CSSClassName = '',
    key = undefined
}: InnerLinkType) => (
    <Link
        className={CSSClassName || 'inner-text-link'}
        href={href}
        target={isBlank ? '_blank' : '_self'}
        key={key}
    >
        {children}
    </Link>
)

export const GoToSimulatorButton = ({
    content = dict('access_to_simulator'),
    my = 'my-10 sm:my-12',
    isBlank = true
}: {
    content?: string
    my?: string
    isBlank?: boolean
}) => {
    return (
        <form
            action='/simulateur-de-statuts-juridiques-pour-freelances'
            className={joinString(my, 'w-fit mx-auto')}
            target={isBlank ? '_blank' : '_self'}
        >
            <input
                type='submit'
                className='text-white sm:text-lg bg-sky-400 uppercase tracking-wider font-bold opacity-[97%] hover:opacity-100 border-2 rounded px-4 py-2 border-sky-400 hover:cursor-pointer'
                value={content}
            />
        </form>
    )
}
type CalculationLineType = ChildrenType & {
    isCentered?: boolean
}
export const CalculationLine = ({
    children,
    isCentered = true
}: CalculationLineType) => (
    <p
        className={joinString(
            condiStyle([isCentered, 'text-center']),
            'bg-slate-200 text-slate-700 italic text-[1rem] w-fit px-6 py-2 mx-auto my-[1em]'
        )}
    >
        {children}
    </p>
)

export const BlueP = ({ children }: ChildrenType) => (
    <p className='bodytext text-sky-800'>{children}</p>
)

export const OrangeH3 = ({ children }: ChildrenType) => (
    <h3 className='h4class'>{children}</h3>
)

export const SmallArrowLine = ({ children }: ChildrenType) => (
    <p className='bodytext fill-gray-300 stroke-gray-700 items-center sm:ml-[1em]'>
        <TbArrowBigRight
            className='inline mr-1'
            fill='inherit'
            stroke='inherit'
            size='1.5rem'
        />
        {children}
    </p>
)

export const PreFormSubmitButton = ({
    content = dict('access_to_results'),
    className = 'w-fit mx-auto',
    handleSubmit
}: {
    content?: string
    className?: string
    handleSubmit: () => void
}) => {
    return (
        <button
            type='button'
            className={joinString(
                className,
                'text-white bg-sky-400 uppercase tracking-wider font-bold opacity-[97%] hover:opacity-100 border-2 rounded px-4 py-2 border-sky-400 hover:cursor-pointer'
            )}
            onClick={handleSubmit}
        >
            {content}
        </button>
    )
}

type NumberTableLines = { label: string; value: string; style?: string }

type NumberTableType = {
    title: string
    headers: string[]
    data: NumberTableLines[]
}
export const NumberTable = ({ title, headers, data }: NumberTableType) => {
    const tdStyle =
        'px-2 py-1 border text-[0.8rem] sm:text-[0.9rem] whitespace-nowrap'
    const tdStyleRight = tdStyle + ' ' + 'text-right'
    return (
        <div className='w-full'>
            <p className='text-lg italic text-center mb-2 font-semibold'>
                {title}
            </p>
            <table className={'w-full'}>
                <thead className=''>
                    <tr className=''>
                        {headers.map((header) => (
                            <th
                                className={joinString(
                                    tdStyle,
                                    'font-bold text-base text-white bg-orange-dark'
                                )}
                                key={header}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className=''>
                    {data.map(({ label, value, style = '' }, idx) => {
                        const currentStyle = joinString(
                            style,
                            idx % 2 ? 'bg-orange-light' : ''
                        )
                        return (
                            <tr key={label} className=''>
                                <td
                                    className={joinString(
                                        tdStyle,
                                        currentStyle
                                    )}
                                >
                                    {label}
                                </td>
                                <td
                                    className={joinString(
                                        tdStyleRight,
                                        currentStyle
                                    )}
                                >
                                    {value}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
