const baseUrl = "/api/sellers"

export async function fetchSellers() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Unable to load sellers data. Please try again later.: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Couldn't load sellers data" + (error as Error).message);
  }
}

