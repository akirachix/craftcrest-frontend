const baseUrl = process.env.BASE_URL;

export async function GET() {
    try{
        const response = await fetch(`${baseUrl}/api/payments/`)
        const result = await response.json()

        return new Response (JSON.stringify(result), {
            status:200,
            statusText: 'Successfully fetched payments'
        });

    } catch (error) {
        return new Response((error as Error).message, {
            status: 500,
        });
    }
}



