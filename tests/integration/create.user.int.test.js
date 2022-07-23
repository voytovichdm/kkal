const request = require("supertest");
const app = require("../../app");
const dataCreateFunction = require("../mock-data/data-create-function.json");

const endpointUrl = "/create-user/";

describe(endpointUrl, () => {

    it("POST " + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(dataCreateFunction);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(dataCreateFunction.name);
        expect(response.body.email).toBe(dataCreateFunction.email);
    });

    it("should return error 500 on malformed data with POST" + endpointUrl,
        async () => {
            const response = await request(app)
                .post(endpointUrl)
                .send({ err: "err" });
            expect(response.statusCode).toBe(500);
            expect(response.body).toStrictEqual({
                "message": "notNull Violation: Users.name cannot be null,\nnotNull Violation: Users.email cannot be null,\nnotNull Violation: Users.password cannot be null"
            });
        });
})
