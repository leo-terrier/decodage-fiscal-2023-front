'use client'

import { Switch } from '@headlessui/react'

type Type = {
    id: string
    isChecked: boolean
    handleChange: () => void
    width?: 'sm' | 'lg'
    divBg?: string
    switchBg?: string
    isDouble?: boolean
    ariaLabel: string
}
const ToggleButton = ({
    id,
    handleChange,
    isChecked,
    ariaLabel,
    width = 'lg',
    divBg = isChecked ? 'bg-blueGray-light' : 'bg-gray-800/30',
    switchBg = 'bg-white/100'
}: Type) => {
    const classNames = {
        div:
            width === 'lg'
                ? `${divBg}
    relative inline-flex h-[30px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`
                : `${divBg}
    relative inline-flex h-[18px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`,
        switch:
            width === 'lg'
                ? `${isChecked ? `translate-x-[30px]` : ''}
        ${switchBg} pointer-events-none  inline-block h-[26px] w-[26px] transform rounded-full bg-white/100 shadow-lg ring-0 transition-transform duration-200 ease-in-out`
                : `${isChecked ? `translate-x-[18px]` : ''}
        ${switchBg} pointer-events-none  inline-block h-[14px] w-[14px] transform rounded-full shadow-lg ring-0 transition-transform duration-200 ease-in-out`
    }

    return (
        <Switch
            checked={isChecked}
            id={id}
            onChange={handleChange}
            className={classNames.div}
        >
            <span className='sr-only'>{ariaLabel}</span>
            <span aria-hidden='true' className={classNames.switch} />
        </Switch>
    )
}
export default ToggleButton
