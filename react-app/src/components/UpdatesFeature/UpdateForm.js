import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { addUpdate } from "../../store/updates";
import '../ProjectEditForm/ProjectEdit.css';

function UpdateForm({project}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {projectId} = useParams();
  const [title, setTitle] = useState("");
  const [update, setUpdate] = useState("");
  const [image_url, setImage] = useState("");
  const updates = useSelector((state) => state.updates);
  // const project_id = updates[1]?.project;

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setUpdate(e.target.value);
  const updateImage = (e) => setImage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        title,
        update,
        image_url,
        project_id: projectId
    };
    console.log(payload);
    let createdUpdate
    try {
      createdUpdate = await dispatch(addUpdate(payload));
    } catch (error) {
      console.log("There is an error")
    }
    if (createdUpdate) {
      history.push(`/projects/${projectId}`)
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
              placeholder="Enter a nice title for your update"
              required
              value={title}
              onChange={updateTitle}
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
              value={image_url}
              onChange={updateImage}
            />
          </div>
        </div>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="desc">Description: </label>
          <div>
            <textarea className="create-project-description"
              name="desc"
              placeholder="Write a description for your update"
              value={update}
              onChange={updateDescription}
            />
          </div>
        </div>
        <button className="create-new-project-button" type="submit">Create new Update</button>
      </form>
    </section>
  );
};

export default UpdateForm;
