import Modal from 'react-modal';
import TierRewardForm from './TierRewardForm';
import RewardCard from './RewardCard';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../../store/project';
import { getRewards } from '../../store/rewards';
import { postContribution } from '../../store/contributions';
import { useReward } from '../../Context/RewardContext';
import './style/index.css';

const TierRewards = () => {
    const { currentReward, setCurrentReward } = useReward();
    const dispatch = useDispatch();
    const history = useHistory();
    const project = useSelector((state) => state.project.selected)
    const user = useSelector((state) => state.session.user)
    const rewards = useSelector((state) => Object.values(state.rewards))
    const [amount, setAmount] = useState("")
    const [modalIsOpen, setIsOpen] = useState(false);
    const { projectId } = useParams();

    // Sorts rewards based on their cost before rendering :
    rewards?.sort((a, b) => a.cost - b.cost)

    useEffect(() => {
        dispatch(getProject(projectId));
        dispatch(getRewards(projectId))
    }, [dispatch, projectId])

    let title;
    if (project) {
        title = (
            <>
                <p className='reward-title-title'>{project[projectId]?.title}</p>
                <p className='reward-title-user'>by {project[projectId]?.username}</p>
            </>
        )
    } else {
        title = (
            <p>... loading</p>
        )

    }

    let addButton;
    if (user?.id === project[projectId]?.user_id) {
        addButton = (
            <div
                className='reward-open-modal'
                onClick={() => {
                    openModal();
                }}
            >
                Add reward
            </div>
        )
    } else {
        addButton = null;
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
                amount,
                project_id: projectId,
                user_id: user.id
            };
            const res = await postContribution(contribution)
            return history.push(`/checkout/${res.id}`)
        }
    };


    return (
        <div className="reward-container">
            <div className="reward-title-container">
                {title}
            </div>

            <div className='pledge-container'>
                <div className="reward-support-text">
                    <div>
                        <p style={{
                            fontSize: "22px",
                            margin: "75px 0px 0px 0px"
                        }}>Support this project</p>
                        <p style={{
                            fontSize: "14px",
                            margin: "5px 0px 0px 0px"
                        }}>Select an option below</p>
                    </div>
                    {addButton}

                </div>


                <div className="reward-modal-container">
                    {/* Modal container */}
                    <Modal
                        ariaHideApp={false}
                        style={{ overlay: { backgroundColor: "rgba(68,68,68,.3" } }}
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        className="reward-modal"
                    >
                        <TierRewardForm projectId={projectId} />
                    </Modal>
                </div>


                <div>
                    <label onClick={() => setCurrentReward("base")} className='reward-card'>
                        <div className='reward-card'>
                            <input type="radio" name="reward"></input>
                            <div className='reward-text'>
                                <p>Pledge without a reward</p>
                            </div>
                            <div className={currentReward === 'base' ? 'reward-inputbox' : 'hidden'}>
                                <label className='dollarsign'>$</label>
                                <input className='reward-number-inputbox' onChange={(e) => setAmount(e.target.value)} placeholder='Number' type="number"></input>
                                <div className={currentReward === 'base' ? 'reward-inputcontinue' : 'hidden'} onClick={submitContribution} style={{ cursor: "pointer" }}>Continue</div>
                                {/* Add onclick for continue div to render payment page */}
                            </div>
                        </div>
                    </label>
                    {rewards?.map((reward) => (
                        <RewardCard key={reward.id} reward={reward} projectId={projectId} />
                    ))}
                </div>

            </div>
        </div>
    )
};

export default TierRewards;
