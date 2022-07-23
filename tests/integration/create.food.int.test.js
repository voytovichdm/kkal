const request = require("supertest");
const app = require("../../app");
const dataCreateFoodFunction = require("../mock-data/data-create-food-function.json");

const endpointUrl = "/create-food/";

describe(endpointUrl, () => {

    it("POST " + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(dataCreateFoodFunction);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(dataCreateFoodFunction.name);
        expect(response.body.protein_a).toBe(dataCreateFoodFunction.protein_a);
        expect(response.body.protein_v).toBe(dataCreateFoodFunction.protein_v);
        expect(response.body.fats_a).toBe(dataCreateFoodFunction.fats_a);
        expect(response.body.fats_v).toBe(dataCreateFoodFunction.fats_v);
        expect(response.body.carbohydrates_f).toBe(dataCreateFoodFunction.carbohydrates_f);
        expect(response.body.carbohydrates_s).toBe(dataCreateFoodFunction.carbohydrates_s);
        expect(response.body.calories).toBe(dataCreateFoodFunction.calories);
    });

    it("should return error 500 on malformed data with POST" + endpointUrl,
        async () => {
            const response = await request(app)
                .post(endpointUrl)
                .send({ err: "err" });
            expect(response.statusCode).toBe(500);
            expect(response.body).toStrictEqual({
                "message": "notNull Violation: Foods.name cannot be null,\nnotNull Violation: Foods.protein_a cannot be null,\nnotNull Violation: Foods.protein_v cannot be null,\nnotNull Violation: Foods.fats_a cannot be null,\nnotNull Violation: Foods.fats_v cannot be null,\nnotNull Violation: Foods.carbohydrates_f cannot be null,\nnotNull Violation: Foods.carbohydrates_s cannot be null,\nnotNull Violation: Foods.calories cannot be null"
            });
        });
})
