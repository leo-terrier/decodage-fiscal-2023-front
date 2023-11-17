import { Dialog } from '@headlessui/react'
import { MdClose } from 'react-icons/md'
import IconButton from '@/app/components/raw/IconButton'

type Type = {
    children: React.ReactNode
    handleClose: () => void
    title: string
    description: React.ReactNode
    isOpen: boolean
}
const Modal = ({ children, isOpen, handleClose, title, description }: Type) => {
    return (
        <Dialog open={isOpen} onClose={handleClose} className='bg-black'>
            <div
                className='fixed inset-0 bg-black/60 pointer-event-none'
                aria-hidden='true'
            />
            <div className=' fixed inset-0 flex items-center justify-center'>
                <Dialog.Panel
                    id='modal'
                    className='bg-white p-5 py-7 sm:p-10 rounded-lg relative w-[93%] max-h-[95%] overflow-y-auto overflow-x-hidden sm:w-9/12'
                >
                    <IconButton
                        className='absolute top-2 right-2 text-[1.5rem] sm:text-[1.75rem]'
                        aria-label='Fermer modale'
                        onClick={handleClose}
                    >
                        <MdClose className='text-inherit' />
                    </IconButton>
                    <Dialog.Title
                        className={
                            'mb-4 sm:mb-6 text-2xl/5 sm:text-3xl/7 font-bold'
                        }
                    >
                        {title}
                    </Dialog.Title>
                    <Dialog.Description>{description}</Dialog.Description>
                    {children}
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default Modal
