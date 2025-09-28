
const baseUrl = process.env.BASE_URL;


export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body) {
      return new Response(JSON.stringify({ error: "Request body is required" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const response = await fetch(`${baseUrl}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result.error || "Login failed";
      return new Response(JSON.stringify({ error: message }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to login: " + (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
