import { useDispatch, useSelector } from 'react-redux';
import { deleteReward } from '../../store/rewards';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TierRewardForm from './TierRewardForm';
import { postContribution } from '../../store/contributions';
import { useReward } from '../../Context/RewardContext';
import Modal from 'react-modal';
import './style/newrewardcards.css'

const RewardCard = ({ reward, projectId }) => {
    const { currentReward, setCurrentReward } = useReward();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState(null);

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

    const submitContribution = async () => {
        // submit contribution
        if (amount < 0) return alert('Amount must be more than $0 >:^[')
        if (amount > 0) {
            const contribution = {
                reward_id: reward.id,
                amount,
                project_id: projectId,
                user_id: user.id
            };
            const res = await postContribution(contribution)
            return history.push(`/checkout/${res.id}`)
        }
    };

    return (
        <>
            <label className='reward-card'>
                <div className='reward-card'>
                    <input id={reward?.id} type="radio" name="reward" onChange={(e) => setCurrentReward(e.target.id)}></input>
                    <div className='reward-text'>
                        <p className='cost-ptag'>${reward.cost} or more</p>
                    </div>
                    <div className='reward-info'>
                        <p className='reward-title-ptag'>{reward.title}</p>
                        <p className='reward-desc-ptag'>{reward.description}</p>
                    </div>
                    <div className='reward-inputbox'>
                        <label className='dollarsign'>$</label>
                        <input
                            onChange={(e) => setAmount(e.target.value)}
                            className='reward-number-inputbox' placeholder='Number' type="number"></input>
                        <div
                            className={parseInt(currentReward) === reward?.id ? 'reward-inputcontinue' : 'hidden'} style={{ cursor: "pointer" }}
                            onClick={submitContribution}>Continue</div>
                        <div className='reward-buttons'>
                            <div
                                className='reward-edit'
                                onClick={() => {
                                    openModal();
                                }}>
                                Edit
                            </div>
                            <Modal
                                ariaHideApp={false}
                                style={{ overlay: { backgroundColor: "rgba(68,68,68,.3" } }}
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                className="reward-modal">
                                <TierRewardForm reward={reward} editForm={true} projectId={projectId} />
                            </Modal>
                            <div
                                className='reward-delete'
                                onClick={() => handleDelete(reward.id)}
                                style={{ cursor: "pointer" }}>
                                Delete
                            </div>
                        </div>
                        {/* Add onclick for continue div to render payment page */}
                    </div>
                </div>
            </label>
        </>
    )
};

export default RewardCard;
