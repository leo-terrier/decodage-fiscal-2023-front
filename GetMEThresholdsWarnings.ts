import { SimulationParams } from '../common-types/general-types'

import { MERevenueThreshold } from './legal-data'
import {
    dict,
    formatCurrency,
    individualizeFieldName,
    joinString
} from './utils/utils'

const isBIC = (socialForm: string, isProfessional: boolean) =>
    (socialForm === 'EI' || socialForm === 'ME') && !isProfessional
// Attention : not entirely true, EURL with income tax can also be BIC (but the warning is not applicable to them)

export const getMEWarning = (
    params: SimulationParams,
    isD2: boolean
): string => {
    const revenue = params[individualizeFieldName('revenue', isD2)] as number
    const isService = params[
        individualizeFieldName('isService', isD2)
    ] as boolean
    const isProfessional = params[
        individualizeFieldName('isProfessional', isD2)
    ] as boolean

    // level 1 => pro income
    if (revenue > MERevenueThreshold(isService as boolean)) {
        return warningMessage.level_1.pro(isService)
    }

    // // professionals only interested in level 1
    if (isService && isProfessional === true) return ''

    const furnishedRentals = params.otherIncomes.furnishedRentals
    // //

    // level 2 => pro income + rentals
    if (furnishedRentals.length) {
        const totalPersonalRentalRents = furnishedRentals
            .filter((rental) => rental.isD2 === isD2)
            .reduce((acc, rental) => acc + rental.rents, 0)

        const totalPersonalBIC = revenue + totalPersonalRentalRents
        const totalServices =
            totalPersonalRentalRents + (isService ? revenue : 0)
        if (
            totalPersonalBIC > MERevenueThreshold(false) ||
            totalServices > MERevenueThreshold(true)
        ) {
            return warningMessage.level_2(isService)
        }
    }

    // // singles only interested in level 1 and 2
    if (!params.isMarried) return ''

    // level 3 => pro income + pro income wife
    let MEServiceCount = isService ? 1 : 0
    let MESalesCount = !isService ? 1 : 0
    let totalBIC = revenue
    let totalService = isService ? revenue : 0
    if (
        isBIC(
            params[individualizeFieldName('socialForm', !isD2)] as string,
            params[individualizeFieldName('isProfessional', !isD2)] as boolean
        )
    ) {
        {
            const isServicePartner = params[
                individualizeFieldName('isService', !isD2)
            ] as boolean
            const revenuePartner = params[
                individualizeFieldName('revenue', !isD2)
            ] as number
            if (isServicePartner) {
                totalService += revenuePartner
                MEServiceCount++
            } else {
                MESalesCount++
            }
            totalBIC += revenuePartner
            if (
                totalBIC > MERevenueThreshold(false) ||
                totalService > MERevenueThreshold(true)
            ) {
                return warningMessage.level_3.pro(MEServiceCount, MESalesCount)
            }
        }
    }

    // level 4 => pro income + wife pro income + rentals + wife rentals
    if (furnishedRentals.length) {
        const totalRents = params.otherIncomes.furnishedRentals.reduce(
            (acc, rental) => acc + rental.rents,
            0
        )
        totalService += totalRents
        totalBIC += totalRents
        if (
            totalBIC > MERevenueThreshold(false) ||
            totalService > MERevenueThreshold(true)
        ) {
            return warningMessage.level_4(MEServiceCount, MESalesCount)
        }
    }
    return ''
}

export const getMEFurnishedWarning = (
    params: SimulationParams,
    rents: number,
    isD2: boolean,
    editId: string = '' // removes recorded value to compare with new value
): string => {
    // level 1 => all personal rentals
    let totalRents = params.otherIncomes.furnishedRentals.reduce(
        (acc, rental) =>
            acc +
            (rental.isD2 === isD2 && editId !== rental.id ? rental.rents : 0),
        rents
    )

    if (totalRents > MERevenueThreshold(true)) {
        return warningMessage.level_1.rentals
    }

    // level 2 => all personal rentals + pro income
    let totalBIC = totalRents
    let totalService = totalRents
    let MEServiceCount = 0
    let MESalesCount = 0
    if (
        isBIC(
            params[individualizeFieldName('socialForm', isD2)] as string,
            params[individualizeFieldName('isProfessional', isD2)] as boolean
        )
    ) {
        const revenue = params[
            individualizeFieldName('revenue', isD2)
        ] as number
        const isService = params[
            individualizeFieldName('isService', isD2)
        ] as boolean

        if (isService) {
            totalService += revenue
            MEServiceCount++
        } else {
            MESalesCount++
        }
        totalBIC += revenue
        if (
            totalBIC > MERevenueThreshold(false) ||
            totalService > MERevenueThreshold(true)
        ) {
            return warningMessage.level_2(isService)
        }
    }

    if (!params.isMarried) return ''

    // level 3 => personal rentals + wife rentals
    totalRents += params.otherIncomes.furnishedRentals.reduce(
        (acc, rental) =>
            acc +
            (rental.isD2 !== isD2 && editId !== rental.id ? rental.rents : 0), // adding id check here prevents from adding again the rental if declarant has been switched in the form before submission
        0
    )
    if (totalRents > MERevenueThreshold(true)) {
        return warningMessage.level_3.rentals
    }

    // level 4 => pro income + wife pro income + rentals + wife rentals
    if (
        isBIC(
            params[individualizeFieldName('socialForm', !isD2)] as string,
            params[individualizeFieldName('isProfessional', !isD2)] as boolean
        )
    ) {
        const revenuePartner = params[
            individualizeFieldName('revenue', !isD2)
        ] as number
        const isServicePartner =
            params[individualizeFieldName('isService', !isD2)]

        if (isServicePartner) {
            totalService += revenuePartner
            MEServiceCount++
        } else {
            MESalesCount++
        }
        totalBIC += revenuePartner
        if (
            totalBIC > MERevenueThreshold(false) ||
            totalService > MERevenueThreshold(true)
        ) {
            return warningMessage.level_4(MEServiceCount, MESalesCount)
        }
    }
    return ''
}

