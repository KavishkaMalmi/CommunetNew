<<<<<<< Updated upstream
import React from "react";
import axios from "axios";

const Success = ({ email }) => {
  React.useEffect(() => {
    // Simulate updating the payment status
    const updatePaymentStatus = async () => {
      try {
        // Make an API call to update the payment status
        await axios.post("http://localhost:5000/api/payments/update-status", {
          email,
          status: "Paid",
        });
        console.log(`Payment status updated for email: ${email}`);
      } catch (error) {
        console.error("Error updating payment status:", error);
      }
    };

    updatePaymentStatus();
  }, [email]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your payment. Your payment status has been updated.
      </p>
      <button
        onClick={() => window.location.href = "/"} // Redirect to Home
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-sky-950 transition"
      >
        Go to Home
      </button>
=======
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || {};
  const userEmail = location.state?.userDetails?.email || "default@example.com"; // Retrieve user's email

  useEffect(() => {
    const sendEmail = async () => {
      try {
        await axios.post("http://localhost:5000/api/send-email", {
          email: userEmail, // Ensure this is defined
          planId: plan.id,
        });
        console.log("Email sent successfully!");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };

    sendEmail();
  }, [plan, userEmail]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-green-600">
          Payment Successful!
        </h2>
        <p className="mt-4">
          You have successfully purchased the <strong>{plan.id}</strong> plan.
        </p>
        <p className="text-gray-600">Thank you for your purchase.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-gray-800 text-white px-6 py-2 rounded-md"
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate("/dust-report")}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          View Dust Report
        </button>
      </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default Success;
