/*
AUTHOR: Devin Davis
DATE: Febuary 13th, 2021
FILE: category_tests .js
*/

import {expect} from "chain";
import request from "request";

describe("Category Routes", () => {
	const url = "http://localhost:3000/"

	it("Return all categories", (error, response, body) => {
		request(`${url} categories`, () => {
			expect(response.status).to.equal(200);		
		});
	});
});

/*
describe("Category Routes", () => {
	const url = "http://localhost:3000/"

	it("Return all categories", (error, response, body) => {
		request(`${url} categories`, () => {
			expect(response.status).to.equal(200);		
		});
	});
});


describe("Category Routes", () => {
	const url = "http://localhost:3000/"

	it("Return all categories", (error, response, body) => {
		request(`${url} categories`, () => {
			expect(response.status).to.equal(200);		
		});
	});
*/
});







