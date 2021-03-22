import { getAccessToken } from "@auth0/nextjs-auth0";

const API_URL = process.env.EXTERNAL_API_URL

export default async function deleteComment(req: any, res: any) {
    try {
        const { accessToken } = await getAccessToken(req, res, { scopes: ["delete:comment"] });
        const postId = req.query.postId
        const comId = req.query.comId

        await fetch(`${API_URL}/comments/delete/${comId}/${postId}`, {
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
}
