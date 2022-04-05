import { useDispatch } from 'react-redux';
import { deleteReward } from '../../store/rewards';
import { getProject } from '../../store/project';
import './style/newrewardcards.css'

const RewardCard = ({ reward }) => {
    const dispatch = useDispatch();

    const handleDelete = (rewardId) => {
        dispatch(deleteReward(rewardId))
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
                            <div>Edit</div>
                            <div
                                onClick={() => handleDelete(reward.id)}
                                style={{cursor: "pointer"}}>Delete</div>
                        </div>
                        {/* Add onclick for continue div to render payment page */}
                    </div>
                </div>
            </label>
        </>
    )
};

export default RewardCard;
