import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getProjects } from "../../store/project";
import "./style/project-list.css"

const ProjectsList = ({search}) => {
    const dispatch = useDispatch();
    // eslint-disable-next-line
    const state = useSelector((state) => state)
    const projects = useSelector((state) => state.project.projects);
    let projectsArr = [];

    useEffect(() => {
      if (!search) dispatch(getProjects());
    }, [dispatch, search]);

    console.log('STATE',projects)

    const projectListMap = () => {

          if (projects !== undefined) {
            projectsArr = Object.values(projects);
            return (
              <>
                {projectsArr?.map((project) => (
                  <div className="project-div" key={project?.id}>
                    <img className="project-image" src={project?.image} alt="project" />
                    <NavLink className="project-title" exact to={`/projects/${project?.id}`}>
                      <h3>{project?.title}</h3>
                    </NavLink>
                    <NavLink className="project-description" exact to={`/projects/${project?.id}`}>
                      {project?.description}
                    </NavLink>
                  </div>
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
