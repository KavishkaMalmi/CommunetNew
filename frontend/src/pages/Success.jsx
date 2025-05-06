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
    </div>
  );
};

export default Success;
