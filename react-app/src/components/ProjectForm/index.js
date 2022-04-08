import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addProject } from "../../store/project";
import './ProjectForm.css';

function ProjectForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session?.user.id)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(0);
  const [end_date, set_end_date] = useState('1800-05-01')
  const [image, setImage] = useState('https://drive.google.com/uc?id=1FU5VA1G8mJoY8q7NSuBwYZpV-1UOHLv3')
  const [category_id, set_category_id] = useState(1)
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length) return alert('Error Submitting.')
    const payload = {
      title,
      description,
      goal,
      end_date,
      image,
      user_id,
      category_id
    };
    let createdProject
    try {
      createdProject = await dispatch(addProject(payload));
    } catch (error) {
      console.log("There is an error")
    }
    if (createdProject) {
      console.log(createdProject);
      setHasSubmitted(false);
      history.push(`/projects/${createdProject.id}`)
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
              className="create-form-input"
              type="text"
              name="title"
              placeholder="Enter a nice title for your project"
              value={title}
              onChange={updateTitle}
            />
          </div>
        </div>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="goal">Funding Goal: </label>
          <div className="money">
            <p className="money-ptag">$</p>
            <input
              className="create-form-input"
              type="number"
              name="goal"
              placeholder="Goal"
              required
              value={goal}
              onChange={updateGoal}
            />
          </div>
        </div>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="enddate">End Date: </label>
          <div>
            <input
              className="create-form-calendar"
              type="date"
              name="enddate"
              placeholder="Estimated Completion Date"
              required
              value={end_date}
              onChange={updateEndDate}
            />
          </div>
        </div>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="img">Image URL: </label>
          <div>
            <input
              className="create-form-input"
              type="text"
              name="img"
              placeholder="Image URL"
              value={image}
              onChange={updateImage}
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
        <button className="create-new-project-button" type="submit">Create new Project</button>
      </form>
    </section>
  );
};

export default ProjectForm;
