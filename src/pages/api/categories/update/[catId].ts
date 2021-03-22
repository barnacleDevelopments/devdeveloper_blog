import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

const API_URL = process.env.EXTERNAL_API_URL

export default withApiAuthRequired(async function updateCategory(req, res) {
    try {
        const { accessToken } = await getAccessToken(req, res, {
            scopes: ["update:category"]
        });
        const body = req.body;
        const catId = req.query.catId
        await fetch(`${API_URL}/categories/update/${catId}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                console.log(err)
            })

    } catch (error) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
})
