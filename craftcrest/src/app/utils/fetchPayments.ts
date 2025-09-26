
const baseUrl = "/api/payments"

export async function getPayments() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch payments: " + response.status);
    }
    const result = await response.json();
    return result;
  } catch (error ) {
    throw new Error("Couldn't fetch payments" + (error as Error).message);
  }
}