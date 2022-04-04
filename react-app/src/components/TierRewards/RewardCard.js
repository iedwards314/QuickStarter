const RewardCard = ({reward}) => {

    return (
        <>
            <label className='reward-card'>
                <div className='reward-card'>
                    <input type="radio" name="reward"></input>
                    <div style={{ display: "inline-block" }}>
                        <p>{reward.cost}</p>
                        <p>{reward.title}</p>
                        <p>{reward.description}</p>
                    </div>
                    <div>
                        <input type="number"></input>
                        <div style={{ cursor: "pointer" }}>Continue</div>
                        {/* Add onclick for continue div to render payment page */}
                    </div>
                </div>
            </label>
        </>
    )
};

export default RewardCard;
