const baseUrl = "/api/orders"

export async function fetchOrders() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Unable to fetch orders. Please try again later.: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Couldn't fetch orders" + (error as Error).message);
  }
}



