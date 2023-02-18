export default async function handler (req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt } = JSON.parse(req.body)

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' })

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Simula que eres la inteligencia artificial de ChatGPT y response al siguiente prompt:\n ${prompt}`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })

    if (!response.ok) {
      console.error(response.statusText)
      return res.status(200).json({ error: 'OpenIA API error' })
    }

    const data = await response.json()
    return res.status(200).json({
      response: data.choices[0].text.replace(/^\s+/, '')
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
