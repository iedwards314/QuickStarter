import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReward } from "../../store/rewards";
import { getProject } from "../../store/project";
import { editReward } from "../../store/rewards";
import './style/tierform.css'


const TierRewardForm = ({ projectId, editForm, reward }) => {
    const [title, setTitle] = useState(reward ? reward.title : "");
    const [description, setDescription] = useState(reward ? reward.description : "");
    const [cost, setCost] = useState(reward ? reward.cost : "");
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
        if (!title) errors.push("Please enter a value for title.")
        if (description) {
            if (description.length === 0) errors.push("Please enter a value for description.")
        }
        if (!description) errors.push("Please enter a value for description.")
        if (cost) {
            if (cost <= 0) errors.push("Please enter an amount greater than 0.")
            if (cost % 1 !== 0) errors.push('Amount must be an integer.')
        }
        if (!cost) errors.push('Please enter a value for amount.')
        setErrors(errors);
    }, [title, description, cost]);

    const handleSubmit = () => {
        setHasSubmitted(true);
        if (errors.length) return
        if (editForm) {
            const editedReward = {
                id: reward.id,
                project_id: projectId,
                title,
                description,
                cost
            };
            dispatch(editReward(editedReward));
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
                    <div className="form-money-container">
                        <p className="formg-dollar-sign" style={{ margin: "0px" }}>$</p>
                        <input
                            type="number"
                            defaultValue={reward ? reward.cost : ""}
                            onChange={(e) => setCost(e.target.value)}
                            placeholder="Amount"
                            className="form-amount-inputbox"
                        />
                    </div>
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
                {hasSubmitted && errors?.map((error) => (
                    <p>{error}</p>
                ))}
        </div>
    )
};

export default TierRewardForm;
