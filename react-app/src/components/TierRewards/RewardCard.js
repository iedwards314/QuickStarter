import { useDispatch } from 'react-redux';
import { deleteReward } from '../../store/rewards';
import { useState } from 'react';
import TierRewardForm from './TierRewardForm';
import Modal from 'react-modal';
import './style/newrewardcards.css'

const RewardCard = ({ reward, projectId }) => {
    const dispatch = useDispatch();
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleDelete = (rewardId) => {
        dispatch(deleteReward(rewardId))
    }

    const openModal = () => {
        setIsOpen(true);
        return;
    }

    const closeModal = () => {
        setIsOpen(false);
        return
    }

    return (
        <>
            <label className='reward-card'>
                <div className='reward-card'>
                    <input type="radio" name="reward"></input>
                    <div className='reward-text'>
                        <p className='cost-ptag'>${reward.cost} or more</p>
                    </div>
                    <div className='reward-info'>
                        <p className='reward-title-ptag'>{reward.title}</p>
                        <p className='reward-desc-ptag'>{reward.description}</p>
                    </div>
                    <div className='reward-inputbox'>
                        <label className='dollarsign'>$</label>
                        <input className='reward-number-inputbox' placeholder='Number' type="number"></input>
                        <div>
                            <div className='reward-inputcontinue' style={{ cursor: "pointer" }}>Continue</div>
                            <div
                                onClick={() => {
                                    openModal();
                                }}>Edit</div>
                            <Modal
                                ariaHideApp={false}
                                style={{ overlay: { backgroundColor: "rgba(68,68,68,.3" } }}
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                className="reward-modal">
                                <TierRewardForm reward={reward} editForm={true} projectId={projectId} />
                            </Modal>
                            <div
                                onClick={() => handleDelete(reward.id)}
                                style={{ cursor: "pointer" }}>Delete</div>
                        </div>
                        {/* Add onclick for continue div to render payment page */}
                    </div>
                </div>
            </label>
        </>
    )
};

export default RewardCard;
