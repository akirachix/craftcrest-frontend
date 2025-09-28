export async function GET() {
  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    return new Response('The system is not properly configured. Please try again.', { status: 500 });
  }
  try {
    const response = await fetch(`${baseUrl}/users/`)
    const users = await response.json();
    const sellers = [];
    for (var i = 0; i < users.length; i++) {
      if (users[i].user_type === "artisan") sellers.push(users[i]);
    }
    return new Response(JSON.stringify(sellers), {
      status: 200
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}