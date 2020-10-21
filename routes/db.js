const MongoClient = require("mongodb").MongoClient;

function query(method, query) {
    return new Promise((resolve, reject) => {
        return getCollection().then(([collection, client]) => {
            collection[method](query, function(err, result) {
                resolve(result);
                client.close();
            })
        });
    });
}

function getCollection() {
    return new Promise((resolve) => {
        const mongoClient = new MongoClient("mongodb+srv://dbUser:123@cluster0.ixdjv.mongodb.net/Notes?retryWrites=true&w=majority", { useNewUrlParser: true });

        mongoClient.connect((err, client) => {
            resolve([client.db('Notes').collection('Notes'), client]);
        });
    })
}

module.exports = {
    query, getCollection
}