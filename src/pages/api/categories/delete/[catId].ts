import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

const PORT = process.env.EXTERNAL_API_PORT

export default withApiAuthRequired(async function deleteCategory(req, res) {
    try {
        const { accessToken } = await getAccessToken(req, res, {
            scopes: ["delete:category"]
        });
        const catId = req.query.catId;
        await fetch(`http://localhost:${PORT}/categories/delete/${catId}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`
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
})
