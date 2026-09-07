import meiliClient from '../config/Meilisearch.js';

async function keywordSearch(userId, sessionId, fileId, query) {
    const documentsIndex = meiliClient.index('ai_brain_documents');
    const filters = [
        `userId = "${userId}"`,
        `sessionId = "${sessionId}"`
    ];
   

    if (fileId) {
        filters.push(`fileId = "${fileId}"`);
    }

    const results = await documentsIndex.search(query, {
        filter: filters
    });
   console.log("in keyword fn",results);
  

    return results.hits;
}

export default keywordSearch;