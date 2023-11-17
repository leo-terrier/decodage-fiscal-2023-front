'use client'
import { GoTriangleDown } from 'react-icons/go'
import { GoTriangleUp } from 'react-icons/go'

import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import Button from './Button'
import IconContainer from '@/app/components/raw/IconContainer'
import { condiStyle, joinString } from '@/utils/utils'

const Spinners = ({
    spinValue,
    value,
    maxValue,
    minValue = 0
}: {
    spinValue: (increment: boolean) => void
    value: number
    maxValue?: number
    stepper: number
    minValue?: number
}) => {
    const className =
        'hover:text-gray-700 disabled:opacity-50 text-gray-600 w-5'

    return (
        <div className='absolute right-0 top-0 flex h-full flex-col'>
            <Button
                aria-label={'incrémenter'}
                className={className}
                onClick={() => spinValue(true)}
                disabled={maxValue !== undefined && value === maxValue}
            >
                <IconContainer>
                    <GoTriangleUp />
                </IconContainer>
            </Button>
            <Button
                aria-label={'décrémenter'}
                className={className}
                onClick={() => spinValue(false)}
                disabled={value === minValue}
            >
                <IconContainer>
                    <GoTriangleDown />
                </IconContainer>
            </Button>
        </div>
    )
}
export type NumberInputType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    value: number
    handleChange: (value: number) => void
    isNonZero?: boolean
    className?: React.ComponentProps<'div'>['className']
    maxValue?: number
    minValue?: number
    width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    stepper?: number
}
const NumberInput = ({
    value,
    handleChange,
    isNonZero = false,
    minValue = 0,
    id,
    maxValue,
    width = 'xl',
    stepper = 100,
    ...props
}: NumberInputType) => {
    const onNumberInputChange = (value: number) => {
        if (maxValue && value > maxValue) {
            handleChange(maxValue)
        } else if (minValue && value < minValue) {
            handleChange(minValue)
        } else {
            handleChange(value)
        }
    }
    const spinValue = (isIncrement = true) => {
        const newValue = value + (isIncrement ? stepper : -stepper)
        handleChange(
            maxValue && newValue > maxValue
                ? maxValue
                : newValue < minValue
                ? minValue
                : newValue
        )
    }

    return (
        <div className='relative box-border'>
            <input
                className={joinString(
                    condiStyle([width === 'xs', 'text-center', 'text-right']),
                    'h-full p-1 pr-5',
                    width === 'xl'
                        ? 'w-28'
                        : width === 'lg'
                        ? 'w-24'
                        : width === 'md'
                        ? 'w-20'
                        : width === 'sm'
                        ? 'w-16'
                        : 'w-12'
                )}
                type='text'
                key={id}
                value={value ? value : isNonZero ? '' : value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const newValue = e.target.value.replace(/[^0-9]/g, '')

                    onNumberInputChange(parseInt(newValue || '0', 10))
                }}
                id={id}
                {...props}
            />
            <Spinners
                minValue={minValue}
                spinValue={spinValue}
                value={value}
                maxValue={maxValue}
                stepper={stepper}
            />
        </div>
    )
}
export default NumberInput
