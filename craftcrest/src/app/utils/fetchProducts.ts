
const baseurl = "/api/inventory";

export async function getProducts(){
  try {
    const response = await fetch(baseurl);
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching products:" + (error as Error).message);
  }
}
