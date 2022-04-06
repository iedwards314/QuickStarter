import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams, NavLink } from "react-router-dom";
import { getProject, deleteProject } from "../../store/project";
import './ProjectPage.css';

function ProjectForm() {
    //get one
    const dispatch = useDispatch();
    const history = useHistory();
    const { projectId } = useParams();
    const sessionUser = useSelector((state) => state.session.user)
    const project = useSelector((state) => state.project.selected[projectId]);
    let cProject = {...project}
    const [deletePrompt, setDeletePrompt] = useState(false);

    useEffect(() => {
        dispatch(getProject(projectId))
    }, [dispatch]);

    const showButtons = () => {
        if(!sessionUser) return;
        if(sessionUser.id === cProject?.user_id){
            return (
                <div className="Project-btns">
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
                    <button type="submit" onClick={destroyProjectButton} >
                        Confirm Delete
                    </button>
                    <button onClick={() => setDeletePrompt(false)} >
                        Cancel Delete
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
                        <h1>{project?.title}</h1>
                        <p>{project?.description}</p>
                    </div>
                    <div className="Project-Image-Container">
                        <img className="Project-Image" src={`${project?.image}`} />
                    </div>
                </>
            )
        }
    }

    return(
        <>
            <div className="Project-Container">
                {projectDetail()}
                {showButtons()}
            </div>
        </>
    );
};

export default ProjectForm;
