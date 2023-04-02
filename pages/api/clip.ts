import nc from "next-connect";
import type {
  NextApiRequest as Request,
  NextApiResponse as Response,
} from "next";

const handler = nc();

handler.post(async (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ response: "TEST RESPONSE" });
});
