import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "../../../../database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = getClient()
  const method = req.method
  const { count } = req.query
  const cnt = count as unknown as number
  let statuses = []
  for (let i = 1; i <= cnt; i++) {
    const status = await client.user.create({
      data: {
        name: `User${i}`
      }
    })
    statuses.push(status)
  }
  res.json(statuses)
}
