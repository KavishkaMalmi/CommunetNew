import mongoose from "mongoose";

<<<<<<< Updated upstream
const PaymentSchema = new mongoose.Schema({
=======
const paymentSchema = new mongoose.Schema({
>>>>>>> Stashed changes
  name: { type: String, required: true },
  email: { type: String, required: true },
  planId: { type: String, required: true },
  amount: { type: Number, required: true },
<<<<<<< Updated upstream
  date: { type: Date, required: true },
});

const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
=======
  date: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);
>>>>>>> Stashed changes

export default Payment;