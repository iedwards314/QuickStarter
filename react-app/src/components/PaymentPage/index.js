import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"
import { loadContribution } from "../../store/contributions";
import PaymentForm from "./PaymentForm";
import './style/payment-page.css';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const { contributionId } = useParams();
    const contribution = useSelector(state => state.contributions[contributionId])
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(loadContribution(contributionId))
    }, [dispatch, contributionId])

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
                            <p >{contribution?.reward_title ? contribution?.reward_title : "No Reward"}</p>
                            <p >${contribution?.reward_cost ? contribution?.reward_cost : 0}</p>
                        </div>
                        <div className="payment-page-bonus">
                            <p>Bonus</p>
                            <p >${contribution?.amount - (contribution?.reward_cost ? contribution?.reward_cost : 0)}</p>
                        </div>
                        <div className="payment-page-total">
                            <p>Total amount</p>
                            <p style={{color: "#A8D3D1"}}>${contribution?.amount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <PaymentForm contribution={contribution} />
        </div>
    )
};

export default PaymentPage;
