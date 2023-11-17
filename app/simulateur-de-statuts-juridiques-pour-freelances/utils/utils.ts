import { SocialFormTypeD2 } from '../../../../common-types/general-types'

export const getIsFreelance = (socialForm: SocialFormTypeD2) =>
    ['SAS', 'SARL', 'ME', 'EI'].includes(socialForm)
