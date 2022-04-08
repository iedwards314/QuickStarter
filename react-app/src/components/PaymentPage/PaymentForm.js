import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { saveInfo } from "../../store/paymentInfo";

const PaymentForm = ({contribution}) => {
    const user = useSelector((state) => state.session.user)
    const [ccNumber, setccNumber] = useState("");
    const [name, setName] = useState("");
    const [exp, setExp] = useState("");
    const [cvc, setcvc] = useState("");
    const [zip, setZip] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const history = useHistory();

    useEffect(() => {
        let errors = [];
        let ccreg = /[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}/g;
        let expreg = /[0-9]{2}\/[0-9]{2}/g;
        if (ccNumber) {
            let ccformat = ccNumber.split('-').join('');
            if (!ccformat.match(ccreg)) errors.push('Please enter valid format: 1234-1234-1234-1234.');
        }
        if (!ccNumber) errors.push('Please enter value for Card Number.');
        if (name) {
            if (name.length > 100) errors.push('Please enter value for name less than 100 characters.')
        }
        if (!name) errors.push('Please enter a value for name.')
        if (exp) {
            if (!exp.match(expreg)) errors.push('Please enter valid expiration format: MM/YY.')
        }
        if (address?.length > 100) errors.push('Address must be less than 100 characters.')
        if (!address) errors.push('Please enter a value for Address.')
        if (!exp) errors.push('Please enter a value for Expiration.')
        if (cvc) {
            if (cvc.length !== 3) errors.push('Invalid Security Code.')
        }
        if (!cvc) errors.push('Please enter a value for Security Code.')
        if (zip) {
            if (zip.length !== 5) errors.push('Zip code must be 5 digits.')
        }
        if (!zip) errors.push('Please enter a value for Zip Code.')
        setErrors(errors);
    }, [ccNumber, name, exp, cvc, zip, address])

    const handleSubmit = async () => {
        setHasSubmitted(true);
        if (errors.length) return alert("Error in submission.")
        if (window.confirm("Save payment information for later?")) {
            let payInfo = {
                card_number: ccNumber.split('-').join(''),
                address,
                name,
                area_code: zip,
                user_id: user.id
            };
            await saveInfo(payInfo)
        }

        return history.push(`/projects/${contribution.project_id}`)
    }

    return (
        <div className="payment-page-form-container">
                <form className="payment-form">
                    <div>
                        <p className="form-text">Card Number</p>
                        <input
                            onChange={(e) => setccNumber(e.target.value)}
                            className="payment-form-input"
                            placeholder="1234-1234-1234-1234"
                            type="text"
                            style={{ color: "white" }}
                        />
                    </div>
                    <div>
                        <p className="form-text">Cardholder Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className="payment-form-input"
                            placeholder="Cardholder name"
                            style={{ color: "white" }}
                        />
                    </div>
                    <div>
                        <p className="form-text">Address</p>
                        <input
                            onChange={(e) => setAddress(e.target.value)}
                            className="payment-form-input"
                            placeholder="Cardholder name"
                            style={{ color: "white" }}
                        />
                    </div>
                    <div className="expiration-securitycode">
                        <div className="payment-form-input-half1">
                            <p className="form-text">Expiration</p>
                            <input
                                onChange={(e) => setExp(e.target.value)}
                                style={{padding: "12px", backgroundColor: "#2b2b2b", border: "none"}}
                                className="payment-form-input-half1"
                                placeholder="MM/YY"
                                type="text"
                            />
                        </div>
                        <div className="payment-form-input-half1">
                            <p style={{marginLeft: "3%"}}className="form-text">Security Code</p>
                            <input
                                onChange={(e) => setcvc(e.target.value)}
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
                            onChange={(e) => setZip(e.target.value)}
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
                {hasSubmitted && errors?.map((error) => (
                    <p style={{color: "red", textAlign: "center", fontWeight: "bold"}}>{error}</p>
                ))}
            </div>
    )
};

export default PaymentForm;
