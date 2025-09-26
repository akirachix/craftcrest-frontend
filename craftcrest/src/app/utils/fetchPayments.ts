
const baseUrl = "/api/payments"

export async function fetchPayments() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Unable to fetch payments. Please try again later.: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Couldn't fetch payments" + (error as Error).message);
  }
}

