import React from 'react';
import { Modal } from '../../context/Modal';

function UploadModal(){
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <button id='upload-btn' onClick={() => setShowModal(true)}>
                Upload
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    need to put in
                </Modal>
            )}
        </div>
    )
}

export default UploadModal;
