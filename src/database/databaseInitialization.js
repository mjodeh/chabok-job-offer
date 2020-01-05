"use strict";
import { clickHouse } from "../tools";

class DatabaseInitialization {
    static async initialize() {
        await clickHouse
            .query("Create database IF NOT EXISTs chabokJob")
            .toPromise()
            .catch();
        await clickHouse
            .query(
                `CREATE TABLE IF NOT EXISTS chabokJob.chabokjob (
            id String,
            date UInt32,
            platform String,
            name String,
            data String
        )
        ENGINE=MergeTree
        PARTITION BY id
        ORDER BY (name,date)
        SETTINGS index_granularity = 8192;`
            )
            .toPromise();
    }

    static async optimize() {
        return clickHouse
            .query("optimize table chabokJob.chabokjob")
            .toPromise();
    }
}

export { DatabaseInitialization };
