<<<<<<< HEAD
const baseUrl = process.env.BASE_URL;

export async function GET() {
    try{
        const response = await fetch(`${baseUrl}/api/payments/`)
        const result = await response.json()

        return new Response (JSON.stringify(result), {
            status:200,
            statusText: 'Successfully fetched payments'
        });

=======

const baseUrl = process.env.BASE_URL  ;

export async function GET() {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
        return new Response('The system is not properly configured. Please try again.', { status: 500 });
    }
    try {
        const response = await fetch(`${baseUrl}/payments/`)
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200
        });
>>>>>>> develop
    } catch (error) {
        return new Response((error as Error).message, {
            status: 500,
        });
    }
<<<<<<< HEAD
}



=======
}
>>>>>>> develop
