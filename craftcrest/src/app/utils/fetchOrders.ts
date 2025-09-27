
export async function fetchOrders() {
  try {
    const response = await fetch('/api/orders');
    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error || response.statusText || response.status;
      throw new Error(`Unable to fetch orders. Please try again later.: ${errorMessage}`);
    }

    return data;
  } catch (error) {
    throw new Error(`Unable to fetch orders. Please try again later.: ${(error as Error).message}`);
  }
}
