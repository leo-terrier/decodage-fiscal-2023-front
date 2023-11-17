'use client'

import {
    EmailShareButton,
    LinkedinShareButton,
    TwitterShareButton
} from 'react-share'
import { BsLinkedin } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { FaTwitter } from 'react-icons/fa'

const CustomSocialMediaButtons = ({
    url,
    title
}: {
    url: string
    title: string
}) => {
    return (
        <div className='flex gap-4'>
            <EmailShareButton url={url} subject={title}>
                <MdEmail size='1.3rem' />
            </EmailShareButton>
            <LinkedinShareButton url={url}>
                <BsLinkedin size='0.95rem' />
            </LinkedinShareButton>
            <TwitterShareButton url={url}>
                <FaTwitter size='1.2rem' />
            </TwitterShareButton>
        </div>
    )
}

export default CustomSocialMediaButtons
