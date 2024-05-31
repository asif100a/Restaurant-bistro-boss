import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCarts from "../../../Hooks/useCarts";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [carts, refetch] = useCarts();
    const navigate = useNavigate();

    const price = carts.reduce((total, item) => total + item?.price, 0);

    useEffect(() => {
        if (price > 0) {
            const priceFunc = async () => {
                try {
                    const { data } = await axiosSecure.post('/create-payment-intent', { price });
                    console.log(data?.clientSecret);
                    setClientSecret(data?.clientSecret);

                } catch (error) {
                    console.error(error);
                }
            };
            priceFunc();
        }

    }, [axiosSecure, price]);

    const handlePaymentSubmit = async (event) => {
        event.preventDefault();

        setError('');
        setTransactionId('');

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card
            });

            if (error) {
                console.error('Error from payment method:', error);
                setError(error?.message);
            } else {
                console.log('Payment method', paymentMethod);
                setError('');
            }

        } catch (err) {
            console.error(err);
        }

        // Confirm payment
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        });

        if (error) {
            console.error(error);

        } else {
            console.log('PaymentIntent:', paymentIntent);
            if (paymentIntent?.status === 'succeeded') {
                console.log('transaction id:', paymentIntent?.id);

                // Now save the changes in the database
                const payment = {
                    transactionId,
                    email: user?.email,
                    price,
                    date: new Date(),
                    cartIds: carts.map(item => item._id),
                    itemIds: carts.map(item => item.foodId),
                    status: 'pending',
                };

                try {
                    const { data } = await axiosSecure.post('/payment', payment);
                    console.log(data);
                    refetch();

                } catch (error) {
                    console.error(error);
                }

                // Set the transaction id
                setTransactionId(paymentIntent?.id);

                // Show success message
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });

                // navigate user to the Payment history page
                navigate('/dashboard/payment_history');
            }
        }


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
            <input type="submit" value={'Submit'} disabled={!stripe || !clientSecret} className="btn btn-sm btn-info btn-outline hover:text-white" />
            <p className="text-red-600">{error}</p>
            {
                transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>
            }
        </form>
    );
};

export default CheckoutForm;