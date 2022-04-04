import Modal from 'react-modal';
import TierRewardForm from './TierRewardForm';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './style/index.css';

const TierRewards = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const { projectId }  = useParams();
    
    // When done remove tier rewards from "/" route
    // useSelector => rewards

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
                <p className='reward-title-title'>Example title goes here hahahahaha</p>
                <p className='reward-title-user'>by User</p>
            </div>

            <div className='pledge-container'>
                <div className="reward-support-text">
                    <p>Support this project</p>
                    <p>Select an option below</p>
                </div>

                <div
                    onClick={() => {
                        openModal();
                    }}>
                    Add reward
                </div>

                <div className="reward-modal-container">
                    {/* Modal container */}
                    <Modal
                        style={{ overlay: { backgroundColor: "rgba(68,68,68,.3" } }}
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        className="reward-modal"
                    >
                        <TierRewardForm projectId={projectId}/>
                    </Modal>
                </div>


                <div>
                    <label className='reward-card'>
                        <div className='reward-card'>
                            <input type="radio" name="reward"></input>
                            <div style={{ display: "inline-block" }}>
                                <p>Pledge without a reward</p>
                            </div>
                            <div>
                                <input type="number"></input>
                                <div style={{ cursor:"pointer"}}>Continue</div>
                                {/* Add onclick for continue div to render payment page */}
                            </div>
                        </div>
                    </label>
                </div>

            </div>
        </div>
    )
};

export default TierRewards;
