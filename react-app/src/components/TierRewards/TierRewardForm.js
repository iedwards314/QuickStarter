import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReward } from "../../store/rewards";
import { getProject } from "../../store/project";

const TierRewardForm = ({projectId}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");
    // eslint-disable-next-line
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        let errors = [];
        if (title) {
            if (title.length === 0) errors.push("Please enter a value for title.")
            if (title.length > 100) errors.push("Title must be less than 100 characters long.")
        }
        if (description) {
            if (description.length === 0) errors.push("Please enter a value for description.")
        }
        if (cost) {
            if (cost <= 0) errors.push("Please enter an amount greater than 0.")
        }
        setErrors(errors);
    }, [title, description, cost]);

    const handleSubmit = () => {
       setHasSubmitted(true);

           const reward = {
               project_id: projectId,
               title,
               description,
               cost
           };
           const project = { id: projectId }
           dispatch(addReward(reward));
           dispatch(getProject(project));

    }

    return (
        <div className="reward-form-container">
            <p>Reward Title</p>
            <input
                type="text"
                placeholder="Reward Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <p>Description</p>
            <textarea
                placeholder="Description"
                rows={10}
                columns={10}
                style={{resize: "None"}}
                onChange={(e) => setDescription(e.target.value)}
            />
            <p>Amount</p>
            <input
                type="number"
                onChange={(e) => setCost(e.target.value)}
            />
            <div
                className="reward-form-submit"
                onClick={handleSubmit}
                style={{backgroundColor: "red",
                        cursor: "pointer",
                        display: "inline-block"}}>
                <p>Submit</p>
            </div>
            {errors?.map((error) => (
                <p>{error}</p>
            ))}
        </div>
    )
};

export default TierRewardForm;
