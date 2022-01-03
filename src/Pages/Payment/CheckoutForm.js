import { Button, CircularProgress, Container } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

const CheckoutForm = ({ bookings }) => {
  const { rent, customerName, _id } = bookings;
  const { user } = useAuth();

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("https://serene-lake-86965.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ rent }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [rent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setSuccess("");
      setError(error.message);
    } else {
      setError("");
      console.log(paymentMethod);
    }
    //payment intent
    const { paymentIntent, error: intenetError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: customerName,
            email: user.email,
          },
        },
      });
    if (intenetError) {
      setError(intenetError.message);
      setSuccess("");
    } else {
      setError("");
      setSuccess("Your payment has been successful");
      console.log(paymentIntent);
      setProcessing(false);
      //save to db
      const payment = {
        amount: paymentIntent.amount,
        transaction: paymentIntent.client_secret.slice("_secret")[0],
        created: paymentIntent.created,
        last4: paymentMethod.card.last4,
      };
      const url = `https://serene-lake-86965.herokuapp.com/bookings/${_id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "white",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {processing ? (
          <CircularProgress />
        ) : (
          <Button
            type="submit"
            disabled={!stripe || success}
            sx={{ backgroundColor: "#F27D42", m: 1 }}
            variant="contained"
          >
            Pay ${rent}
          </Button>
        )}
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </Container>
  );
};

export default CheckoutForm;
