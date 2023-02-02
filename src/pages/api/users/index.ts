import { NextApiRequest, NextApiResponse } from "next";

// Serverless

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "Diego" },
    { id: 2, name: "Marujunu" },
    { id: 2, name: "Dani" },
    { id: 2, name: "Rafa" },
  ];

  return response.json(users);
};
