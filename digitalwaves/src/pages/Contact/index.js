import React from 'react';
import Layout from '../../components/Layout';
import Location from './location';
import Form from './form';
import ChatApp from './chatbot';

function Contact() {
  return (
    <Layout>
      <div className="flex items-center justify-center mt-8 mb-8">
        <div className="grid grid-cols-2 gap-16 p-8">
          <Location />
          <Form />
        </div>
      </div>
      <ChatApp/>
    </Layout>
  );
}

export default Contact;