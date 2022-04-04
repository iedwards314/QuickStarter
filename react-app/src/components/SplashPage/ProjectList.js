import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getProjects } from "../../store/project";

const ProjectsList = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state)
    const projects = useSelector((state) => state.project.projects);
    let projectsArr = [];

    useEffect(() => {
      dispatch(getProjects());
    }, [dispatch]);

    console.log('STATE',projects)

    const projectListMap = () => {
            console.log('LABEL FOR IAN', Object.values(projects))
          if (projects !== undefined) {
            projectsArr = Object.values(projects);
            return (
              <ul>
                {projectsArr?.map((project) => (
                  <li class="project-name" key={project?.id}>
                    <NavLink className="addButton" exact to={`/projects/${project?.id}`}>
                      {`Project ID:(${project?.id}) Project Description:(${project?.description})`}
                    </NavLink>
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
