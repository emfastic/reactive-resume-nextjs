


import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).send("No prompt in the request")
    }

    const payload = {
        model: "text-davinci-003",
        prompt,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0.15,
        presence_penalty: 0,
        max_tokens: 200,
        n: 1,
    };

    console.log('here', payload)

    fetch("https://api.openai.com/v1/completions", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            res.status(200).json(json);
        });
}