'use client'
import { dict } from '@/utils/utils'
import Button from '../forms/components/raw/Button'
import { PiArrowFatLinesDownFill } from 'react-icons/pi'
import { useEffect, useState } from 'react'

const MobileGoToSimulatorButton = () => {
    const [element, setElement] = useState<HTMLElement | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setElement(document.getElementById('formSection') as HTMLElement)
        }
    }, [])

    return element !== null ? (
        <Button
            onClick={() => {
                ;(element as HTMLElement).scrollIntoView({
                    behavior: 'smooth'
                })
            }}
            opacity=''
            className='fixed sm:hidden bottom-5 z-40 bg-orange-dark px-4 py-2 rounded-2xl text-white font-extrabold font-poppins flex gap-2 items-center fill-white right-1/2 translate-x-1/2 border-4 border-orange-dark shadow-lg'
            id={'mobileGoToSimulatorButton'}
        >
            <PiArrowFatLinesDownFill fill='inherit' size='2.5rem' />
            <span className='flex flex-col items-center text-inherit'>
                <span className='text-2xl text-inherit font-extrabold leading-tight uppercase'>
                    {dict('access_to_simulator_arr', 0)}
                </span>
                <span className='text-lg text-inherit tracking-normal lowercase leading-tight whitespace-nowrap'>
                    {dict('access_to_simulator_arr', 1)}
                </span>
            </span>
        </Button>
    ) : (
        <></>
    )
}
export default MobileGoToSimulatorButton
