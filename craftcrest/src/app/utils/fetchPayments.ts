export async function fetchPayments() {
  const baseUrl = "/api/payments/";
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch payments: " + response.statusText);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Couldn't fetch payments:" + (error instanceof Error ? error.message : String(error)));
  }
}