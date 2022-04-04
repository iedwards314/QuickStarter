import { useState } from "react";

const TierRewardForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const handleSubmit = () => {

    }

    return (
        <div className="reward-form-container">
            <p>Reward Title</p>
            <input
                type="text"
                placeholder="Reward Title"
            />
            <p>Description</p>
            <textarea
                placeholder="Description"
                rows={10}
                columns={10}
                style={{resize: "None"}}
            />
            <p>Amount</p>
            <input
                type="number"
            />
            <div
                className="reward-form-submit"
                onClick={handleSubmit}
                style={{backgroundColor: "red",
                        cursor: "pointer",
                        display: "inline-block"}}>
                <p>Submit</p>
            </div>
        </div>
    )
};

export default TierRewardForm;
