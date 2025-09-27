
const baseUrl ="api/ratings"


export async function fetchRatings() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Unable to fetch ratings. Please try again later.: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Couldn't fetch ratings" + (error as Error).message);
  }
}
