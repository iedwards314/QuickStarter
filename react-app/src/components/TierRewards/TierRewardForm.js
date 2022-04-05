import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReward } from "../../store/rewards";
import { getProject } from "../../store/project";
import { editReward } from "../../store/rewards";
import './style/tierform.css'


const TierRewardForm = ({ projectId, editForm, reward }) => {
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

        if (editForm) {
            const editedReward = {
                id: reward.id,
                project_id: projectId,
                title,
                description,
                cost
            };
            console.log(editedReward);
            dispatch(editReward(editedReward));
            dispatch(getProject(projectId));
            return
        }

           const newReward = {
               project_id: projectId,
               title,
               description,
               cost
           };
           dispatch(addReward(newReward));
           dispatch(getProject(projectId));

    }

    return (
        <div className="reward-form-container">
            <div>
                <p className="form-ptag">Reward Title</p>
                <input
                    type="text"
                    defaultValue={reward ? reward.title : ""}
                    placeholder="Reward Title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-title-inputbox"
                />
            </div>
            <div>
                <p className="form-ptag">Description</p>
                <textarea
                    placeholder="Description"
                    defaultValue={reward ? reward.description : ""}
                    rows={10}
                    columns={10}
                    style={{ resize: "None" }}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-desc-inputbox"
                />
            </div>
            <div>
                <p className="form-ptag">Amount</p>
                <input
                    type="number"
                    defaultValue={reward ? reward.cost : ""}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="Amount"
                    className="form-amount-inputbox"
                />
            </div>
            <div
                className="reward-form-submit"
                onClick={handleSubmit}
                style={{
                    cursor: "pointer",
                    display: "inline-block"
                }}>
                <p>Submit</p>
            </div>
            {errors?.map((error) => (
                <p>{error}</p>
            ))}
        </div>
    )
};

export default TierRewardForm;
