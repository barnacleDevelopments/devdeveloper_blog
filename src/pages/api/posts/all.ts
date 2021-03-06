const API_URL = process.env.EXTERNAL_API_URL

export default async function getAllPosts({ }, res: any) {
    try {
        await fetch(`${API_URL}/posts`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
            }
        })
            .then(response => response.json())
            .then(data => {
                res.status(200).json(data);
            }).catch(err => {
                console.log(err)
            })

    } catch (error) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
}
