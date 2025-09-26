
const baseUrl = "/api/users"

export async function getUsers() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch users: " + response.status);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Couldn't fetch users" + (error as Error).message);
  }
}