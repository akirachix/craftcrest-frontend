
const baseUrl ="api/ratings"

export async function getRatings() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch ratings: " + response.status);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Couldn't fetch Ratings" + (error as Error).message);
  }
}