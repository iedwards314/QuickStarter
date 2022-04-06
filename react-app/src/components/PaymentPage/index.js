import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react"
import { loadContribution } from "../../store/contributions";

const PaymentPage = () => {
    const dispatch = useDispatch();
    const { contributionId } = useParams();

    useEffect(() => {
        dispatch(loadContribution(contributionId))
    }, [dispatch])

    return (
        <div>
            <p>Pledge Summary</p>
            <p>We won't charge you at this time. If the project reaches its funding goal, your payment method will be charged when the campaign ends. You'll recieve a confirmation ends. You'll recieve a confirmation email at "USEREMAIL" when your pledge is successfully processed. </p>
            <div>
                {/* img + proj name + business name */}
            </div>
            <div>
                <p>Your Pledge</p>
                
            </div>
        </div>
    )
};

export default PaymentPage;
