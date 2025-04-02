import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const PaymentButtons = ({ course, sessionType }) => {
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");

    if (storedUserId) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            `https://driving.shellcode.cloud/api/users/users/${storedUserId}`
          );
          const data = await response.json();
          if (data?.user) {
            setUser(data.user);
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
          toast.error("Error fetching profile data.");
        }
      };

      fetchProfile();
    }
  }, []);

  const loadRazorpayScript = () =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });

  const initializeRazorpay = async (amount, description, paymentType) => {
    if (!user.phone_number) {
      toast.error("Please update user profile");
      return;
    }

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load Razorpay. Please try again.");
        return;
      }

      const response = await fetch(
        "https://driving.shellcode.cloud/api/payments/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            currency: "INR",
            receipt: "receipt#1",
          }),
        }
      );

      const { order, success } = await response.json();
      if (!success) {
        toast.error("Failed to create order. Please try again.");
        return;
      }

      const options = {
        key: "rzp_test_3sEAtEoClhTs62",
        amount: order.amount,
        currency: "INR",
        name: "Ahen",
        description,
        order_id: order.id,
        handler: async () => {
          try {
            const userId = localStorage.getItem("user_id");
            if (!userId) {
              toast.error("User ID not found. Please log in again.");
              return;
            }

            const purchaseResponse = await fetch(
              "https://driving.shellcode.cloud/api/purchase-course",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  user_id: userId,
                  course_id: course.courseId,
                  sessiontype: "onetoone Session",
                  paymenttype: paymentType,
                }),
              }
            );

            const purchaseSuccess = await purchaseResponse.json();
            if (purchaseSuccess) {
              toast.success("Course added successfully!");
              navigate("/courses");
            } else {
              toast.error("Failed to add course. Please try again.");
            }
          } catch (error) {
            console.error("Error during purchase:", error);
            toast.error("An unexpected error occurred during the purchase.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: `+91${user?.phone_number}`,
        },
        theme: { color: "#3399cc" },
        method: { upi: true },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (error) => {
        console.error("Payment failed:", error);
        toast.error("Payment failed. Please try again.");
      });

      razorpay.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <Toaster reverseOrder={false} />
      <div className="flex md:w-[70%] w-full justify-between text-xs md:text-sm text-center">
        {[
          {
            type: "paydaily",
            label: "Pay Everyday & Enroll",
            amount: course.dailyAmount,
            description: "Daily Enrollment",
          },
          {
            type: "payonce",
            label: "Pay Once & Enroll",
            amount: (
              course.price -
              (course.price * course.discount) / 100
            ).toFixed(2),
            description: "One-Time Enrollment",
          },
        ].map(({ type, label, amount, description }) => (
          <div key={type} className="w-[48%]">
            <button
              onClick={() => {
                setSelectedPaymentType(type);
                initializeRazorpay(amount, description, type);
              }}
              className={`w-full px-5 py-3 rounded-lg ${
                selectedPaymentType === type
                  ? "bg-black text-white"
                  : "bg-transparent text-black border border-black"
              }`}>
              <p>{label}</p>
              <p className="mt-1">₹{amount}</p>
            </button>
            <p className="mt-1">
              {type === "paydaily" ? "Charged Daily*" : "Charged Once*"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PaymentButtons;
