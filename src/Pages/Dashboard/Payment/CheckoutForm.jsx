import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handlePaymentSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        try{
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card
            });
    
            if(error) {
                console.error('Error from payment method:', error);
            } else{
                console.log('Payment method', paymentMethod);
            }

        } catch(err) {
            console.error(err);
        }

        const form = new FormData();
        // const 
    };
    return (
        <form onSubmit={handlePaymentSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4'
                            },
                        },
                        invalid: {
                            color: '#9e2146'
                        }
                    }
                }}
            ></CardElement>
            <input type="submit" value={'Submit'} disabled={!stripe} className="btn btn-sm btn-info btn-outline hover:text-white" />
        </form>
    );
};

export default CheckoutForm;