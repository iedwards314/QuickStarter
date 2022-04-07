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
  let endDate = project?.end_date

  let theDate = SetDate(endDate)
  const [title, setTitle] = useState(`${project.title}`);
  const [description, setDescription] = useState(`${project.description}`);
  const [goal, setGoal] = useState(`${project.goal}`);
  const [end_date, set_end_date] = useState(theDate)
  const [image, setImage] = useState(`${project.image}`)
  const [category_id, set_category_id] = useState(`${project.category_id}`)


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
      history.push('/')
    }
  };

  return (
    <section className="new-form-holder centered middled">
      <form className="create-project-form" onSubmit={handleSubmit}>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="title">Title: </label>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Enter a nice title for your project"
              required
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
              required
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
              required
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
            <select className="create-form-input" name="ctgy" onChange={updateCategory}>
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
