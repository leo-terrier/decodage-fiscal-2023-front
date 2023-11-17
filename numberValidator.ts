import { ErrorObject } from './app/simulateur-de-statuts-juridiques-pour-freelances/types'

import {
    dict,
    formatCurrency,
    individualizeFieldName,
    joinString
} from './utils/utils'
import { getMEWarning } from './GetMEThresholdsWarnings'
import { getIsFreelance } from './app/simulateur-de-statuts-juridiques-pour-freelances/utils/utils'
import { SimulationParams } from '../common-types/general-types'

export const defaultValidationObj: ErrorObject = {
    revenue: {
        error: '',
        warning: ''
    },
    expenses: {
        error: '',
        warning: ''
    },
    compensation: {
        error: '',
        warning: ''
    },
    shareCapital: {
        error: '',
        warning: ''
    },
    revenueD2: {
        error: '',
        warning: ''
    },
    expensesD2: {
        error: '',
        warning: ''
    },
    compensationD2: {
        error: '',
        warning: ''
    },
    shareCapitalD2: {
        error: '',
        warning: ''
    },
    globalTaxableIncomeDeduction: {
        error: '',
        warning: ''
    }
}

export type NumberValidatorResponse = {
    validationObj: ErrorObject
    isError: boolean
}
const defaultErrorObj: NumberValidatorResponse = {
    validationObj: defaultValidationObj,
    isError: false
}

let params = null as unknown as SimulationParams

export const maxAmountNumberFields = {
    revenue: 1_000_000,
    expenses: 1_000_000,
    compensation: 1_000_000,
    revenueD2: 1_000_000,
    expensesD2: 1_000_000,
    compensationD2: 1_000_000,
    globalTaxableIncomeDeduction: 1_000_000,
    shareCapital: 1_000_000,
    shareCapitalD2: 1_000_000
}
const individualNumberFields = [
    'revenue',
    'expenses',
    'compensation',
    'shareCapital'
]

export const numberValidator = (formParams: SimulationParams) => {
    params = formParams
    const response: NumberValidatorResponse = JSON.parse(
        JSON.stringify(defaultErrorObj)
    )
    raiseIndividualWarning(response, false)
    if (params.isMarried) {
        raiseIndividualWarning(response, true)
    }
    validateIndividualValues(response, false)
    if (response.isError) return response
    if (params.isMarried) {
        validateIndividualValues(response, true)
        if (response.isError) return response
    }
    if (
        params.globalTaxableIncomeDeduction >
        maxAmountNumberFields.globalTaxableIncomeDeduction
    ) {
        response.validationObj.globalTaxableIncomeDeduction = {
            error: pleaseSmaller(
                maxAmountNumberFields.globalTaxableIncomeDeduction
            ),
            warning: ''
        }
        response.isError = true
        return response
    }
    return response
}

const raiseIndividualWarning = (
    response: NumberValidatorResponse,
    isD2: boolean
) => {
    if (params[individualizeFieldName('socialForm', isD2)] === 'ME') {
        response.validationObj[
            individualizeFieldName('revenue', isD2)
        ].warning = getMEWarning(params, isD2)
    }
}

const validateIndividualValues = (
    response: NumberValidatorResponse,
    isD2: boolean
) => {
    for (const field of individualNumberFields) {
        const fieldName = (field + (isD2 ? 'D2' : '')) as keyof SimulationParams
        const value = params[fieldName as keyof typeof params] as number
        const maxValue = maxAmountNumberFields[
            fieldName as keyof typeof maxAmountNumberFields
        ] as number

        // check that number input are not greater than an given number (20M)
        if (value > maxValue) {
            response.validationObj[fieldName].error = pleaseSmaller(
                maxValue,
                fieldName.includes('share') ? false : true
            )
            response.isError = true
            break
        }

        const socialForm = params[isD2 ? 'socialFormD2' : 'socialForm']

        const isFreelance = getIsFreelance(socialForm)

        // check if freelancers' expenses is  greater than revenue
        const revenue = params[isD2 ? 'revenueD2' : 'revenue']
        if (
            isFreelance &&
            fieldName === (isD2 ? 'expensesD2' : 'expenses') &&
            revenue > 0 &&
            value > revenue
        ) {
            response.validationObj[isD2 ? 'expensesD2' : 'expenses'].error =
                pleaseSmaller(params[isD2 ? 'revenueD2' : 'revenue'])
            response.isError = true
            break
        }

        // check if company compensation is greater than revenue - expenses
        if (
            (socialForm === 'SAS' ||
                (socialForm === 'SARL' &&
                    params[isD2 ? 'isCorporateTaxD2' : 'isCorporateTax'])) &&
            fieldName === (isD2 ? 'compensationD2' : 'compensation') &&
            value >
                Math.max(
                    0,
                    params[isD2 ? 'revenueD2' : 'revenue'] -
                        params[isD2 ? 'expensesD2' : 'expenses']
                ) // math.max to prevent comparing compensation to negative value when revenue = 0
        ) {
            response.validationObj[
                isD2 ? 'compensationD2' : 'compensation'
            ].error = pleaseSmaller(
                params[isD2 ? 'revenueD2' : 'revenue'] -
                    params[isD2 ? 'expensesD2' : 'expenses']
            )
            response.isError = true
            break
        }
    }
}

export const pleaseSmaller = (value: number, isPeriodic = true) =>
    !isPeriodic
        ? joinString(
              dict('thanks_for_smaller_value_arr', 0),
              formatCurrency(value)
          )
        : joinString(
              dict('thanks_for_smaller_value_arr', 0),
              formatCurrency(value),
              dict('thanks_for_smaller_value_arr', 1)
          )
///
