
const baseUrl = process.env.BASE_URL ;

export async function GET() {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
        return new Response('The system is not properly configured. Please try again.', { status: 500 });
    }
    try {
        const response = await fetch(`${baseUrl}/orders/`)
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch (error) {
        return new Response((error as Error).message, {
            status: 500,
        });
    }
}