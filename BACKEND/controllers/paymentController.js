export const updatePaymentStatus = async (req, res) => {
  const { email, status } = req.body;
  try {
    const payment = await PaymentModel.findOneAndUpdate(
      { email },
      { status },
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }
    res.status(200).json({ success: true, payment });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};