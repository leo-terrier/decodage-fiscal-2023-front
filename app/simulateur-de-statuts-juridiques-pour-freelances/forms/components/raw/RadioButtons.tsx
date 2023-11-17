import { condiStyle, joinString } from '@/utils/utils'
import React from 'react'

type RadioButtonOption = { value: string; title: string }
type Type = {
    options: RadioButtonOption[]
    handleChange: (value: string) => void
    value: string
    gapX?: string
    gapY?: string
    my?: string
    justify?: string
    width?: string
}

const RadioButtons = ({
    options,
    handleChange,
    value,
    gapX = 'gap-x-6',
    gapY = 'gap-y-4',
    justify = 'justify-center',
    my = '',
    width = ''
}: Type) => {
    return (
        <div
            className={joinString(
                'flex flex-wrap',
                gapY,
                gapX,
                justify,
                width,
                my
            )}
        >
            {options.map((option) => (
                <React.Fragment key={option.value}>
                    <button
                        type='button'
                        key={option.value}
                        onClick={() => handleChange(option.value)}
                        className={
                            'flex-shrink-0 px-4 py-2 rounded cursor-pointer font-bold border-2' +
                            condiStyle([
                                option.value === value,
                                'bg-blueGray-light text-white border-blueGray-light',
                                'bg-white text-blueGray-dark  border-blueGray-dark'
                            ])
                        }
                    >
                        {option.title}
                    </button>
                    <input
                        id={option.value}
                        type='radio'
                        className='sr-only'
                        aria-label={option.title}
                        value={option.value}
                        checked={option.value === value}
                        onChange={(e) => {
                            handleChange(e.target.value)
                        }}
                    />
                </React.Fragment>
            ))}
        </div>
    )
}

export default RadioButtons
