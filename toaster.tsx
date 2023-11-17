import { toast } from 'react-toastify'
import dic from 'dict/fr.json'
import { dict } from './utils/utils'

type TextType = (keyof typeof dic)[] | keyof typeof dic

const currentText = (
    text: TextType // max actual width of text : 450px,
) => (
    <p className='toast-container flex flex-col gap-1 items-center'>
        {typeof text !== 'object' ? (
            dict(text)
        ) : (
            <>
                <span className='text-inherit toast-text whitespace-nowrap'>
                    {dict(text[0])}
                </span>
                {text.slice(1).map((elt) => (
                    <span
                        className='text-sm toast-text-sub toast-text'
                        key={elt}
                    >
                        {dict(elt)}
                    </span>
                ))}
            </>
        )}
    </p>
)

type MyToastType = {
    text: TextType
    autoClose?: number
}
export const toaster = {
    success: ({ text, autoClose }: MyToastType) => {
        toast.success(currentText(text), {
            autoClose
        })
    },
    warning: ({ text, autoClose }: MyToastType) => {
        toast.warning(currentText(text), {
            autoClose
        })
    },
    info: ({ text, autoClose }: MyToastType) => {
        toast.info(currentText(text), {
            autoClose
        })
    },
    inputError: () => {
        toast.error(currentText('noti_input_error'), {
            autoClose: 2000
        })
    }
}
