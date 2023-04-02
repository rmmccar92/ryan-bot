import styles from "@/styles/Message.module.css";
import axios from "axios";
import { useState } from "react";
const { Resemble } = require("@resemble/node");
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const key = publicRuntimeConfig.RESEMBLE_KEY;
const projectId = publicRuntimeConfig.RESEMBLE_PROJECT_ID;
const voiceId = publicRuntimeConfig.VOICE_ID;

// const resemble = new Resemble("v2", key);

// console.log("PID", projectId);

const Message = () => {
  const [aiMessage, setAiMessage] = useState("Test Message");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
    if (input) {
      const userInput = input.value;
      //   console.log("userInput", input.value);
      try {
        const result = await axios.post("/api/hello", { userInput: userInput });
        // console.log("result", result.data.response);
        setAiMessage(result.data.response);

        // Resemble reading
        Resemble.setApiKey(key);
        const response = await Resemble.v2.clips.createAsync(projectId, {
          body: aiMessage,
          voice_uuid: voiceId,
          callback_url: "/api/clip",
        });
        // const response = await Resemble.v2.clips.all(projectId, 1, 30);

        console.log("RESEMBLE response", response.items);
      } catch (error) {
        console.log(error);
      }
      input.value = "";
    }
  };

  return (
    <>
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
      <div className={styles.aiMessageContainer}>
        {aiMessage !== "" && <p className={styles.aiMessage}>{aiMessage}</p>}
      </div>
    </>
  );
};

export default Message;
