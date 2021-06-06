
const API_URL = process.env.EXTERNAL_API_URL

export default async function getCategories({ }, res: any) {
    await fetch(`${API_URL}/categories`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
        }
    })
        .then(response => response.json())
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
}
