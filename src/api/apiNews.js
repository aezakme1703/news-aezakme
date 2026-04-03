const BASE_URL = import.meta.env.VITE_NEW_BASE_API_URL
const API_KEY = import.meta.env.VITE_NEW_API_KEY
const url = `${BASE_URL}?apiKey=${API_KEY}`;

export const getNews = async() => {
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
// export const getNews = async() => {
//   try {
//     const response = await axios.get(`${BASE_URL}latest-news`, {
//       params: {
//         apiKey: API_KEY
//       }}
//     )
//     return response.data
//   }
//   catch(error) {
//     console.log(error)
//   }
// }