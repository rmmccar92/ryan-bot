import styles from "@/styles/Message.module.css";
import axios from "axios";
import { useState } from "react";

const Message = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
    if (input) {
      const userInput = input.value;
      console.log("userInput", input.value);
      try {
        const result = await axios.post("/api/hello", { userInput: userInput });
        console.log("result", result);
      } catch (error) {
        console.log(error);
      }
      input.value = "";
    }
  };

  return (
    <div className={styles.inputContainer}>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter Your Message"
        />
        <button className={styles.inputButton} type="submit">
          Submit Message
        </button>
      </form>
    </div>
  );
};

export default Message;
