import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addUpdate } from "../../store/update";
import './ProjectForm.css';

function UpdateForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session?.user.id)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(0);
  const [end_date, set_end_date] = useState('1800-05-01')
  const [image, setImage] = useState('https://drive.google.com/uc?id=1FU5VA1G8mJoY8q7NSuBwYZpV-1UOHLv3')
  const [category_id, set_category_id] = useState(1)


  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateGoal = (e) => setGoal(e.target.value);
  const updateEndDate = (e) => set_end_date(e.target.value);
  const updateImage = (e) => setImage(e.target.value);
  const updateCategory = (e) => set_category_id(e.target.value);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        title,
        update,
        image_url,
        project_id,
        created_at
    };
    let createdUpdate
    try {
      createdUpdate = await dispatch(addUpdate(payload));
    } catch (error) {
      console.log("There is an error")
    }
    if (createdUpdate) {
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
              className="create-form-input"
              type="text"
              name="title"
              placeholder="Enter a nice title for your project"
              required
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

export default UpdateForm;
