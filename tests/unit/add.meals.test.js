const model = require('../../models');
const controllerAddMeals = require('../../controllers/add_meals');
const httpMocks = require("node-mocks-http");
const dataAddMealsFunction = require('../mock-data/data-add-meals-function.json');

model.Meals.create = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("controllerCreateFood.createFood", () => {

    beforeEach(() => {
        req.body = dataAddMealsFunction;
    });

    it("should have a controllerCreateFood.CreateFood function", () => {
        expect(typeof controllerCreateFood.createFood).toBe("function");
    });

    it("should call controllerCreateFood.createFood function", () => {
        controllerCreateFood.createFood(req, res, next);
        expect(model.Foods.create).toBeCalledWith(dataCreateFoodFunction);
    });

    it("should call controllerCreateFood.createFood", () => {
        controllerCreateFood.createFood(req, res, next);
        expect(model.Foods.create).toBeCalledWith(dataCreateFoodFunction);
    });

    it("should return 200 response code", async () => {
        await controllerCreateFood.createFood(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should return json body in response", async () => {
        model.Foods.create.mockReturnValue(dataCreateFoodFunction);
        await controllerCreateFood.createFood(req, res, next);
        expect(res._getJSONData()).toStrictEqual(dataCreateFoodFunction);
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "Done property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        model.Foods.create.mockReturnValue(rejectedPromise);
        await controllerCreateFood.createFood(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
})
