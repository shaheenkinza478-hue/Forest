import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message } = await request.json();

    // OpenAI API call
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are the Spirit of the Forest, a wise and warm guide. Answer briefly (2-3 sentences) with emojis.' },
          { role: 'user', content: message }
        ],
        temperature: 0.8,
        max_tokens: 200,
      }),
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    return NextResponse.json({ text: reply, image: null });
  } catch (error) {
    return NextResponse.json({ text: "🌲 The forest spirits are busy. Please try again.", image: null });
  }
}