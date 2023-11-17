'use client'
import { useSimulationContext } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import { condiStyle, dict, joinString } from '@/utils/utils'

type Type = {
    className?: React.ComponentProps<'div'>['className']
}
const Progress = ({ className = '' }: Type) => {
    const { isLoading, formCompletionRate, isNumberValidationError } =
        useSimulationContext()

    const width = formCompletionRate.toString() + '%'

    return (
        <div
            className={joinString(
                className,
                'sm:min-h-[90px] sm:justify-end hideElement'
            )}
            id='progress'
        >
            <div className={'w-full items-center flex justify-between'}>
                {!isLoading ? (
                    <>
                        <span
                            className={joinString(
                                'tracking-wider font-extrabold sm:font-semibold font-poppins leading-tight',
                                condiStyle([
                                    isNumberValidationError,
                                    'text-red-danger w-full text-center',
                                    'text-black sm:text-blueGray-dark'
                                ])
                            )}
                        >
                            {dict(isNumberValidationError ? 'error' : 'form')}
                        </span>
                        <span
                            className={joinString(
                                'text-[1.05rem] leading-tight',
                                condiStyle(
                                    [isNumberValidationError, 'hidden'],
                                    [
                                        width === '100%',
                                        'text-sky-400 font-bold',
                                        'text-gray-700'
                                    ]
                                )
                            )}
                        >
                            {width}
                        </span>
                    </>
                ) : (
                    <span
                        className={
                            'w-full text-center font-bold sm:font-semibold tracking-widest opacity-50'
                        }
                    >
                        {dict('loading')}
                    </span>
                )}
            </div>

            <div
                className={
                    'relative overflow-hidden bg-gray-300 rounded-full h-2.5 w-40 mt-[5px] sm:mt-[6px]'
                }
            >
                {!isLoading ? (
                    <div
                        className={joinString(
                            'h-full rounded-full',
                            isNumberValidationError
                                ? 'bg-gray-600'
                                : condiStyle([
                                      width === '100%',
                                      'bg-gradient-to-r from-sky-400 to-sky-300',
                                      'bg-yellow-sunglow sm:bg-orange-dark'
                                  ])
                        )}
                        style={{ width }}
                    />
                ) : (
                    <div className='bg-sky-300 w-12 loader h-full' />
                )}
            </div>
        </div>
    )
}

export default Progress
