import Modal from 'react-modal';
import TierRewardForm from './TierRewardForm';
import { useState } from 'react';
import './style/index.css';

const TierRewards = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
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
                        style={{ overlay: { backgroundColor: "rgba(68,68,68,.3" } }}
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        className="reward-modal"
                    >
                        <TierRewardForm />
                    </Modal>
                </div>

                <div>
                    <div
                        id={1}
                        onClick={(e) => setSelected(e.target.id)}>
                        {/* <div className={selected === 1 ? 'reward-circle selected' : 'reward-circle'} /> */}
                        <div>
                            <div>
                                <label className='reward-card'>
                                    <div className='reward-card'>
                                        <input type="radio" name="reward"></input>
                                        <p>hello</p>
                                    </div>
                                </label>
                            </div>
                            <div>
                                <label className='reward-card'>
                                    <div className='reward-card'>
                                        <input type="radio" name="reward"></input>
                                        <p>hello</p>
                                    </div>
                                </label>
                            </div>

                        </div>
                        {/* <select>
                            <option>Pledge without a reward</option>
                        </select> */}
                        <p>Pledge without a reward</p>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default TierRewards;
