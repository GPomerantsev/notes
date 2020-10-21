const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb+srv://dbUser:123@cluster0.ixdjv.mongodb.net/Notes?retryWrites=true&w=majority", { useNewUrlParser: true });

module.exports = {
    query(method, query) {
        return new Promise((resolve, reject) => {

            mongoClient.connect((err, client) => {
                const db = client.db('Notes');
                const collection = db.collection('Notes');

                console.log(method, query);

                collection[method](query, function(err, result) {
                    resolve(result);
                    // mongoClient.close();
                })
            });
        });
    }
}