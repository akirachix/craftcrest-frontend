
const baseUrl = "/api/orders"

export async function getOrders() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch orders: " + response.status);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Couldn't fetch orders" + (error as Error).message);
  }
}