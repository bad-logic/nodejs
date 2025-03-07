import { URL } from "url";
import { DEPLOYMENT_ENVIRONMENT } from "@utils/enums";
import { LogLevels } from "@modules/logger";
import Joi from "joi";

type dialect = "mysql"|"postgres"

const environmentSchema = Joi.object({
    DEPLOYMENT_LANE: Joi.string().valid(DEPLOYMENT_ENVIRONMENT.DEVELOPMENT,DEPLOYMENT_ENVIRONMENT.PRODUCTION,DEPLOYMENT_ENVIRONMENT.TESTING).required(),
    API_PORT: Joi.number().min(3000).max(9999).default(8080),
    CORS_ALLOWED: Joi.string().custom((val,helper)=>{
        const rawValue: string[] = val?.trim().split(",");
        if (rawValue === undefined) {
            return helper.message({ message: "CORS_ALLOWED must be comma seperated urls" });
        }
        return rawValue.map((url) => {
            const u = new URL(url);
            return `${u.protocol}//${u.host}`;
        });
    }).optional(),
    MAINTENANCE_MODE: Joi.string().valid('0','1').default('0'),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DIALECT: Joi.string().valid("mysql","postgres").required()
});

class Environment {
    apiPort: number;
    deploymentEnvironment: DEPLOYMENT_ENVIRONMENT = DEPLOYMENT_ENVIRONMENT.DEVELOPMENT;
    dbHost: string;
    dbPort: number;
    dbName: string;
    dbUser: string;
    dbPassword: string;
    dbDialect: dialect;

    logLevel: LogLevels = "debug";

    underMaintenance?: boolean = false;
    dbLogging: boolean = false;
    allowedCorsDomains?: string[];

    errors: string[] = [];

    /**
     * constructor
     */
    constructor() {
        const { error, value } =  environmentSchema.validate(process.env,{ abortEarly: false, allowUnknown:true });

        if(error){
            this.errors = error.details.map(detail => {
                return detail.message;
            });
        }

        const {DEPLOYMENT_LANE ,API_PORT,CORS_ALLOWED,MAINTENANCE_MODE,DB_HOST,DB_PORT,DB_NAME,DB_USER,DB_PASSWORD,DB_DIALECT} = value as unknown as any;

        this.deploymentEnvironment = DEPLOYMENT_LANE as unknown as DEPLOYMENT_ENVIRONMENT;
        this.apiPort = API_PORT;
        this.allowedCorsDomains = CORS_ALLOWED;
        this.underMaintenance = MAINTENANCE_MODE === '1';
        this.dbHost = DB_HOST;
        this.dbPort = DB_PORT;
        this.dbName = DB_NAME;
        this.dbUser = DB_USER;
        this.dbPassword = DB_PASSWORD;
        this.dbDialect = DB_DIALECT as unknown as dialect;
    }

    /**
     * returns boolean value to indicate if error
     * has occurred in parsing the env variables
     *
     * @returns {boolean} value indicating if error has occurred
     */
    public hasErrors(): boolean {
        return Boolean(this.errors.length);
    }

    // /**
    //  * sets the value of any key to undefined
    //  *
    //  * @param {string} key
    //  * @returns {undefined}
    //  */
    // private setUndefined(key: string): undefined {
    //     this.errors.push(`Environment variable ${key} is not defined`);
    //     return undefined;
    // }
    //
    // /**
    //  * extracts string from process.env
    //  *
    //  * @param {string} key
    //  * @returns {string | undefined}
    //  */
    // private stringFromEnv(key: string): string | undefined {
    //     const rawValue = process.env[key]?.trim();
    //     if (rawValue === undefined) {
    //         return this.setUndefined(key);
    //     }
    //     return rawValue;
    // }
    //
    // /**
    //  * extracts number from process.env
    //  *
    //  * @param {string} key
    //  * @returns {number|undefined}
    //  */
    // private numberFromEnv(key: string): number | undefined {
    //     const rawValue = process.env[key]?.trim();
    //     const value = Number(rawValue);
    //
    //     if (rawValue === undefined) {
    //         return this.setUndefined(key);
    //     }
    //
    //     if (!isNaN(value)) {
    //         return value;
    //     } else {
    //         this.errors.push(
    //             `Environment variable ${key} is not a valid number: ${rawValue}`
    //         );
    //         return undefined;
    //     }
    // }
    //
    // /**
    //  * extracts array from process.env
    //  *
    //  * @param {string} key
    //  * @returns {string[] | undefined}
    //  */
    // private arrayFromEnv(key: string): string[] | undefined {
    //     const rawValue = process.env[key]?.trim().split(",");
    //     if (rawValue === undefined) {
    //         return this.setUndefined(key);
    //     }
    //     return rawValue;
    // }
    //
    // /**
    //  * extracts array of urls from process.env
    //  *
    //  * @param {string} key
    //  * @returns {string[] | undefined}
    //  */
    // private arrayOfUrlsFromEnv(key: string): string[] | undefined {
    //     const rawValue = this.arrayFromEnv(key);
    //     if (rawValue === undefined) {
    //         return this.setUndefined(key);
    //     }
    //     return rawValue.map((url) => {
    //         const u = new URL(url);
    //         return `${u.protocol}//${u.host}`;
    //     });
    // }
    //
    // /**
    //  * extracts url from process.env
    //  *
    //  * @param {string} key
    //  * @returns {string | undefined}
    //  */
    // private urlFromEnv(key: string): string | undefined {
    //     const rawValue = process.env[key]?.trim();
    //     // rawValue?.replace(/\/$/, ""); // No trailing slash
    //     if (rawValue === undefined) {
    //         return this.setUndefined(key);
    //     }
    //     const u = new URL(rawValue);
    //     return `${u.protocol}//${u.host}`;
    // }
    //
    // /**
    //  * extracts boolean from process.env
    //  *
    //  * @param {string} key
    //  * @param {boolean} defaultValue
    //  * @returns {string | undefined}
    //  */
    // private booleanFromEnv(
    //     key: string,
    //     defaultValue?: boolean
    // ): boolean | undefined {
    //     const rawValue = process.env[key]?.trim();
    //
    //     if (rawValue === undefined && defaultValue !== undefined) {
    //         return defaultValue;
    //     }
    //
    //     const numberValue = Number(rawValue);
    //     if (Number.isNaN(numberValue)) {
    //         this.errors.push(`Environment variable ${key} is not a valid boolean`);
    //         return undefined;
    //     }
    //     return Boolean(Number(rawValue));
    // }
}

export const environment = new Environment();
export default environment;