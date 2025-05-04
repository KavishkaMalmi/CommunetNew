import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const DustReport = () => {
  const location = useLocation();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [paymentSearch, setPaymentSearch] = useState("");
  const [memberSearch, setMemberSearch] = useState("");

  // Get email and status from navigation state
  const { email: updatedEmail, status: updatedStatus } = location.state || {};

  // Fetch payment details
  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/payments/all");
      setPayments(response.data);
      setFilteredPayments(response.data); // Initialize filtered payments
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
        setFilteredMembers(response.data.AllMembers); // Initialize filtered members
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

  // Filter payments based on search input
  const handlePaymentSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setPaymentSearch(value);
    setFilteredPayments(
      payments.filter(
        (payment) =>
          payment.name.toLowerCase().includes(value) ||
          payment.email.toLowerCase().includes(value) ||
          payment.planId.toLowerCase().includes(value)
      )
    );
  };

  // Filter members based on search input
  const handleMemberSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setMemberSearch(value);
    setFilteredMembers(
      members.filter(
        (member) =>
          member.name.toLowerCase().includes(value) ||
          member.email.toLowerCase().includes(value) ||
          member.houseNO.toLowerCase().includes(value)
      )
    );
  };

  // Generate PDF for Payment Details
  const generatePaymentPDF = () => {
    const doc = new jsPDF();
    let startY = 30;

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Details Report", 14, 20);

    // Table Headers
    const headers = ["Name", "Email", "Plan", "Amount", "Date"];
    const columnWidths = [50, 70, 40, 30, 40]; // Define column widths
    let currentX = 14;

    // Draw Header Background
    doc.setFillColor(200, 200, 200); // Light gray background
    doc.rect(14, startY - 10, 190, 10, "F"); // Header background rectangle

    // Draw Headers
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    headers.forEach((header, index) => {
      doc.text(header, currentX, startY);
      currentX += columnWidths[index];
    });

    // Table Rows
    doc.setFont("helvetica", "normal");
    startY += 10; // Move to the next row
    filteredPayments.forEach((payment) => {
      if (startY > 280) { // Check if the row exceeds the page height
        doc.addPage();
        startY = 30; // Reset startY for the new page

        // Redraw Headers on New Page
        currentX = 14;
        doc.setFillColor(200, 200, 200);
        doc.rect(14, startY - 10, 190, 10, "F");
        headers.forEach((header, index) => {
          doc.text(header, currentX, startY);
          currentX += columnWidths[index];
        });
        startY += 10; // Move to the next row
      }

      // Draw Row Data
      currentX = 14;
      doc.text(payment.name || "", currentX, startY); // Name column
      currentX += columnWidths[0];
      doc.text(payment.email || "", currentX, startY); // Email column
      currentX += columnWidths[1];
      doc.text(payment.planId || "", currentX, startY); // Plan column
      currentX += columnWidths[2];
      doc.text(`Rs.${payment.amount}` || "", currentX, startY); // Amount column
      currentX += columnWidths[3];
      doc.text(new Date(payment.date).toLocaleDateString() || "", currentX, startY); // Date column
      startY += 10; // Move to the next row
    });

    // Save PDF
    doc.save("Payment_Details_Report.pdf");
  };

  // Generate PDF for Not Paid Members
  const generateMemberPDF = () => {
    const doc = new jsPDF();
    let startY = 30;

    // Filter only "Not Paid" members
    const notPaidMembers = filteredMembers.filter(
      (member) => getPaymentStatus(member.email) === "Not Paid"
    );

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Not Paid Members Report", 14, 20);

    // Table Headers
    const headers = ["Name", "Email", "House No", "Payment Status"];
    const columnWidths = [50, 70, 40, 40]; // Define column widths
    let currentX = 14;

    // Draw Header Background
    doc.setFillColor(200, 200, 200); // Light gray background
    doc.rect(14, startY - 10, 190, 10, "F"); // Header background rectangle

    // Draw Headers
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    headers.forEach((header, index) => {
      doc.text(header, currentX, startY);
      currentX += columnWidths[index];
    });

    // Table Rows
    doc.setFont("helvetica", "normal");
    startY += 10; // Move to the next row
    notPaidMembers.forEach((member) => {
      if (startY > 280) { // Check if the row exceeds the page height
        doc.addPage();
        startY = 30; // Reset startY for the new page

        // Redraw Headers on New Page
        currentX = 14;
        doc.setFillColor(200, 200, 200);
        doc.rect(14, startY - 10, 190, 10, "F");
        headers.forEach((header, index) => {
          doc.text(header, currentX, startY);
          currentX += columnWidths[index];
        });
        startY += 10; // Move to the next row
      }

      // Draw Row Data
      currentX = 14;
      doc.text(member.name || "", currentX, startY); // Name column
      currentX += columnWidths[0];
      doc.text(member.email || "", currentX, startY); // Email column
      currentX += columnWidths[1];
      doc.text(member.houseNO || "", currentX, startY); // House No column
      currentX += columnWidths[2];
      doc.text("Not Paid", currentX, startY); // Payment Status column
      startY += 10; // Move to the next row
    });

    // Save PDF
    doc.save("Not_Paid_Members_Report.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 py-10">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Dust Report</h1>

      {/* Payment Details Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-11/12 max-w-6xl mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Details</h2>
        <input
          type="text"
          placeholder="Search Payments..."
          value={paymentSearch}
          onChange={handlePaymentSearch}
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={generatePaymentPDF}
          className="mb-4 px-6 py-2 bg-sky-950 text-white rounded-md hover:bg-blue-500"
        >
          Download Payment Report
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">Name</th>
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">Email</th>
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">Plan</th>
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">Amount</th>
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment._id} className="even:bg-gray-50">
                <td className="border px-4 py-2 text-gray-700">{payment.name}</td>
                <td className="border px-4 py-2 text-gray-700">{payment.email}</td>
                <td className="border px-4 py-2 text-gray-700">{payment.planId}</td>
                <td className="border px-4 py-2 text-gray-700">Rs.{payment.amount}</td>
                <td className="border px-4 py-2 text-gray-700">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Members Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-11/12 max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">All Members</h2>
        <input
          type="text"
          placeholder="Search Members..."
          value={memberSearch}
          onChange={handleMemberSearch}
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={generateMemberPDF}
          className="mb-4 px-6 py-2 bg-sky-950 text-white rounded-md hover:bg-blue-500"
        >
          Download Members Report
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">Name</th>
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">Email</th>
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">House No</th>
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">Phone</th>
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">Gender</th>
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">NIC</th>
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">Member Type</th>
              <th className="border px-4 py-2 text-left text-gray-600 font-medium">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr key={member._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="border px-4 py-2 text-gray-700">{member.name}</td>
                <td className="border px-4 py-2 text-gray-700">{member.email}</td>
                <td className="border px-4 py-2 text-gray-700">{member.houseNO}</td>
                <td className="border px-4 py-2 text-gray-700">{member.phoneNumber}</td>
                <td className="border px-4 py-2 text-gray-700">{member.gender}</td>
                <td className="border px-4 py-2 text-gray-700">{member.NIC}</td>
                <td className="border px-4 py-2 text-gray-700">{member.memberType}</td>
                <td
                  className={`border px-4 py-2 font-semibold ${
                    getPaymentStatus(member.email) === "Paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {getPaymentStatus(member.email)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DustReport;