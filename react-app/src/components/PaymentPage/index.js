import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"
import { loadContribution } from "../../store/contributions";


const PaymentPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { contributionId } = useParams();
    const contribution = useSelector(state => state.contributions[contributionId])

    useEffect(() => {
        dispatch(loadContribution(contributionId))
    }, [dispatch, contributionId])

    const handleSubmit = () => {
        history.push(`/projects/${contribution.project_id}`)
    }


    return (
        <div>
            <p>Pledge Summary</p>
            <p>We won't charge you at this time. If the project reaches its funding goal, your payment method will be charged when the campaign ends. You'll recieve a confirmation ends. You'll recieve a confirmation email at "USEREMAIL" when your pledge is successfully processed. </p>
            <div>
                <div>
                    <img src={contribution?.project_image} alt=''></img>
                </div>
                <div>
                    <p>{contribution?.project_title}</p>
                    <p>by {contribution?.project_username}</p>
                    {/* make the p tags into links */}
                </div>
            </div>
            <div>
                <p>Your Pledge</p>
                <div>
                    <p>Reward</p>
                    <p>{contribution?.reward_title}</p>
                    <p>Bonus</p>
                    <p>${contribution?.amount - contribution?.reward_cost}</p>
                    <p>Total amount</p>
                    <p>${contribution?.amount}</p>
                </div>
            </div>
            <div>
                <form>
                    <div>
                        <p className="">Card Number</p>
                        <input
                            className=""
                            placeholder="1234-1234-1234-1234"
                            type="text"
                            style={{ color: "black" }}
                        />
                    </div>
                    <div>
                        <p className="">Cardholder Name</p>
                        <input
                            className=""
                            placeholder="Cardholder name"
                            style={{ color: "black" }}
                        />
                    </div>
                    <div>
                        <p className="">Expiration</p>
                        <input
                            className=""
                            placeholder="MM/YY"
                            type="text"
                        />
                    </div>
                    <div>
                        <p className="">Security Code</p>
                        <input
                            className=""
                            placeholder="CVC"
                            type="text"
                        />
                    </div>
                    <div>
                        <p className="">Zip/Postal code</p>
                        <input
                            className=""
                            placeholder="Zip/Postal code"
                            type="text"
                        />
                    </div>
                    <div
                        className=""
                        style={{
                            cursor: "pointer",
                            display: "inline-block"
                        }}
                        onClick={handleSubmit}>
                        <p>Pledge</p>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default PaymentPage;
