import React from 'react'

export default function UploadModal({open, children}) {
    if (!open) return null
    console.log('This is my child',children)
    return (
        <div>
            {children}
        </div>
    )
}
