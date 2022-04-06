import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"
import { loadContribution } from "../../store/contributions";
import './style/payment-page.css';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { contributionId } = useParams();
    const contribution = useSelector(state => state.contributions[contributionId])
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(loadContribution(contributionId))
    }, [dispatch, contributionId])

    const handleSubmit = () => {
        history.push(`/projects/${contribution.project_id}`)
    }


    return (
        <div className="payment-page-container">
            <div className="payment-page-image-project-container">
                <p style={{
                    fontSize: "40px"
                    , fontWeight: "bold",
                    margin: "50px 50px 15px 50px"
                }}>Pledge Summary</p>
                <p style={{
                    margin: "0px 50px 20px 50px",
                    fontSize: "18px"
                }}>We won't charge you at this time. If the project reaches its funding goal, your payment method will be charged when the campaign ends. You'll receive a confirmation ends. You'll recieve a confirmation email at {user?.email} when your pledge is successfully processed. </p>
                <div className="payment-page-image-contribution">
                    <img
                        className="payment-page-image"
                        src={contribution?.project_image} alt=''></img>
                    <div className="payment-page-contribution-text">
                        <p style={{ margin: "0px" }}>{contribution?.project_title}</p>
                        <p style={{ margin: "0px" }}>by {contribution?.project_username}</p>
                        {/* make the p tags into links */}
                    </div>
                </div>
                <div>
                    <div>
                        <p
                            style={{
                                fontSize: "21px"
                                , fontWeight: "bold",
                                margin: "30px 50px 15px 50px"
                            }}>Your Pledge</p>
                    </div>
                    <div>
                        <div className="payment-page-reward-title">
                            <p >Reward</p>
                            <p >{contribution?.reward_title}</p>
                            <p >${contribution?.reward_cost}</p>
                        </div>
                        <div className="payment-page-bonus">
                            <p>Bonus</p>
                            <p >${contribution?.amount - contribution?.reward_cost}</p>
                        </div>
                        <div className="payment-page-total">
                            <p>Total amount</p>
                            <p style={{color: "#A8D3D1"}}>${contribution?.amount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="payment-page-form-container">
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
