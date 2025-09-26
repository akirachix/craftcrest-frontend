
const baseUrl = "/api/inventory";

export async function getInventory() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch inventory: " + response.status);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Couldn't fetch inventory" + (error as Error).message);
  }
}