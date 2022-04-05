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

    const showEditDeleteButtons = () => {
        if(!sessionUser) return;
        if(sessionUser.id === cProject?.user_id){
            return (
                <>
                    <NavLink exact to={`/projects/${cProject?.id}/edit`}>
                        Edit
                    </NavLink>
                    {deleteButtons()}
                </>
            )
        } else {
            return null;
        }
    }

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

    const deleteButtons = () => {
        if(deletePrompt === true){
            return (
                <>
              <button
                type="submit"
                onClick={destroyProjectButton}
              >
                Confirm Delete
              </button>
                <button
                onClick={() => setDeletePrompt(false)}
              >
                Cancel Delete
              </button>
                </>

            )
        }
        else{
            return (
                <>
                  <button onClick={() => setDeletePrompt(true)}>Delete</button>
                </>
              );
        }
    }



    return(
        <>
            <div className="Project-Container">
                <div className="Project-Detail-div">
                    <h1>{project?.title}</h1>
                    <p>{project?.description}</p>
                </div>
                <div className="Project-Image-Container">
                    <img className="Project-Image" src={`${project?.image}`} />
                </div>
                <div>
                    {showEditDeleteButtons()}
                </div>
            </div>

        </>

    );
};

export default ProjectForm;
