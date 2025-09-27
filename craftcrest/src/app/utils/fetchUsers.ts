const baseUrl = '/api/users';

export async function fetchUsers() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Something went wrong, ' + response.status);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Couldn't fetch users" + (error as Error).message);
  }
}