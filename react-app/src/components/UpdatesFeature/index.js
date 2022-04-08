import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdates, deleteUpdate } from '../../store/updates';
import './style/UpdatesFeature.css'

const UpdatesFeature = ({project}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const projectId = project?.id
    const updates = useSelector((state) => state.updates);

    const projectOwnerDelete = (update) => {
        if (!sessionUser) return;
        if (sessionUser.id === project?.user_id) {
            return (
                <>
                  <div className="Update-delete-btn" onClick={ (e) => destroyUpdatesButton(e, update) }>Delete </div>
                </>
            )
        } else return null
    }

    const projectOwnerAdd = () => {
        if (!sessionUser) return;
        if (sessionUser.id === project?.user_id) {
            return (
                <>
                    <li className='Update-add-btn-list-item' key='Update-add-btn'>
                        <Link to={`/updates/create-form/${project?.id}`} project={project}>
                            <div className="Update-delete-btn" onClick={ () => null }>Add Update </div>
                        </Link>
                    </li>
                </>
            )
        } else return null
    }

    const destroyUpdatesButton = async (e, update) => {
        e.preventDefault();
        const payload = {
            userId: sessionUser?.id,
            id: update?.id,
        }
        let destroyedUpdate;
        try {
            destroyedUpdate = await dispatch(deleteUpdate(payload))
        } catch (error) {
            console.log("error in delete")
        }

        if (destroyedUpdate?.id) {
            dispatch(getUpdates(projectId))
        }
    }

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
                        {project ? projectOwnerAdd() : null}
                        {updatesArr.map((update, idx)=> (
                            <li className='Update-list-item' key={idx}>
                                <div className='Update-count-container'><p className='Update-count'>{idx + 1}</p></div>
                                <div className='Update-owner-image-container'><img src={project?.user_image} alt={project?.user} className='Update-owner-image'/></div>
                                <div className='Update-detail-container'>
                                    <div className='Update-title-container'><p className='Update-title'>{update?.title}</p></div>
                                    <div className='Update-image-container'><p className='Update-image'>    {update?.image_url}</p></div>
                                    <div className='Update-content-container'><p className='Update-content'>{update?.update}</p></div>
                                </div>
                                    {update ? projectOwnerDelete(update):null}
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
