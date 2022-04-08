import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { getProject, deleteProject, getProjectInfo } from "../../store/project";
import ProgressBar from "../ProgressBar";
import ProjectNavBar from "../ProjectNavBar";
import './ProjectPage.css';

function ProjectForm() {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    useEffect((projectId) => {
        console.log('WHYWHYWHWYHWYWHYWHWY')
        dispatch(getProject(projectId))
        dispatch(getProjectInfo(projectId))
    }, [dispatch, projectId]);
    const history = useHistory();
    const state = useSelector((state) => state)
    console.log('PARAMSPARAMSPARAMS', state)
    const sessionUser = useSelector((state) => state.session.user)
    const project = useSelector((state) => state.project.selected[projectId]);
    console.log('PARAMSPARAMSPARAMS', project)
    const info = useSelector((state) => state.project.info)
    let cProject = {...project}

    const [deletePrompt, setDeletePrompt] = useState(false);


    const showButtons = () => {
        if (!sessionUser) return;
        if (sessionUser.id === cProject?.user_id) {
            return (
                <div className="Project-btns">
                    <NavLink className="Project-rewards-btn" exact to={`/projects/${cProject?.id}/rewards`}>
                        Edit Rewards
                    </NavLink>
                    <NavLink className="Project-rewards-btn" exact to={`/projects/${cProject?.id}/edit`}>
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
    const destroyProjectButton = async (e) => {
        e.preventDefault();
        const payload = {
            userId: sessionUser?.id,
            id: project?.id,
        }
        let destroyedProject;
        try {
            destroyedProject = await dispatch(deleteProject(payload))
        } catch (error) {
            console.log("error in delete")
        }

        if (destroyedProject?.id) {
            history.push("/");
        }
    }

    //confirmation for user delete
    const deleteButtons = () => {
        if (deletePrompt === true) {
            return (
                <>
                    <div className="Delete-confirm-btn" type="submit" onClick={destroyProjectButton} >
                        Confirm
                    </div>
                    <div className="Delete-cancel-btn" onClick={() => setDeletePrompt(false)} >
                        Cancel
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                  <div className="Project-rewards-btn" onClick={() => setDeletePrompt(true)}>Delete</div>
                </>
            );
        }
    }

    //prevents a 404 error on initial render
    const projectDetail = () => {
        if (project === undefined) return null;
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
        if (project === undefined) return null;
        else {
            return (
                <>
                    <div className="Project-Image-Container">
                        <img alt={`${project?.title}`} className="Project-Image" src={`${project?.image}`} />
                    </div>
                </>
            )
        }
    }

    const projectRewardsDetail = () => {
        if (project === undefined) return null;
        else {
            let date_now = new Date();
            let end_date = new Date(project?.end_date)
            let seconds = Math.floor((end_date - (date_now)) / 1000);
            let hours = Math.floor(seconds / 3600);


            let completionPercent = (Math.floor((info?.total / project?.goal) * 100));

            return (
                <>
                    <ProgressBar completed={completionPercent} bgcolor={'#44fff0'}/>
                    <p style={{fontSize: "30px",
                               margin: "10px 0px 0px 0px",
                               color: "#44FFF0",
                               fontWeight: "bold"}}>{`$${info?.total}`}</p>
                    <h3 style={{margin: "0px"}}>{`pledged of $${project?.goal} goal`}</h3>
                    <p style={{fontSize: "30px",
                               margin: "25px 0px 0px 0px",
                               color: "#44FFF0",
                               fontWeight: "bold"}}>{info?.backers}</p>
                    <h3 style={{margin: "0px"}}>backers</h3>
                    <p style={{fontSize: "30px",
                               margin: "30px 0px 0px 0px",
                               color: "#44FFF0",
                               fontWeight: "bold"}}>{hours}</p>
                    <h3 style={{margin: "0px"}}>hours to go</h3>
                </>
            )
        }
    }

    return (
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
            <ProjectNavBar project={project} seesionUser={sessionUser} projectId={`${project.id}`}/>
        </div>
    );
};

export default ProjectForm;
