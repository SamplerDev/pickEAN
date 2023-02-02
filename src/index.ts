import  express  from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import {AppDataSource} from "./schema/db"


const app = express();

app.use('/graphql', graphqlHTTP(

    {
        graphiql: true,
        schema: schema,


    },

))


async function main() {
   
    app.listen(3001)
    console.log('corriendo app en el puerto 3001')

    AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
}

main();