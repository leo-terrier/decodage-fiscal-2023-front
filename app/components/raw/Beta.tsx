import { dict, joinString } from '@/utils/utils'

const Beta = ({
    fontSize = 'text-inherit',
    className = ''
}: {
    fontSize?: string
    className?: React.ComponentProps<'div'>['className']
}) => {
    return (
        /*  <div className={joinStyle('flex justify-center', fontSize, className)}>
            <span>(</span> */
        /*   <p
            className={joinString(
                'gap-[6px] mx-auto font-semibold flex justify-center drop-shadow-sm  text-center underline decoration-orange-dark underline-offset-4',
                className,
                fontSize
            )}
        > */
        <p
            className={joinString(
                'text-center text-lg font-bold font-poppins text-orange-dark',
                className,
                fontSize
            )}
        >
            {dict('beta_version')}
        </p>
    )
}

export default Beta
