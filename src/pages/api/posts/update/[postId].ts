import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

const PORT = process.env.EXTERNAL_API_PORT

export default withApiAuthRequired(async function updatePost(req, res) {
    try {
        const { accessToken } = await getAccessToken(req, res, {
            scopes: ["update:category"]
        });
        const body = req.body;
        const postId = req.query.postId
        await fetch(`http://localhost:${PORT}/posts/update/${postId}`, {
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
