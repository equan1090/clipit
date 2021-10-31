import React from 'react'

export default function UploadModal({open, children}) {
    if (!open) return null
    
    return (
        <div>
            {children}
        </div>
    )
}
