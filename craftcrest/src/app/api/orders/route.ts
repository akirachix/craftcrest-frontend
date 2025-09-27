import { NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL; 


export async function GET() {
  try {
if (!baseUrl) {
    return new Response("Not configured", { status: 500 })
  }
    const response = await fetch(`${baseUrl}/orders/`);
    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}