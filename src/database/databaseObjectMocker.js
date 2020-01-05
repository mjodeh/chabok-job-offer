"use strict";
import { Chance } from "chance";

const platforms = [
    "android/chrome",
    "windows/chrome",
    "widows/edge",
    "mac/safari"
];

const chance = Chance();

class ObjectMocker {
    static getLogInObject() {
        return {
            id: chance.string(),
            name: "LogIn",
            date: Date.now(),
            platform:
                platforms[
                    chance.integer({ min: 0, max: platforms.length - 1 })
                ],
            data: JSON.stringify({})
        };
    }

    static getSearchObject(id) {
        return {
            id: id || chance.string(),
            name: "Search",
            date: Date.now(),
            platform:
                platforms[
                    chance.integer({ min: 0, max: platforms.length - 1 })
                ],
            data: JSON.stringify({ searchQuery: chance.string() })
        };
    }

    static getSignUpObject() {
        return {
            id: chance.string(),
            name: "Signup",
            date: Date.now(),
            platform:
                platforms[
                    chance.integer({ min: 0, max: platforms.length - 1 })
                ],
            data: JSON.stringify({})
        };
    }

    static getPurchaseObject(id) {
        return {
            id: id || chance.string(),
            name: "Purchase",
            date: Date.now(),
            platform:
                platforms[
                    chance.integer({ min: 0, max: platforms.length - 1 })
                ],
            data: JSON.stringify({
                amount: chance.integer({ min: 150, max: 1500 }),
                productIds: ["a1", "a2"],
                type: "cash"
            })
        };
    }

    static getMockedObject(type = 0) {
        switch (type) {
            case 0:
                return [ObjectMocker.getLogInObject()];
            case 1:
                return [ObjectMocker.getSignUpObject()];
            case 2:
                const tempObject = ObjectMocker.getLogInObject();
                return [
                    tempObject,
                    ObjectMocker.getSearchObject(tempObject.id)
                ];
            case 3:
                const tempLogInObject = ObjectMocker.getLogInObject();
                return [
                    tempLogInObject,
                    ObjectMocker.getSearchObject(tempLogInObject.id),
                    ObjectMocker.getPurchaseObject(tempLogInObject.id)
                ];
            default:
                return [ObjectMocker.getLogInObject()];
        }
    }

    static getMockedArray(objectTypesCount) {
        const mockedArray = [];
        for (let i = 0; i < objectTypesCount; i++) {
            mockedArray.push(
                ObjectMocker.getMockedObject(chance.integer({ min: 0, max: 3 }))
            );
        }
        return mockedArray;
    }
}

export { ObjectMocker, chance };
