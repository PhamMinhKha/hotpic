import React from 'react'
import {Image} from 'antd'

export default function ImageInDetail({children}) {
    return (
        <div>
            {children ? <Image src={children}/> : <Image src="/images/poster.jpeg" />}   
        </div>
    )
}
