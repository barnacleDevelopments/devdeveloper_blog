/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: post_controller.ts
*/

import { RessourceId } from "../customTypings/global_types";

const LOCAL_URL = "http://blog.devdeveloper.ca";

class Post {
    constructor() { }

    async getAll(): Promise<PostData[]> {
        let recievedData: PostData[] = [{
            _id: "",
            title: "",
            content: "",
            date: "",
            catId: ""
        }];
        await fetch(`${LOCAL_URL}/api/posts/all`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => recievedData = data.data);

        return recievedData
    }
    async getOne(postId: RessourceId): Promise<PostData> {
        let recievedData: PostData = {
            _id: "",
            title: "",
            content: "",
            date: "",
            catId: ""
        };
        await fetch(`${LOCAL_URL}/api/posts/view/${postId}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => recievedData = data.data);
        return recievedData
    }

    async create(title: string, content: string, catId: RessourceId): Promise<PostData> {
        let recievedData: PostData = {
            _id: "",
            title: "",
            content: "",
            date: "",
            catId: ""
        }

        await fetch(`${LOCAL_URL}/api/posts/create/${catId}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ title, content })
        })
            .then(response => response.json())
            .then(data => recievedData = data.data)

        return recievedData;
    }

    async update(postId: RessourceId, newPost: EditPostData): Promise<PostData> {
        let recievedData: PostData = {
            _id: "",
            title: "",
            content: "",
            date: "",
            catId: ""
        }

        await fetch(`${LOCAL_URL}/api/posts/update/${postId}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newPost)
        })
            .then(response => response.json())
            .then(data => recievedData = data.data)
            .catch(err => console.log(err))
        return recievedData;
    }

    async delete(postId: RessourceId, catId: any): Promise<BasicResponse> {
        let response: BasicResponse = {
            status: "pending",
            message: ""
        }
        fetch(`${LOCAL_URL}/api/posts/delete/${catId}/${postId}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => response = data)
            .catch(err => console.log(err))

        return response;

    }
}

export default Post;