const warningMessage = {
    //personal rental OR pro
    level_1: {
        pro: (isService: boolean) =>
            joinString(
                dict('level_1_ME_limit_passed_arr', 0),
                formatCurrency(MERevenueThreshold(isService)),
                dict('level_1_ME_limit_passed_arr', 1),
                dict('level_1_ME_limit_passed_arr', 2)
            ),
        rentals: joinString(
            dict('level_1_ME_furnished_limit_passed_arr', 0),
            formatCurrency(MERevenueThreshold(true)),
            dict('level_1_ME_furnished_limit_passed_arr', 1)
        )
    },
    // personal rental + personal pro
    level_2: (isService: boolean) =>
        isService
            ? joinString(
                  dict('level_2_ME_limit_is_service_arr', 0),
                  formatCurrency(MERevenueThreshold(true)),
                  dict('level_2_ME_limit_is_service_arr', 1)
              )
            : joinString(
                  dict('level_2_ME_limit_is_not_service_arr', 0),
                  dict('level_2_ME_limit_is_not_service_arr', 1) /*link */,
                  dict('level_2_ME_limit_is_not_service_arr', 2),
                  formatCurrency(MERevenueThreshold(true)),
                  dict('level_2_ME_limit_is_not_service_arr', 3),
                  formatCurrency(MERevenueThreshold(false)),
                  dict('level_2_ME_limit_is_not_service_arr', 4)
              ),
    // personal + wife (rental OR pro)
    level_3: {
        pro: (MEServiceCount: number, MESalesCount: number) =>
            MEServiceCount && MESalesCount
                ? joinString(
                      dict('level_3_ME_limit_pro_one_each_arr', 0) /*link */,
                      dict('level_3_ME_limit_pro_one_each_arr', 1),
                      dict('level_3_ME_limit_pro_one_each_arr', 2),
                      dict('level_3_ME_limit_pro_one_each_arr', 3) /*link*/,
                      dict('level_3_ME_limit_pro_one_each_arr', 4),
                      formatCurrency(MERevenueThreshold(true)),
                      dict('level_3_ME_limit_pro_one_each_arr', 5),
                      formatCurrency(MERevenueThreshold(false)),
                      dict('level_3_ME_limit_pro_one_each_arr', 6)
                  )
                : joinString(
                      dict('level_3_ME_limit_pro_same_arr', 0) /*link */,
                      dict('level_3_ME_limit_pro_same_arr', 1),
                      dict('level_3_ME_limit_pro_same_arr', 2),
                      formatCurrency(
                          MERevenueThreshold(MEServiceCount ? true : false)
                      ),
                      dict('level_3_ME_limit_pro_same_arr', 3)
                  ),
        rentals: joinString(
            dict('level_3_ME_limit_rentals_arr', 0),
            dict('level_3_ME_limit_rentals_arr', 1),
            formatCurrency(MERevenueThreshold(true)),
            dict('level_3_ME_limit_rentals_arr', 2),
            dict('level_3_ME_limit_rentals_arr', 3),
            dict('level_3_ME_limit_rentals_arr', 4)
        )
    },
    // personal + wife (rental + pro)
    level_4: (MEServiceCount: number, MESalesCount: number) =>
        MEServiceCount && MESalesCount
            ? joinString(
                  dict('level_4_ME_limit_one_each_arr', 0) /*link */,
                  dict('level_4_ME_limit_one_each_arr', 1),
                  dict('level_4_ME_limit_one_each_arr', 2),
                  dict('level_4_ME_limit_one_each_arr', 3) /*link*/,
                  dict('level_4_ME_limit_one_each_arr', 4),
                  formatCurrency(MERevenueThreshold(true)),
                  dict('level_4_ME_limit_one_each_arr', 5),
                  formatCurrency(MERevenueThreshold(false)),
                  dict('level_4_ME_limit_one_each_arr', 6)
              )
            : MEServiceCount
            ? joinString(
                  dict('level_4_ME_limit_both_service_arr', 0) /*link */,
                  dict('level_4_ME_limit_both_service_arr', 1),
                  dict('level_4_ME_limit_both_service_arr', 2),
                  formatCurrency(MERevenueThreshold(true)),
                  dict('level_3_ME_limit_pro_same_arr', 3)
              )
            : joinString(
                  dict('level_4_ME_limit_both_sales', 0) /*link */,
                  dict('level_4_ME_limit_both_sales', 1),
                  dict('level_4_ME_limit_both_sales', 2),
                  dict('level_4_ME_limit_both_sales', 3) /*link*/,
                  dict('level_4_ME_limit_both_sales', 4),
                  formatCurrency(MERevenueThreshold(true)),
                  dict('level_4_ME_limit_both_sales', 5),
                  formatCurrency(MERevenueThreshold(false)),
                  dict('level_4_ME_limit_both_sales', 6)
              )
}

// hello
