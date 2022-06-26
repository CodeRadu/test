import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "../../../database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = getClient()
  const method = req.method
  let status
  switch (method) {
    case 'GET':
      const users = await client.user.findMany({})
      res.json(users)
      break
    case "POST":
      const body = JSON.parse(req.body)
      status = await client.user.create({
        data: {
          name: body.name
        }
      })
      res.status(200).json(status)
      break
  }
}
