'use client'

import { individualizeFieldName } from '@/utils/utils'
import { getIsFreelance } from './utils'
import { SARLBreakEvenMarginPointPlus10 } from '@/legal-data'
import {
    SimulationParams,
    SocialFormTypeD2
} from '../../../../common-types/general-types'

// forbids compensation when margin < breakeven point

// TODO : refactor to take margin input
export const CorpSARLIsLowMargin = (
    queryParams: SimulationParams,
    isD2: boolean
) => {
    // always check is socialForm is SARL
    const revenue = queryParams[isD2 ? 'revenueD2' : 'revenue']
    const expenses = queryParams[isD2 ? 'expensesD2' : 'expenses']
    return revenue - expenses < SARLBreakEvenMarginPointPlus10
}

const getNbOfFields = (queryParams: SimulationParams, isD2: boolean) => {
    const socialForm = queryParams[individualizeFieldName('socialForm', isD2)]
    const isCorporateTax =
        queryParams[individualizeFieldName('isCorporateTax', isD2)]

    switch (socialForm) {
        case 'ME':
            return 6
        case 'SAS':
            return 5
        case 'SARL':
            return !isCorporateTax
                ? 5
                : CorpSARLIsLowMargin(queryParams, isD2)
                ? 7
                : 8
        case 'EI':
            return 4
        case 'employee':
            return 2
        default:
            return 0
    }
}

// either revenue | revenue + compensation | compensation
export const getRequiredFields = (
    queryParams: SimulationParams,
    isD2: boolean
) => {
    const socialForm = queryParams[individualizeFieldName('socialForm', isD2)]
    const isCorporateTax =
        queryParams[individualizeFieldName('isCorporateTax', isD2)]

    const requiredFields: (keyof SimulationParams)[] = []
    if (getIsFreelance(socialForm as SocialFormTypeD2)) {
        requiredFields.push(individualizeFieldName('revenue', isD2))
    }
    if (
        socialForm === 'employee' ||
        (socialForm === 'SARL' &&
            isCorporateTax &&
            !CorpSARLIsLowMargin(queryParams, isD2))
    ) {
        requiredFields.push(individualizeFieldName('compensation', isD2))
    }
    return requiredFields
}

export const calculateCompletionRate = (
    queryParams: SimulationParams,
    isNumberValidationError: boolean
) => {
    const fixedFields = 3
    let nbOfFields = getNbOfFields(queryParams, false) + fixedFields
    const requiredFields = getRequiredFields(queryParams, false)
    if (queryParams.isMarried) {
        nbOfFields += getNbOfFields(queryParams, true)
        requiredFields.push(...getRequiredFields(queryParams, true))
    }
    const nbOfemptyRequiredFields = requiredFields.reduce((acc, field) => {
        const key = field as keyof typeof queryParams
        return acc + ((queryParams[key] as number) === 0 ? 1 : 0)
    }, 0)

    return Math.round(
        ((nbOfFields -
            nbOfemptyRequiredFields -
            Number(isNumberValidationError)) /
            nbOfFields) *
            100
    )
}
