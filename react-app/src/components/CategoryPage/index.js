import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategories } from "../../store/category";
import { getCategory } from "../../store/project";
import CampaignCard from "../CampaignCard";
import "./CategoryPage.css";

const CategoryPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const projects = useSelector((state) => state.project.category);
    const { id } = useParams();

    let projectsArr = [];
    let categoryInfo;
    if (categories) {
      categoryInfo = categories[id]
    }
    let countArr = Object.values(projects);

    useEffect(() => {
      dispatch(getCategories())
      dispatch(getCategory(id));
    }, [dispatch, id]);

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
            //   <NavLink className="project-title" exact to={`/projects/${project?.id}`}>
            //     <h3>{project?.title}</h3>
            //   </NavLink>
            //   <NavLink className="project-description" exact to={`/projects/${project?.id}`}>
            //     {project?.description}
            //   </NavLink>
            // </div>
          ))}
        </>
      );
    }
  };

  return (
        <div className='category-container-div'>
            <div className='category-img-container'>
                <img src={`${categoryInfo?.image}`} alt={`${categoryInfo?.category}`}></img>
            </div>
            <div className="category-title-div">
                <h2>{categoryInfo?.category}</h2>
            </div>
            <div className='div-line-one'>
            </div>
            <div className='div-line-grey'>
            </div>
            <div className='div-line-two'>
            </div>
            <div className='project-number'><h1>{`Explore ${countArr.length} Project(s)`}</h1></div>
            <div className="projects-container-div">
                {projectListMap()}
      </div>
    </div>
  )
}

export default CategoryPage;
