import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const ProjectsList = () => {
  const projects = useSelector((state) => state.projects);
  const projectsArr = [];
  const projectListMap = () => {
      console.log(projects)
    if (projects !== undefined) {
      projectsArr = Object.values(projects);
      return (
        <ul>
          {projectsArr?.map((project) => (
            <li class="project-name" key={project?.id}>
              {project?.name}
            </li>
          ))}
        </ul>
      );
    }
  };
  return (
    <>
      <h2>Project List</h2>
      <div class="project-list-container">
          {projectListMap()}
      </div>
    </>
  );
};

export default ProjectsList;
