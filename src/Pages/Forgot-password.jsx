import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import gsap from "gsap";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  // GSAP Animation
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }
  }, [step]);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  // Request OTP
  const handleSendOtp = async () => {
    if (!validateEmail(email)) {
      toast.info("please enter correct email");
      return;
    }
    if (!email) return toast.error("Email is required!");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/forgot-password",
        { email }
      );
      if (res.status == 200) {
        toast.success("OTP sent to your email!");
        setStep(2);
      } else if (res.status == 404) {
        toast.info("User Email may be not registred");
      } else {
        toast.info("Database error may be occured..try again");
      }
    } catch (error) {
      toast.info("May be you signed with Google..");
    }
    setLoading(false);
  };

  // Verify OTP & Reset Password
  const handleResetPassword = async () => {
    if (!otp || !newPassword) return toast.error("All fields are required!");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (res.status == 200) {
        toast.success("Password reset successful!");
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
      } else if (res.status == 400) {
        toast.info("Otp expired");
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
      }
    } catch (error) {
      toast.info("May be you signed with Google..");
    }F
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mb-[200px] mt-[100px]">
      <ToastContainer
        draggable
        limit={2}
        theme="dark"
        position="bottom-right"
      />
      <h2 className="text-2xl font-bold text-center mb-4">
        {step === 1
          ? "Forgot Password"
          : step === 2
          ? "Verify OTP"
          : "Reset Password"}
      </h2>

      <div ref={formRef}>
        {step === 1 && (
          <div>
            <input
              type="email"
              className="w-full p-2 border-none outline-none  rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="w-full mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col w-full gap-2">
            <input
              type="number"
              minLength={6}
              className="w-full p-2  border-none outline-none  rounded-lg"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              className="w-full mt-4 p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              onClick={handleResetPassword}
              disabled={loading || !newPassword || !otp}
            >
              {loading ? "Resetting..." : "Verify and Reset"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
