import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getProjectTypes, createProject } from "../../store/project";

import './ProjectForm.css';

function ProjectForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session.user.id)

  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(0);
  const [end_date, set_end_date] = useState('2000-01-01')
  const [image, setImage] = useState('')
  const [category, set_category] = useState(1)


  const updateDescription = (e) => setDescription(e.target.value);
  const updateGoal = (e) => setGoal(e.target.value);
  const updateEndDate = (e) => set_end_date(e.target.value);
  const updateImage = (e) => setImage(e.target.value);
  const updateCategory = (e) => set_category(e.target.value);



//   useEffect(() => {

//   }, [dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      description,
      goal,
      end_date,
      image,
      user_id,
      category_id
    };
    const createdProject = await dispatch(createProject(payload));
  };

  return (
    <section className="new-form-holder centered middled">
      <form className="create-project-form" onSubmit={handleSubmit}>
        <label for="desc">Enter a Description: </label>
        <input
          type="text"
          name="desc"
          placeholder="Description"
          required
          value={description}
          onChange={updateDescription}
        />
        <label for="goal">Enter a funding goal for your project: </label>
        <input
          type="number"
          name="goal"
          placeholder="Goal"
          required
          value={goal}
          onChange={updateGoal}
        />
        <label for="enddate">Enter a funding goal for your project: </label>
        <input
          type="date"
          name="enddate"
          placeholder="Estimated Completion Date"
          required
          value={end_date}
          onChange={updateEndDate}
        />
        <label for="img">Enter a Description: </label>
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={image}
          onChange={updateImage}
        />
        <label for="img">Enter a Description: </label>
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={image}
          onChange={updateImage}
        />
        <label for="ctgy">Project Category</label>
        <select name="ctgy" onChange={updateCategory}>
            <option value={() => 1}>Tech</option>
            <option value={() => 2}>Food</option>
            <option value={() => 3}>Film</option>
            <option value={() => 4}>Health</option>
            <option value={() => 5}>Music</option>
            <option value={() => 6}>Games</option>
        </select>
        <button className="create-new-project-button" type="submit">Create new Project</button>
      </form>
    </section>
  );
};

export default ProjectForm;