import axiosInstance from '../lib/axios';
import { create } from 'zustand';
import { toast } from 'react-hot-toast';

export const quoteStore = create((set) => ({
  isSending: false,

  ReceiveQuote: async (formdata) => {
    set({ isSending: true });
    try {
      await axiosInstance.post('/contact', formdata);
      toast.success('Message Sent');
      return { success: true };
    } catch (error) {
      console.error('ERROR in STORE:', error);
      toast.error('Failed to send message');
      return { success: false };
    } finally {
      set({ isSending: false });
    }
  },
}));