import { getAccessToken } from "@auth0/nextjs-auth0";

const PORT = process.env.EXTERNAL_API_PORT

export default async function createComment(req: any, res: any) {
    try {
        const { accessToken } = await getAccessToken(req, res, { scopes: ["create:comment"] });
        const postId = req.query.postId
        const body = req.body
        await fetch(`http://localhost:${PORT}/comments/create/${postId}`, {
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
                res.status(200).json(data);
            }).catch(err => {
                console.log(err)
            })

    } catch (error) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
}
