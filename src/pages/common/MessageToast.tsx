import React from 'react';
import { useMessage } from '../../context/MessageContext';

const MessageToast: React.FC = () => {
  const { messages } = useMessage();

  return (
    <div
      className="fixed bottom-5 right-5 flex flex-col-reverse gap-3 max-h-[90vh] overflow-y-auto"
      style={{ maxWidth: '300px', zIndex: 9999 }} 
    >
      {messages.map((message, index) => {
        const messageStyles = {
          success: 'bg-green-500',
          error: 'bg-red-500',
          info: 'bg-blue-500',
          warning: 'bg-yellow-500',
        };

        return (
          <div
            key={index} 
            className={`p-4 rounded-md text-white ${messageStyles[message.type]} shadow-lg`}
            style={{ minHeight: '50px' }} 
          >
            <p>{message.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MessageToast;
