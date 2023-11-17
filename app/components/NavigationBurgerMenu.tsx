'use client'
import { useEffect, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import IconButton from './raw/IconButton'
import Link from 'next/link'

type Type = {
    navArr: NavElt[]
    className?: React.ComponentProps<'div'>['className']
}
type NavElt = {
    icon: React.ReactNode
    url: string
    title: string
}
const NavigationBurgerMenu = ({ className = '', navArr }: Type) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // TODO : review why this is executed on large screens
        const handleClose = () => {
            setIsOpen(false)
        }
        if (isOpen) {
            document.addEventListener('click', handleClose)
        }
        return () => {
            document.removeEventListener('click', handleClose)
        }
    }, [isOpen])

    //check
    return (
        <div className={className}>
            <IconButton
                onClick={() => setIsOpen(!isOpen)}
                isMobile
                aria-label='Ouvrir le menu de navigation'
            >
                <HiMenu size='2rem' />
            </IconButton>
            {isOpen && (
                <div className='bg-slate-100 shadow-lg absolute top-0 right-[2.5rem] tracking-wide text-center flex flex-col border-gray-400/20 border rounded-sm z-10'>
                    {navArr.map((page) => (
                        <>
                            <p
                                key={page.url}
                                className='px-4 py-3 border-b border-gray-400/20 last:border-b-transparent text-center'
                            >
                                <Link className='font-poppins' href={page.url}>
                                    {page.title}
                                </Link>
                            </p>
                        </>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NavigationBurgerMenu
