"use strict";
import { logTime, clickHouse } from "../tools";
import { ObjectMocker, chance } from "./databaseObjectMocker";

/**
 * @class ChabokJobOffer
 * contains 3 static func, insertRecord, executeQueryUnOptimized,executeQueryOptimized
 */
class ChabokJobOffer {
    /**
     * insert single record (for purchase 2 records are inserted)
     */
    @logTime("Database")
    static async insertRecord() {
        const mocked = ObjectMocker.getMockedObject(
            chance.integer({ min: 0, max: 3 })
        );

        return clickHouse
            .insert(
                "INSERT INTO chabokJob.chabokjob (id, date, platform, name, data)",
                mocked
            )
            .toPromise();
    }

    @logTime("Database")
    static async executeQueryBasedOnIn() {
        return clickHouse
            .query(
                "select * from chabokJob.chabokjob where id in (select id from chabokJob.chabokjob where name='Purchase') and id in (select id from chabokJob.chabokjob where name='Search')"
            )
            .toPromise();
    }

    @logTime("Database")
    static async executeQueryBasedOnJoin() {
        return clickHouse
            .query(
                "select * from chabokJob.chabokjob where id in (select id from chabokJob.chabokjob where name='Purchase') and id in (select id from chabokJob.chabokjob where name='Search')"
            )
            .toPromise();
    }

    @logTime("Database")
    static async insertMultiRecordSingleRecordPerRequest(num = 1) {
        let mocked = ObjectMocker.getMockedObject(
            chance.integer({ min: 0, max: 3 })
        );
        const result = [];
        for (let i = 0; i < num; i++) {
            result[i] = await clickHouse
                .insert(
                    "INSERT INTO chabokJob.chabokjob (id, date, platform, name, data)",
                    mocked
                )
                .toPromise();
            mocked = ObjectMocker.getMockedObject(
                chance.integer({ min: 0, max: 3 })
            );
        }
        return result;
    }
}

export { ChabokJobOffer };
