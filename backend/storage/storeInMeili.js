import meiliClient from "../config/Meilisearch.js"

const storeInMeili = async (chunks) => {

   console.log("hi")
    try{
        const createTask =
        await meiliClient.createIndex(
            "ai_brain_documents",
            {
                primaryKey: "id"
            }
        );

    await meiliClient.tasks.waitForTask(
        createTask.taskUid
    );

    const docIndex =
        meiliClient.index("ai_brain_documents");

    const docsTask =
        await docIndex.addDocuments(chunks);

    await meiliClient.tasks.waitForTask(
        docsTask.taskUid
    );

    const filterTask =
        await docIndex.updateFilterableAttributes([
            "userId",
            "sessionId",
            "fileId"
        ]);
    console.log(await docIndex.getFilterableAttributes())

   const taskResult =
    await meiliClient.tasks.waitForTask(
        filterTask.taskUid
    );

console.log(taskResult);
    }catch(e){
        console.log(e);
    }

    
};
export default storeInMeili