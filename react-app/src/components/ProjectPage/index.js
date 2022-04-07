import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink, Link } from "react-router-dom";
import { getProject, deleteProject, getProjectInfo } from "../../store/project";
import ProgressBar from "../ProgressBar";
import './ProjectPage.css';

function ProjectForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { projectId } = useParams();
    const sessionUser = useSelector((state) => state.session.user)
    const project = useSelector((state) => state.project.selected[projectId]);
    const info = useSelector((state) => state.project.info)
    let cProject = {...project}
    const [deletePrompt, setDeletePrompt] = useState(false);

    useEffect(() => {
        dispatch(getProject(projectId))
        dispatch(getProjectInfo(projectId))
    }, [dispatch, projectId]);

    const showButtons = () => {
        if(!sessionUser) return;
        if(sessionUser.id === cProject?.user_id){
            return (
                <div className="Project-btns">
                    <NavLink className="Project-rewards-btn" exact to={`/projects/${cProject?.id}/rewards`}>
                        Edit Rewards
                    </NavLink>
                    <NavLink className="Project-edit-btn" exact to={`/projects/${cProject?.id}/edit`}>
                        Edit
                    </NavLink>
                    {deleteButtons()}
                </div>
            )
        } else {
            return (
                <div className="Project-btns">
                    <NavLink className="Project-rewards-btn" exact to={`/projects/${cProject?.id}/rewards`}>
                        Back this Project
                    </NavLink>
                </div>
            );
        }
    }

    //function for destroy
    const destroyProjectButton = async(e) => {
        e.preventDefault();
        const payload = {
            userId: sessionUser?.id,
            id: project?.id,
        }
        let destroyedProject;
        try {
            destroyedProject = await dispatch(deleteProject(payload))
            console.log("destroyed project is...", destroyedProject)
        } catch (error) {
            console.log("error in delete")
        }

        if(destroyedProject?.id){
            history.push("/");
        }
    }

    //confirmation for user delete
    const deleteButtons = () => {
        if(deletePrompt === true){
            return (
                <>
                    <button className="Delete-confirm-btn" type="submit" onClick={destroyProjectButton} >
                        Confirm
                    </button>
                    <button className="Delete-cancel-btn" onClick={() => setDeletePrompt(false)} >
                        Cancel
                    </button>
                </>
            )
        }
        else{
            return (
                <>
                  <button className="Project-delete-btn" onClick={() => setDeletePrompt(true)}>Delete</button>
                </>
              );
        }
    }

    //prevents a 404 error on initial render
    const projectDetail = () => {
        if(project === undefined) return null;
        else {
            return (
                <>
                    <div className="Project-Detail-div">
                        <h1 style={{margin: "0px"}}>{project?.title}</h1>
                        <p style={{margin: "5px 0px 30px 0px"}}>{project?.description}</p>
                    </div>
                </>
            )
        }
    }

    const projectImage = () => {
        if(project === undefined) return null;
        else{
            return(
                <>
                    <div className="Project-Image-Container">
                        <img alt={`${project?.title}`} className="Project-Image" src={`${project?.image}`} />
                    </div>
                </>
            )
        }
    }

    const projectRewardsDetail = () => {
        if(project === undefined) return null;
        else {
            // let rewardSum = 0
            // for(let i = 0; i < project?.rewards.length; i++){
            //     rewardSum += project?.rewards[i];
            // }

            let date_now = new Date();
            let end_date = new Date(project?.end_date)
            let seconds = Math.floor((end_date - (date_now))/1000);
            let hours = Math.floor(seconds/3600);


            let completionPercent = (Math.floor((info?.total / project?.goal) * 100));
            
            return (
                <>
                    <ProgressBar completed={completionPercent} bgcolor={'#44fff0'}/>
                    <p>{`$${info?.total}`}</p>
                    <h3>{`pledged of $${project?.goal} goal`}</h3>
                    <p>{info?.backers}</p>
                    <h3>backers</h3>
                    <p>{hours}</p>
                    <h3>hours to go</h3>
                </>
            )
        }
    }

    return(
        <div className="main-container">
            <div className="Project-container">
                <div className="Project-detail-container">
                    {projectDetail()}
                </div>
                <div className="Project-Rewards-container">
                    {projectImage()}
                    <div className="Project-Rewards">
                        {projectRewardsDetail()}
                        {showButtons()}
                    </div>
                </div>
            </div>
            <div className="lower-link-container">
                <ul className="project-links-list">
                    <li>
                        <Link className="" exact to={`/projects/${cProject?.id}`}>
                            Campaign Details
                        </Link>
                    </li>
                    <li>
                        <Link className="" exact to={`/projects/${cProject?.id}/updates`}>
                            Updates
                        </Link>
                    </li>
                    <li>
                        <Link className="" exact to={`/projects/${cProject?.id}/comments`}>
                            Comments
                        </Link>
                    </li>
                </ul>
            </div>
            <div></div>
        </div>
    );
};

export default ProjectForm;
