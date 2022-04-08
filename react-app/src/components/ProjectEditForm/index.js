import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProject, editProject } from "../../store/project";
import SetDate from "../utils/DateManagement"

import './ProjectEdit.css';

function ProjectEditForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session?.user.id);
  const { projectId } = useParams();
  const project = useSelector((state) => state.project.selected[projectId]);

  let endDate;
  let theDate;
  if (project) {
    endDate = project?.end_date
    theDate = SetDate(endDate)
  }
  if (!project) {
    history.push(`/projects/${projectId}`)
  }

  const [title, setTitle] = useState(`${project?.title}`);
  const [description, setDescription] = useState(`${project?.description}`);
  const [goal, setGoal] = useState(`${project?.goal}`);
  const [end_date, set_end_date] = useState(theDate);
  const [image, setImage] = useState(`${project?.image}`);
  const [category_id, set_category_id] = useState(project?.category_id);

  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);


  // Form Validations:
  useEffect(() => {
    let errors = [];
    if (title) {
      if (title.length === 0 || title.length > 100) errors.push('Please enter a value for title between 1 - 100 characters.')
    }
    if (!title) errors.push('Please enter a value for Title.')
    if (!description) errors.push('Please enter a description.')
    if (goal) {
      if (goal <= 0) errors.push('Goal must be greater than $0.')
      if (goal % 1 !== 0) errors.push('Amount must be an integer.')
    }
    if (end_date) {
      let currentDate = new Date()
      let formattedDate = currentDate.toISOString().split('T')[0]
      if (end_date <= formattedDate) errors.push('End Date must be in the future.')
    }
    if (image) {
      if (image.length > 255) errors.push('Image URL must be shorter than 255 characters.')
    }
    if (!image) errors.push('Please enter a URL for image.')
    setErrors(errors);
  }, [title, description, goal, end_date, image])


  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateGoal = (e) => setGoal(e.target.value);
  const updateEndDate = (e) => set_end_date(e.target.value);
  const updateImage = (e) => setImage(e.target.value);
  const updateCategory = (e) => set_category_id(e.target.value);


  useEffect(() => {
    dispatch(getProject(projectId))
  }, [dispatch, projectId]);


  const handleSubmit = async (e) => {
    let id = projectId
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length) return alert('Error in Submission')
    const payload = {
      id,
      title,
      description,
      goal,
      end_date,
      image,
      user_id,
      category_id
    };
    let editedProject
    try {
      editedProject = await dispatch(editProject(payload, projectId));
    } catch (error) {
      console.log("There is an error")
    }
    if (editedProject) {
      history.push(`/projects/${id}`)
    }
  };

  return (

    <section className="new-form-holder centered middled">
      {hasSubmitted && errors?.map((error) => (
        <p style={{color: 'red', margin:"0px"}}>{error}</p>
      ))}
      <form className="create-project-form" onSubmit={handleSubmit}>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="title">Title: </label>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Enter a nice title for your project"
              value={title}
              onChange={updateTitle}
              className="create-form-input"
            />
          </div>
        </div>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="goal">Funding Goal: </label>
          <div>
            <input
              type="number"
              name="goal"
              placeholder="Goal"
              value={goal}
              onChange={updateGoal}
              className="create-form-input"
            />
          </div>
        </div>
        <div className="create-input-container">
          <label htmlFor="enddate">End Date: </label>
          <div>
            <input
              type="date"
              name="enddate"
              placeholder="Estimated Completion Date"
              value={end_date}
              onChange={updateEndDate}
              className="create-form-input"
            />
          </div>
        </div>
        <div>
          <label className="create-form-text" htmlFor="img">Image URL: </label>
          <div>
            <input
              type="text"
              name="img"
              placeholder="Image URL"
              value={image}
              onChange={updateImage}
              className="create-form-input"
            />
          </div>
        </div>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="ctgy">Project Category</label>
          <div>
            <select className="create-form-input" name="ctgy" value={category_id} onChange={updateCategory}>
              <option value={1}>Games</option>
              <option value={2}>Music</option>
              <option value={3}>Health</option>
              <option value={4}>Film</option>
              <option value={5}>Food</option>
              <option value={6}>Tech</option>
            </select>
          </div>
        </div>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="desc">Description: </label>
          <div>
            <textarea className="create-project-description"
              name="desc"
              placeholder="Write a description for your project"
              value={description}
              onChange={updateDescription}
            />
          </div>
        </div>
        <button className="create-new-project-button" type="submit">Finalize Edit</button>
      </form >
    </section >
  );
};

export default ProjectEditForm;
