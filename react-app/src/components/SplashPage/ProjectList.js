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
