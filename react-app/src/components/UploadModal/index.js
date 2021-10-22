import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import UploadForm from './UploadForm';
function UploadModal(){
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <button id='upload-btn' onClick={() => setShowModal(true)}>
                Upload
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UploadForm />
                </Modal>
            )}
        </div>
    )
}

export default UploadModal;
