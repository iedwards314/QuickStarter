import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdates } from '../../store/updates';
import './style/UpdatesFeature.css'

const UpdatesFeature = ({project}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const projectId = project?.id
    const updates = useSelector((state) => state.updates);

    useEffect(() => {
        dispatch(getUpdates(projectId))

    }, [dispatch, projectId]);

    let updatesArr = []
    const updatesMap = () => {
        if(updates) {
            updatesArr = Object.values(updates)
            console.log(updatesArr)
            return(
                <div className='Update-list-container'>
                    <ul className='Update-list'>
                        {updatesArr.map((update, idx)=> (
                            <li className='Update-list-item' key={idx}>
                                <div className='Update-count-container'><p className='Update-count'>{idx + 1}</p></div>
                                <div className='Update-owner-image-container'><img src={project?.user_image} alt={project?.user} className='Update-owner-image'/></div>
                                <div className='Update-detail-container'>
                                    <div className='Update-title-container'><p className='Update-title'>{update?.title}</p></div>
                                    <div className='Update-content-container'><p className='Update-content'>{update?.update}</p></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        else return null
    }

    return (
        <>
            {updatesMap()}
        </>
    )
}

export default UpdatesFeature;
