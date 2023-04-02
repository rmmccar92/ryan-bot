import { Configuration, OpenAIApi } from "openai";
import getConfig from "next/config";
import type {
  NextApiRequest as Request,
  NextApiResponse as Response,
} from "next";
import nc from "next-connect";
// const Resemble = require("@resemble/node");

const { serverRuntimeConfig } = getConfig();

const key = serverRuntimeConfig.OAI_KEY;
// const resembleKey = serverRuntimeConfig.RESEMBLE_KEY;
// const resemble = new Resemble("v2", resembleKey);

const config = new Configuration({
  apiKey: key,
});

const openai = new OpenAIApi(config);

const handler = nc();
handler.post(async (req: Request, res: Response) => {
  console.log(req.body.userInput);
  if (!req.body) return res.status(400).json({ error: "No user input" });
  const userInput = req.body.userInput;
  try {
    // TODO: TURN BACK ON ONCE TESTING IS DONE
    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   // @ts-ignore
    //   messages: [{ role: "user", content: userInput }],
    // });
    // if (!response) {
    //   return res.status(200).json({ error: "No response from AI" });
    // }
    // console.log("text", response?.data?.choices[0]?.message?.content);
    return res.status(200).json({ response: "TEST RESPONSE" });
    // TODO: HERE TOO
    // .json({ response: response?.data?.choices[0]?.message?.content });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default handler;
