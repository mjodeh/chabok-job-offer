import { ObjectMocker } from "../src/database/databaseObjectMocker";
import { Chance } from "chance";
import { assert, expect } from "chai";

const chance = Chance();

describe("object mocker", async () => {
    it("log in", async () => {
        const temp = ObjectMocker.getMockedObject(0);
        assert.isArray(temp);
        assert.equal(temp.length, 1);
        assert.equal(temp[0].name, "LogIn");
    });

    it("mocked without type, default login", async () => {
        const temp = ObjectMocker.getMockedObject();
        assert.isArray(temp);
        assert.equal(temp.length, 1);
        assert.equal(temp[0].name, "LogIn");
    });

    it("sign up", async () => {
        const temp = ObjectMocker.getMockedObject(1);
        assert.isArray(temp);
        assert.equal(temp.length, 1);
        assert.equal(temp[0].name, "Signup");
    });
    it("search", async () => {
        const temp = ObjectMocker.getMockedObject(2);
        assert.isArray(temp);
        assert.equal(temp.length, 2);
        assert.equal(temp[0].name, "LogIn");
        assert.equal(temp[1].name, "Search");
        assert.equal(temp[0].id, temp[1].id);
    });
    it("purchase", async () => {
        const temp = ObjectMocker.getMockedObject(3);
        assert.isArray(temp);
        assert.equal(temp.length, 3);
        assert.equal(temp[0].name, "LogIn");
        assert.equal(temp[1].name, "Search");
        assert.equal(temp[2].name, "Purchase");
        assert.equal(temp[0].id, temp[1].id);
    });
    it("array", async () => {
        const temp = ObjectMocker.getMockedArray(10);
        assert.isArray(temp);
        expect(temp.length).to.be.gte(10);
    });
});
