import { loadStripe} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";

// TODO: add a publishable key
const stripePromis = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
const Payment = () => {
    return (
        <div>
            <SectionTitle heading={'Payment'} subHeading={'Please pay to eat'} />

            <Elements stripe={stripePromis}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Payment;