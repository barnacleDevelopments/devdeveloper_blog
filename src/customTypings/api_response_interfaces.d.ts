/*
AUTHOR: Devin Davis
DATE: January 30th, 2021
FILE: api_response_interfaces.d.ts
*/

// BASIC RESPONSE 
type ResponseStatus = "success" | "pending" | "error";

type BasicResponse = { status: ResponseStatus, message?: "" };


// POST REPONSES
type PostResponse = {
    data: PostData,
    status: ResponseStatus,
    message: string
}

type PostsResponse = {
    data: PostData[],
    status: ResponseStatus,
    message: string
}

// CATEGORY RESPONSES
type CategoriesResponse = {
    data: CategoryData[],
    status: ResponseStatus,
    message: string
}

type CategoryResponse = {
    data: CategoryData,
    status: ResponseStatus,
    message: string
}