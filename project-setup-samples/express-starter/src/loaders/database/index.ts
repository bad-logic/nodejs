import  pgDataSource  from "./datasource";


/**
 * establishes database connection
 * @returns {void}
 */
export const DatabaseLoader = async(): Promise<void> => {
    return new Promise(async(resolve,reject)=>{
        try{
            await pgDataSource.initialize();
            console.info("✅ connected to database");
            resolve();
        }catch (err){
            console.error("❌ Unable to load environment variables");
            reject(err);
        }
    })
};



