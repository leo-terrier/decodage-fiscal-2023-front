import axios, { AxiosRequestConfig } from 'axios'
import {
    SavedSimulation,
    SimulationParams
} from '../common-types/general-types'
const isDev = process.env.NEXT_PUBLIC_IS_DEV === 'true'
const apiUrl = !isDev
    ? process.env.NEXT_PUBLIC_API
    : process.env.NEXT_PUBLIC_LOCAL_API_PARIS

axios.defaults.baseURL = apiUrl

const headers = {
    'Content-Type': 'application/json',
    Authorization: process.env.NEXT_PUBLIC_TOKEN
}
export const fetchSimulationResult = async (
    stringPayload: string,
    abortController: AbortController,
    config: AxiosRequestConfig = {},
    isCache = false
) => {
    const cachedResponse = isCache ? cache[stringPayload] : null
    if (cachedResponse) {
        return cachedResponse
    } else {
        try {
            const response = await axios({
                ...config,
                headers,
                method: 'POST',
                url: '/',
                data: stringPayload,
                signal: abortController.signal
            })
            const result = response.data
            cache[stringPayload] = result
            //console.log('Response:', result)
            return result
        } catch (error) {
            if (axios.isCancel(error)) {
                //eslint-disable-next-line no-console
                console.log('Request canceled:', error.message)
                //reject(error)
                return 'abort'
            } else {
                //eslint-disable-next-line no-console
                console.error('Error:', error)
                throw new Error('fetching error')
            }
        }
    }
}
export const fetchFromComparator = async (
    stringPayload: string,
    config: AxiosRequestConfig = {},
    isCache = false
) => {
    const cachedResponse = isCache ? cache[stringPayload] : null
    if (cachedResponse) {
        return cachedResponse
    } else {
        try {
            const response = await axios({
                ...config,
                headers,
                method: 'POST',
                url: '/',
                data: stringPayload
            })
            const result = response.data
            cache[stringPayload] = result
            //console.log('Response:', result)
            return result
        } catch (error) {
            //eslint-disable-next-line no-console
            console.error('Error in fetch general info:', error)
            throw new Error('fetching error')
        }
    }
}

export const cache: Record<string, unknown> = {}

const orderParams = (params: Record<string, unknown>) => {
    const orderedKeys = Object.keys(params).sort() as (keyof SimulationParams)[]
    // TODO: fix TS
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderedParams = {} as any
    orderedKeys.forEach((key) => {
        let value = params[key as keyof typeof params]
        if (Array.isArray(value)) {
            value = value.map(orderParams)
        } else if (typeof value === 'object') {
            value = orderParams(value as Record<string, unknown>)
        }
        orderedParams[key] = value
    })
    return orderedParams
}

export const stringifyParams = (params: SimulationParams) => {
    return JSON.stringify(orderParams(params))
}

const stringifySavedSimulationParams = ({
    params,
    forCompare = []
}: SavedSimulation) => {
    const newParams = orderParams(params)
    const newForCompare = forCompare.map((forCompareParams) => ({
        id: forCompareParams.id,
        params: orderParams(forCompareParams.params)
    }))
    return JSON.stringify({ params: newParams, forCompare: newForCompare })
}

export const retreiveSavedParams = async (id: string) => {
    const response = await axios(apiUrl + '/saved-params/' + id)
    const data = response.data as SavedSimulation
    return data
}

export const saveParams = async (savedSimulation: SavedSimulation) => {
    const res = await axios({
        headers,
        method: 'POST',
        url: apiUrl + '/saved-params',
        data: stringifySavedSimulationParams(savedSimulation)
    })
    return res.data
}

type GetMaxCompType = {
    grossMargin: number
}
export const getMaxComp = async (params: GetMaxCompType) => {
    const res = await axios.get(apiUrl + '/sarl-max-compensation', {
        headers,
        params
    })
    return res.data
}
