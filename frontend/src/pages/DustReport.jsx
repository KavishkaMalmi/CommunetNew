import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DustReport = () => {
  const location = useLocation();
  const [payments, setPayments] = useState([]);
  const [members, setMembers] = useState([]); // State to store all members

  // Get email and status from navigation state
  const { email: updatedEmail, status: updatedStatus } = location.state || {};

  // Fetch payment details
  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/payments/all");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Fetch all members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/member/members");
        setMembers(response.data.AllMembers); // Assuming the API returns { success: true, AllMembers: [...] }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  // Function to check payment status for a member
  const getPaymentStatus = (memberEmail) => {
    if (memberEmail === updatedEmail) {
      return updatedStatus; // Use updated status if email matches
    }
    const payment = payments.find((payment) => payment.email === memberEmail);
    return payment ? "Paid" : "Not Paid";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dust Report</h1>

      {/* Payment Details Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mb-8">
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Plan</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className="border px-4 py-2">{payment.name}</td>
                <td className="border px-4 py-2">{payment.email}</td>
                <td className="border px-4 py-2">{payment.planId}</td>
                <td className="border px-4 py-2">Rs.{payment.amount}</td>
                <td className="border px-4 py-2">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Members Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">All Members</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">House No</th>
              <th className="border px-4 py-2">Phone Number</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">NIC</th>
              <th className="border px-4 py-2">Member Type</th>
              <th className="border px-4 py-2">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td className="border px-4 py-2">{member.name}</td>
                <td className="border px-4 py-2">{member.email}</td>
                <td className="border px-4 py-2">{member.houseNO}</td>
                <td className="border px-4 py-2">{member.phoneNumber}</td>
                <td className="border px-4 py-2">{member.gender}</td>
                <td className="border px-4 py-2">{member.NIC}</td>
                <td className="border px-4 py-2">{member.memberType}</td>
                <td className="border px-4 py-2">{getPaymentStatus(member.email)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DustReport;