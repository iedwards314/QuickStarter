import Modal from 'react-modal';
import { useState } from 'react';
import './style/index.css';

const TierRewards = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    // When done remove tier rewards from "/" route

    const openModal = () => {
        setIsOpen(true);
        return;
    }

    const closeModal = () => {
        setIsOpen(false);
        return
    }

    return (
        <div className="reward-container">
            <div className="reward-title-container">
                <p>Some title</p>
                <p>by User</p>
            </div>
            <div>
                <div className="reward-support-text">
                    <p>Support this project</p>
                    <p>Select an option below</p>
                </div>
                <div
                    onClick={() => {
                        openModal();
                    }}>
                    Button!
                </div>
                <div className="reward-modal-container">
                {/* Modal container */}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        className="reward-modal"
                    >
                    </Modal>
                </div>
            </div>
        </div>
    )
};

export default TierRewards;
