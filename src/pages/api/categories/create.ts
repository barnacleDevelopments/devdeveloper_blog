import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

const PORT = process.env.EXTERNAL_API_PORT

export default withApiAuthRequired(async function createCategory(req, res) {
    try {
        const { accessToken } = await getAccessToken(req, res, { scopes: ["create:category"] });

        const body = req.body;
        await fetch(`http://localhost:${PORT}/categories/create`, {
            method: "POST",
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
                console.log(data)
                res.status(200).json(data);
            })

    } catch (error) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
})
