/* import IconContainer from '@/app/components/raw/IconContainer'
import { condiStyle } from '@/utils/utils'
import { Disclosure, Transition } from '@headlessui/react'

//import { condiStyle } from '@/utils/general'
import React from 'react'
import { FaChevronRight } from 'react-icons/fa'

//import Button from './Button'
type Type = {
    children: React.ReactNode
    title: string
    disabled: boolean
    className?: React.ComponentProps<'div'>['className']
}
const Accordion = ({ title, children, disabled, className = '' }: Type) => {
    return (
        <Disclosure as={'div'} className={className}>
            {({ open }) => (
                <>
                    <Disclosure.Button
                        className={
                            'self-center font-bold disabled:opacity-20  underline-offset-4'
                        }
                        disabled={disabled}
                    >

                        <IconContainer
                            className={
                                'gap-4 text-2xl tracking-widest group  hover:text-orange-dark'
                            }
                            justify={''}
                        >
                            <FaChevronRight
                                size={'.8em'}
                                className={
                                    `group-hover:fill-orange-dark transition-transform transform origin-center duration-300` +
                                    condiStyle([open, 'rotate-90', 'rotate-0'])
                                }
                            />
                            {title}
                        </IconContainer>
                    </Disclosure.Button>
                    <Transition
                        show={open}
                        enter='transition-opacity duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition duration-600'
                        leaveFrom='opacity-100 scale-0'
                        leaveTo='opacity-0'
                    >
                        <Disclosure.Panel
                            className={
                                'mt-3 items-start gap-2 flex flex-col px-2 py-3  '
                            }
                        >
                            {children}
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}

export default Accordion
 */
