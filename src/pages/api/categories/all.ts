
const PORT = process.env.EXTERNAL_API_PORT

export default async function getCategories({ }, res: any) {
    try {
        await fetch(`http://localhost:${PORT}/categories`, {
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

    }
}
