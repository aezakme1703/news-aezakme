const BASE_URL = import.meta.env.VITE_NEW_BASE_API_URL
const API_KEY = import.meta.env.VITE_NEW_API_KEY

export const getNews = async(page_number = 1, page_size = 10) => {
  const params = {
      apiKey: API_KEY,
      page_number: page_number,
      page_size: page_size
  }
  const queryString = new URLSearchParams(params).toString()
  const url = `${BASE_URL}?${queryString}`;
  try {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json()
    return data
  }
  catch(error) {
    console.log(error)
  }
}
