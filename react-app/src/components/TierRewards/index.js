import Modal from 'react-modal';
import TierRewardForm from './TierRewardForm';
import RewardCard from './RewardCard';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../../store/project';
import './style/index.css';

const TierRewards = () => {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.project.selected)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const { projectId }  = useParams();


    useEffect(() => {
        const addProject = async () => {
            const project = { id: projectId }
            const ret = await dispatch(getProject(project));
            setCurrentProject(ret);
        }
        addProject();
    }, [dispatch])

    let title;
    if (currentProject) {
            title = (
            <>
                <p className='reward-title-title'>{currentProject.title}</p>
                <p className='reward-title-user'>by {currentProject.username}</p>
            </>
            )
    } else {
        title = (
            <p>... loading</p>
        )

    }
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
                {title}
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
                    {currentProject?.rewards?.map((reward) => (
                        <RewardCard reward={reward}/>
                    ))}
                </div>

            </div>
        </div>
    )
};

export default TierRewards;
