import React, { createContext, useContext, useState } from "react";

type Message = {
  text: string;
  type: "success" | "error" | "info" | "warning";
};

type MessageContextType = {
  messages: Message[]; 
  showMessage: (text: string, type?: Message["type"]) => void;
  clearMessage: () => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const showMessage = (text: string, type: Message["type"] = "info") => {
    setMessages((prevMessages) => [...prevMessages, { text, type }]);
    setTimeout(() => {
      setMessages((prevMessages) => prevMessages.slice(1)); 
    }, 3000);
  };

  const clearMessage = () => {
    setMessages([]);
  };

  return (
    <MessageContext.Provider value={{ messages, showMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
