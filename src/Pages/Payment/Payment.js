import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Jx5DqJ8BbjJfr4C3I3MZcKJ6w8ahM4uSsZBCJgOivywGZqcDrayV4LsfZoGvy9womiNLKFhj0vN9lYyfqYecNu300vgw93X9a"
);

const Payment = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/bookings/${id}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [id]);
  return (
    <div>
      <h2>Pay for: {bookings.hotelName} </h2>
      <h2>Pay: ${bookings.rent} </h2>
      {bookings.rent && (
        <Elements stripe={stripePromise}>
          <CheckoutForm bookings={bookings}></CheckoutForm>
        </Elements>
      )}
    </div>
  );
};

export default Payment;
