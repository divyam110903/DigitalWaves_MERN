import React from 'react';
import { useState } from 'react';
import {quoteStore} from '../../store/quoteStore';
import toast from 'react-hot-toast';
function Form() {

  const {ReceiveQuote ,isSending}=quoteStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message || !formData.phoneNumber) {
     alert("Please fill in all required fields.");
      return;
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(formData.firstName.trim())) {
     alert("First name must contain only letters.");
      return;
    }

    if (!nameRegex.test(formData.lastName.trim())) {
      alert("Last name must contain only letters.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(formData.phoneNumber.toString().trim())) {
      alert("Phone number must contain exactly 10 digits.");
      return;
    }

    // --- Form Submission Logic (only runs if all validations pass) ---
    try {
      await ReceiveQuote(formData);
      toast.success("Quote request sent successfully!"); // Added success toast
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: ''
      });
    } catch (error) {
      console.error("Error sending quote request:", error);
     alert("Failed to send quote request. Please try again.");
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-10'>
        <h1 className="mb-5 text-4xl font-semibold text-primary">REQUEST A QUOTE</h1>
        <div className="flex space-x-10">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-5 py-3 text-gray-500 rounded-lg bg-blue-50 focus:outline-none"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-5 py-3 text-gray-500 rounded-lg bg-blue-50 focus:outline-none"
          />
        </div>
        <div className="flex mt-5 space-x-10">
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-5 py-3 text-gray-500 rounded-lg bg-blue-50 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
             value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-5 py-3 text-gray-500 rounded-lg bg-blue-50 focus:outline-none"
          />
        </div>
        <div className="flex mt-5">
          <textarea
          rows={8}
            placeholder="Your message"
            name="message"
             value={formData.message}
            onChange={handleInputChange}
            className="w-full px-5 py-3 text-gray-500 rounded-lg bg-blue-50 focus:outline-none"
          />
        </div>
             <div className="flex justify-center mt-5">
      <button type="submit"
            disabled={isSending}  className="py-2 text-xl text-white transition duration-200 rounded-full px-7 bg-gradient-to-b from-orange-500 to-orange-600 focus:ring-2 focus:ring-blue-400 hover:shadow-xl center">
 {isSending ? 'Sending...' : 'Send A Message'}
</button>
</div>
      </form>
      <br/>


    </div>
  );
}

export default Form;