const model = require('../../models');
const controllerCreateUser = require('../../controllers/create_user');
const httpMocks = require("node-mocks-http");
const dataCreateFunction = require('../mock-data/data-create-function.json');

model.Users.create = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("controllerCreateUser.createUser", () => {

    beforeEach(() => {
        req.body = dataCreateFunction;
    });

    it("should have a controller.CreateUser function", () => {
        expect(typeof controllerCreateUser.createUser).toBe("function");
    });

    it("should call controller.CreateUser function", () => {
        controllerCreateUser.createUser(req, res, next);
        expect(model.Users.create).toBeCalledWith(dataCreateFunction);
    });

    it("should call TodoModel.create", () => {
        controllerCreateUser.createUser(req, res, next);
        expect(model.Users.create).toBeCalledWith(dataCreateFunction);
    });

    it("should return 201 response code", async () => {
        await controllerCreateUser.createUser(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should return json body in response", async () => {
        model.Users.create.mockReturnValue(dataCreateFunction);
        await controllerCreateUser.createUser(req, res, next);
        expect(res._getJSONData()).toStrictEqual(dataCreateFunction);
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "Done property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        model.Users.create.mockReturnValue(rejectedPromise);
        await controllerCreateUser.createUser(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
})
