import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {quoteStore} from '../../store/quoteStore';
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

  const handleSubmit=async(e)=>{
     e.preventDefault();
       if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    await ReceiveQuote(formData);
    
      setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: ''
    });
  }
  
  
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

