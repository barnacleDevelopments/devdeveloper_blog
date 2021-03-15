/*
AUTHOR: Devin Davis
DATE: March 13th, 2021
FILE: useNav.tsx
*/

// DEPENDENTCIES
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const useAuth = () => {
    // auth0 hook
    const { user, getAccessTokenSilently, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();
    // is admin state
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    // retrive 
    useEffect(() => {
        if (isAuthenticated && (user["http://reallyuniquenamespace.com/roles"][0] === "administrator")) {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }, [])

    const updateUserCommentList = async (commentId: string) => {

        try {
            const token = await getAccessTokenSilently();
            console.log(token)
            // add comment to users comment list
            const userCommentList: string[] = user["http://usercomments.com/comments"];
            let newUserCommentList: string[] = [...userCommentList, commentId];
            // configure options
            const jsonCommentList = JSON.stringify({
                user_metadata: {
                    comments: newUserCommentList
                }
            })
            const options = {
                method: "patch",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                data: jsonCommentList,
            }
            // update user comment list
            fetch(`https://dev-qkxpd7xc.auth0.com/api/v2/users/${user.sub}`, options)
                .then((response) => response.json())
                .then(data => {
                    console.log(data)
                    // // update user's comment list
                    // let newUserCommentList = user.comments;
                    // newUserCommentList.push(com._id);

                }).catch(err => {
                    console.log(err)
                    console.log("Failed to update user comments!")
                });
        } catch (err) {
            console.log(err)
        }


    }


    return {
        isAuthenticated,
        user,
        isLoading,
        isAdmin,
        logout,
        loginWithRedirect,
        getAccessTokenSilently,
        updateUserCommentList

    }
}

export default useAuth;