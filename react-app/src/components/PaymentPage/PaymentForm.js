import { useHistory } from "react-router-dom";

const PaymentForm = ({contribution}) => {
    const history = useHistory();

    const handleSubmit = () => {
        history.push(`/projects/${contribution.project_id}`)
    }

    return (
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
                        <div className="payment-form-input-half1">
                            <p className="form-text">Expiration</p>
                            <input
                                style={{padding: "12px", backgroundColor: "#2b2b2b", border: "none"}}
                                className="payment-form-input-half1"
                                placeholder="MM/YY"
                                type="text"
                            />
                        </div>
                        <div className="payment-form-input-half1">
                            <p style={{marginLeft: "3%"}}className="form-text">Security Code</p>
                            <input
                                style={{padding: "12px"}}
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
    )
};

export default PaymentForm;
