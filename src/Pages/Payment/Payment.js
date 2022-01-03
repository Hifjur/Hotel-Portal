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
    fetch(`https://serene-lake-86965.herokuapp.com/bookings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBookings(data);
      });
  }, [id]);
  return (
    <div
      style={{
        paddingTop: "120px",
        paddingBottom: "120px",
        backgroundColor: "#1D2440",
        color: "white",
        borderRadius: 20,
      }}
    >
      <img
        style={{ border: "6px solid white", borderRadius: 20 }}
        src={bookings.img}
        alt=""
      />
      <h1>{bookings.hotelName} </h1>
      <h2>Rent ${bookings.rent}</h2>

      {bookings.rent && (
        <Elements stripe={stripePromise}>
          <CheckoutForm bookings={bookings}></CheckoutForm>
        </Elements>
      )}
      <p style={{ color: "gray", fontSize: 20 }}>
        Test Card Number for Demo only 4242424242424242
      </p>
    </div>
  );
};

export default Payment;
