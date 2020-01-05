import { ChabokJobOffer } from "../src/database/database";
import { Chance } from "chance";
import { assert, expect } from "chai";
import { DatabaseInitialization } from "../src/database/databaseInitialization";

const chance = Chance();

describe("Database", async () => {
    before(async () => {
        await DatabaseInitialization.initialize();
    });

    it("insert record", async () => {
        const temp = await ChabokJobOffer.insertRecord();
        assert.equal(temp.r, 1);
    });

    it("insert multiple records one per request", async () => {
        const temp = await ChabokJobOffer.insertMultiRecordSingleRecordPerRequest(
            2
        );
        assert.isArray(temp);
        expect(temp.length).to.be.gte(2);
        const outputs = temp.map(res => res.r);
        const success = outputs.filter(output => output !== 1);
        assert.equal(success.length, 0);
    });

    it("query record using 'In'", async () => {
        const query = await ChabokJobOffer.executeQueryBasedOnIn();
        assert.isArray(query);
        expect(query.length).to.be.greaterThan(0);
    });

    it("query record using 'Join'", async () => {
        const query = await ChabokJobOffer.executeQueryBasedOnJoin();
        assert.isArray(query);
        expect(query.length).to.be.greaterThan(0);
    });
});
