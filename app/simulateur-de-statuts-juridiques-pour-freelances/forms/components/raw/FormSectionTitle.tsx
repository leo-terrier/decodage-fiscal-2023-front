import { joinString } from '@/utils/utils'

type Type = {
    children: React.ReactNode
    className?: React.ComponentProps<'div'>['className']
    boldness?: string
    fontSize?: string
}

const FormSectionTitle = ({
    children,
    className = '',
    boldness = 'font-semibold',
    fontSize = 'text-2xl'
}: Type) => {
    return (
        <h2
            className={joinString(
                'text-center  font-poppins',
                boldness,
                fontSize,
                className
            )}
        >
            {children}
        </h2>
    )
}

export default FormSectionTitle
