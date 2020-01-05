"use strict";
import { config } from "dotenv";
config();
import { ChabokJobOffer } from "./database/database";
import { DatabaseInitialization } from "./database/databaseInitialization";

const App = async () => {
    try {
        console.log("Initializing Database");
        await DatabaseInitialization.initialize();
        console.log("Database Initialized Successfully");
        console.log("Generating Data");
        await ChabokJobOffer.insertMultiRecordSingleRecordPerRequest(10000);
        console.log("Query using In");
        await ChabokJobOffer.executeQueryBasedOnIn();
        console.log("Query using Join");
        await ChabokJobOffer.executeQueryBasedOnJoin();
        console.log("re-run queries after optimizing the table");
        await DatabaseInitialization.optimize();
        console.log("optimization completed");
        console.log("Query using In");
        await ChabokJobOffer.executeQueryBasedOnIn();
        console.log("Query using Join");
        await ChabokJobOffer.executeQueryBasedOnJoin();
        console.log("Completed, results are stored under `logs` folder");
    } catch (ex) {
        throw ex;
    }
};

App().catch(err => console.log(err));
