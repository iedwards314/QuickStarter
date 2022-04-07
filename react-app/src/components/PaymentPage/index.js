import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
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
                    fontSize: "40px",
                    fontWeight: "bold",
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
                                fontSize: "21px",
                                fontWeight: "bold",
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
                            <p style={{ color: "#A8D3D1" }}>${contribution?.amount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="payment-page-form-container">
                <form className="payment-form">
                    <div>
                        <p className="form-text">Card Number</p>
                        <input
                            className="payment-form-input"
                            placeholder="1234-1234-1234-1234"
                            type="text"
                            style={{ color: "white" }}
                        />
                    </div>
                    <div>
                        <p className="form-text">Cardholder Name</p>
                        <input
                            className="payment-form-input"
                            placeholder="Cardholder name"
                            style={{ color: "white" }}
                        />
                    </div>
                    <div className="expiration-securitycode">
                        <div className="payment-form-input-half">
                            <p className="form-text">Expiration</p>
                            <input
                                className="payment-form-input-half1"
                                placeholder="MM/YY"
                                type="text"
                            />
                        </div>
                        <div className="payment-form-input-half">
                            <p style={{ marginLeft: "3%" }} className="form-text">Security Code</p>
                            <input
                                className="payment-form-input-half2"
                                placeholder="CVC"
                                type="text"
                            />
                        </div>
                    </div>
                    <div>
                        <p className="form-text">Zip/Postal code</p>
                        <input
                            className="payment-form-input"
                            placeholder="Zip/Postal code"
                            type="text"
                        />
                    </div>
                    <div
                        className="form-pledge-button"
                        style={{
                            cursor: "pointer",
                            display: "inline-block"
                        }}
                        onClick={handleSubmit}>Pledge
                    </div>
                </form>
            </div>
        </div>
    )
};

export default PaymentPage;
