/*
AUTHOR: Devin Davis
DATE: Febuary 13th, 2021
FILE: category_tests .js
*/

const expect = require("chai").expect;
const request = require("request");

describe("Category Routes", () => {
    const url = "http://localhost:5000"

    it("Return all categories", (done) => {
        request(`${url}/categories`, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
        });
        done();
    });


    it("Return one category", (done) => {
        const id = "1"
        request(`${url}/categories/${id}`, (error, response, body) => {
            expect(response.status).to.equal(200);
        });
        done();
    });


    // it("Return", (done) => {
    //     request(`${url} categories`, (error, response, body) => {
    //         expect(response.status).to.equal(200);
    //     });
    //     done();
    // });
});




