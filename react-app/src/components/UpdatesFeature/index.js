import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdates } from '../../store/updates';

const UpdatesFeature = ({project}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const projectId = project?.id
    const updates = useSelector((state) => state.updates);
    console.log("update title is...",updates[1]?.title)
    console.log("update content is...",updates[1]?.update)
    console.log("Object values are...", Object.values(updates))


    useEffect(() => {
        dispatch(getUpdates(projectId))

    }, [dispatch, projectId]);

    let updatesArr = []
    const updatesMap = () => {
        if(updates) {
            console.log("hitting updates array")
            updatesArr = Object.values(updates)
            console.log(updatesArr)
            return(
                <div className='Update-list-container'>
                    <ul className='Update-list'>
                    {updatesArr.map((update, idx)=> (
                    <li className='Update-list-item' key={idx}>
                        <div className='Update-count'>{idx + 1}</div>
                        <div className='Update-title'><p>{update?.title}</p></div>
                        <div className='Update-content'><p>{update?.update}</p></div>
                        <div className='Update-user-image'><img src={project?.user_image} alt={project?.user} /></div>
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
            <p>Hitting Updates</p>
            {updatesMap()}
        </>
    )
}

export default UpdatesFeature;
