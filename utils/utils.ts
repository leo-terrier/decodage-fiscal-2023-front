import { defaultQueryParams } from '@/app/simulateur-de-statuts-juridiques-pour-freelances/SimulationContext'
import dic from '../dict/fr.json'
import { Metadata } from 'next'
type CondiStyleArr = [
    boolean,
    React.ComponentProps<'div'>['className'],
    React.ComponentProps<'div'>['className']?
]
export const condiStyle = (...args: CondiStyleArr[]) => {
    const styleArr: string[] = []

    args.forEach((rules) => {
        if (rules[0]) {
            styleArr.push(rules[1] as string)
        } else if (rules[2]) {
            styleArr.push(rules[2])
        }
    })
    return ' ' + styleArr.join(' ')
}

export const individualizeFieldName = (
    id: keyof typeof defaultQueryParams,
    isD2: boolean
) => {
    return (id + (isD2 ? 'D2' : '')) as keyof typeof defaultQueryParams
}

export const formatCurrency = (value: number) => {
    return Math.round(value).toLocaleString('fr') + ' €'
}
/* export const dictSentenceBuilder = (...args: (keyof typeof dict)[]): string => {
    return args.map((str) => dict[str]).join(' ')
}
 */

export const formatPercentage = (value: number, toFixed = 2) => {
    return (value * 100).toFixed(toFixed) + '%'
}

export const dict = (string: keyof typeof dic, idx: number | null = null) =>
    idx !== null ? (dic[string][idx] as string) : (dic[string] as string)

export const joinString = (...args: string[]) => args.join(' ')

/* Changes
alernate.canonical
title
description
openGraphTitle
openGraphDescription

*/

type BuildMetaDataType = {
    relativeUrl: string
    title: string
    description?: string
} & Partial<Metadata>

export const metadataBuilder = ({
    relativeUrl,
    title,
    description = dict('simulator_page_desc'),
    ...rest
}: BuildMetaDataType): Metadata => ({
    title,
    description,
    alternates: {
        canonical: relativeUrl
    },
    openGraph: {
        title,
        description,
        url: relativeUrl,
        siteName: 'Décodage Fiscal',
        locale: 'fr_FR',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1142,
                height: 798
            }
        ]
    },
    ...rest
})
