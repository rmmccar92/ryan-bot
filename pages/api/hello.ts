import { Configuration, OpenAIApi } from "openai";
import getConfig from "next/config";
import type {
  NextApiRequest as Request,
  NextApiResponse as Response,
} from "next";
import nc from "next-connect";

const { serverRuntimeConfig } = getConfig();

const key = serverRuntimeConfig.OAI_KEY;

console.log("KEY", key);

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
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: userInput,
    });
    if (response.data.choices[0].text === "") {
      return res.status(200).json({ error: "No response from AI" });
    }
    console.log("text", response.data.choices[0].text);
    return res.status(200).json({ response: response.data.choices[0].text });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default handler;
