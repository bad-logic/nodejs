

/**
 * establishes database connection
 * @returns {void}
 */
export const DatabaseLoader = async(): Promise<void> => {
    return new Promise(async(resolve,reject)=>{
        try{
            // @ts-ignore
            import { pgDataSource } from "./datasource";
            await pgDataSource.initialize();
            console.info("successfully connected to database  ✔️");
            resolve();
        }catch (err){
            console.error("❌ Unable to load environment variables");
            reject(err);
        }
    })
};



