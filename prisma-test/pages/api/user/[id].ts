import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "../../../database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = getClient()
  const method = req.method
  const { id } = req.query
  if (typeof id != 'string') return res.status(400).json({ error: "Multiple ids specified" })
  switch (method) {
    case 'GET':
      {
        const users = await client.user.findFirst({
          select: {
            id: true,
            name: true
          },
          where: {
            id: id
          }
        })
        res.json(users)
        break
      }
    case "DELETE":
      {
        const users = await client.user.deleteMany({
          where: {
            id: id
          }
        })
        res.json(users)
        break
      }
  }
}
