import { describe, it,afterEach } from 'node:test';
import assert from 'node:assert';

import { Environment } from "./index";

describe("testing environment variables", () => {
    afterEach(() => {
        process.env = {};
    });

    it("should return error if mandatory environment variables are missing", () => {
        process.env = {
            API_PORT: "8080",
            CORS_ALLOWED: "http:localhost:3000",
            MAINTENANCE_MODE: "0",
        };
        const environment = new Environment();
        assert.ok(environment.hasErrors(),'must have errors');
    });

    it("should not have any errors when all envs are set correctly ", () => {
        process.env = {
            API_PORT: "8080",
            CORS_ALLOWED: "http:localhost:3000",
            MAINTENANCE_MODE: "0",
            DEPLOYMENT_LANE:'dev',
            DB_HOST: "localhost",
            DB_PORT: "5432",
            DB_NAME: "test",
            DB_USER:" db_user",
            DB_PASSWORD:"secretPass123word",
            DB_DIALECT:"postgres"
        };

        const environment = new Environment();
        assert.ok(!environment.hasErrors());
    });

    it("should be able to parse string from the process.env object", () => {
        process.env = {
            API_PORT: "8080",
            CORS_ALLOWED: "http:localhost:3000",
            MAINTENANCE_MODE: "0",
            DEPLOYMENT_LANE:'test',
            DB_HOST: "localhost",
            DB_PORT: "5432",
            DB_NAME: "test",
            DB_USER:" db_user",
            DB_PASSWORD:"secretPass123word",
            DB_DIALECT:"postgres"
        };
        const environment = new Environment();
        assert.ok(typeof environment.deploymentEnvironment === "string","type string expected");
        assert.ok(environment.deploymentEnvironment==="test", "environment value test expected");
    });

    it("should be able to parse number from the process.env object", () => {
        process.env = {
            API_PORT: "8080",
            CORS_ALLOWED: "http:localhost:3000",
            MAINTENANCE_MODE: "0",
            DEPLOYMENT_LANE:'test',
            DB_HOST: "localhost",
            DB_PORT: "5432",
            DB_NAME: "test",
            DB_USER:" db_user",
            DB_PASSWORD:"secretPass123word",
            DB_DIALECT:"postgres"
        };
        const environment = new Environment();
        assert(typeof environment.apiPort === "number");
        assert(environment.apiPort === 8080);
    });

    it("should be able to parse comma separated value as array from the process.env object", () => {
        process.env = {
            API_PORT: "8080",
            CORS_ALLOWED:
                "http:localhost:8090//,http://localhost:3000//api//,https://dev.subscription.com/",
            MAINTENANCE_MODE: "0",
            DEPLOYMENT_LANE:'test',
            DB_HOST: "localhost",
            DB_PORT: "5432",
            DB_NAME: "test",
            DB_USER:" db_user",
            DB_PASSWORD:"secretPass123word",
            DB_DIALECT:"postgres"
        };
        const environment = new Environment();
        assert.ok(typeof environment.allowedCorsDomains === "object","type array expected");
        assert.ok(JSON.stringify(environment.allowedCorsDomains)===JSON.stringify([
            "http://localhost:8090",
            "http://localhost:3000",
            "https://dev.subscription.com",
        ]));
    });

    it("should be able to parse the 1 as true from the process.env object", () => {
        process.env = {
            API_PORT: "8080",
            CORS_ALLOWED: "http:localhost:3000",
            MAINTENANCE_MODE: "1",
            DEPLOYMENT_LANE:'test',
            DB_HOST: "localhost",
            DB_PORT: "5432",
            DB_NAME: "test",
            DB_USER:" db_user",
            DB_PASSWORD:"secretPass123word",
            DB_DIALECT:"postgres"
        };
        const environment = new Environment();
        assert(typeof environment.underMaintenance==="boolean","type boolean expected");
        assert(environment.underMaintenance=== true,"value should be true");
    });

    it("should be able to parse the 0 as false from the process.env object", () => {
        process.env = {
            API_PORT: "8080",
            CORS_ALLOWED: "http:localhost:3000",
            MAINTENANCE_MODE: "0",
            DEPLOYMENT_LANE:'test',
            DB_HOST: "localhost",
            DB_PORT: "5432",
            DB_NAME: "test",
            DB_USER:" db_user",
            DB_PASSWORD:"secretPass123word",
            DB_DIALECT:"postgres"
        };
        const environment = new Environment();
        assert(typeof environment.underMaintenance==="boolean","boolean value expected");
        assert(environment.underMaintenance===false);
    });
});