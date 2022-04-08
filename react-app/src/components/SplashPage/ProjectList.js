import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../../store/project";
import { getCategories } from "../../store/category";
import CampaignCard from "../CampaignCard";
import "./style/project-list.css"

const ProjectsList = ({search}) => {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.project.projects);
    let projectsArr = [];

    useEffect(() => {
      if (!search) dispatch(getProjects());
    }, [dispatch, search]);

    useEffect(() => {
        dispatch(getCategories());
    },[dispatch])

  const projectListMap = () => {
    if (projects !== undefined) {
      projectsArr = Object.values(projects);
      return (
        <>
          {projectsArr?.map((project) => (
            <CampaignCard project={project ? project : null} />
            // <div className="project-div" key={project?.id}>
            //   <NavLink className="project-image-container" exact to={`/projects/${project?.id}`}>
            //     <img className="project-image" src={project?.image} alt="project" />
            //   </NavLink>
            //   <NavLink  className="project-title"exact to={`/projects/${project?.id}`}>
            //     <h3 style={{color: "white", margin: "10px 0px 0px 0px"}}>{project?.title}</h3>
            //   </NavLink>
            //   <NavLink className="project-description" exact to={`/projects/${project?.id}`}>
            //     {project?.description}
            //   </NavLink>
            //   <div style={{marginLeft: "20px", marginTop: "20px"}}>
            //     {Math.floor((project?.completion / project?.goal) * 100) > 0 ?
            //     <ProgressBar bgcolor={"#44fff0"} completed={Math.floor((project?.completion / project?.goal) * 100)} /> :
            //     <p style={{margin: "0px"}}>Be the first to contribute</p>}
            //     <p style={{margin: "10px 0px 0px 0px", color: "#44fff0"}}>{Math.floor((project?.completion / project?.goal) * 100)}% to goal</p>
            //   </div>
            // </div>
          ))}
        </>
      );
    }
  };

  return (
    <>
      <div className="project-list-container">
        {projectListMap()}
      </div>
    </>
  );
};

export default ProjectsList;
