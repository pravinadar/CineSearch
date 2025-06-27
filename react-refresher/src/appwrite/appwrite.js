import { Client, Databases, ID, Query } from "appwrite"

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const METRICS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_METRICS_COLLECTION_ID

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async (searchTerm, movie) => {
    // 1. check if the search term exists in the database
    try {
        const result = await database.listDocuments(DATABASE_ID, METRICS_COLLECTION_ID, [
            Query.equal("searchTerm", searchTerm)
        ])
        
        // 2. if it exists, increment the count
        if(result.documents.length > 0) {
            const doc=result.documents[0];
            
            await database.updateDocument(DATABASE_ID,METRICS_COLLECTION_ID,doc.$id,{
                count: doc.count + 1
            })
            // from the parameters we can say that
            // In the database (1st param), within the collection (2nd param), update the document (which will be found by its id) (3rd param) with new data (4th param)
            
        } else {
            // 3. if it doesn't exist, create a new document with count 1
            const newDoc = await database.createDocument(DATABASE_ID, METRICS_COLLECTION_ID, ID.unique(), {
                searchTerm: searchTerm,
                count: 1,
                movie_id: movie.id,
                posterURL: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            })
            // In the database (1st param), within the collection (2nd param), create a new document with a unique id (3rd param) and the data (4th param)

            // test if the document is created
            // console.log("New document created:", newDoc)
        }
    } catch (error) {
        console.error(error)
    }
}