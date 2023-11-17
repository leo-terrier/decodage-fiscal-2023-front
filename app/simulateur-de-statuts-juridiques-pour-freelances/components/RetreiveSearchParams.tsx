'use client'
import { useEffect, useRef, useState } from 'react'
import { useSimulationContext } from '../SimulationContext'
import Button from '../forms/components/raw/Button'
import { dict } from '@/utils/utils'
import { SavedSimulation } from '../../../../common-types/general-types'

const RetreiveSearchParams = () => {
    const { isFirstRender, switchSimulation } = useSimulationContext()
    const [storedItem, setStoredItem] = useState<null | SavedSimulation>(null)
    const hasAlreadySuggestedRef = useRef(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const res = window.localStorage.getItem('savedSimulation')
            if (res !== null) {
                setStoredItem(JSON.parse(res))
            }
        }
    }, [])

    const handleSetQueryParams = () => {
        if (storedItem) {
            switchSimulation(storedItem as SavedSimulation)
            setStoredItem(null)
        }
    }

    if (!isFirstRender && storedItem && !hasAlreadySuggestedRef.current) {
        hasAlreadySuggestedRef.current = true
    }

    return isFirstRender && storedItem && !hasAlreadySuggestedRef.current ? (
        <Button
            className='text-lg font-poppins underline underline-offset-4 font-semibold text-white sm:text-sky-800 sm:hover:text-sky-900'
            onClick={handleSetQueryParams}
            opacity={''}
        >
            {dict('resume_my_simulation')}
        </Button>
    ) : (
        <></>
    )
}

export default RetreiveSearchParams
