const {query, getCollection} = require('./db');
const {ObjectId} = require('mongodb');

module.exports = function(app) {
    app.delete('/notes/:noteId', (req, res) => {
        query('deleteOne', {_id: ObjectId(req.params.noteId)}).then((collection, client) => {
            res.send(200);
        })
    
    });
    app.get('/notes', (req, res) => {
        getCollection().then(([collection, client]) => {
            collection.find({}).toArray(function(err, result) {
                res.send(JSON.stringify(result));
                client.close();
            });
        });
    })
    app.post('/notes', (req, res) => {
        const {body, title} = req.body;

        query('insertOne', {body, title}).then(result => {
            res.send({id: result.insertedId});
        });
    });
    app.put('/notes/:noteId', (req, res) => {
        console.log()
        getCollection().then(([collection, client]) => {
            collection.findOneAndUpdate({_id: ObjectId(req.params.noteId)}, {$set: {
                body: req.body.body,
                title: req.body.title
            }}, function(err, result) {
                res.status(200); 
                client.close();
            });
        });
    });
}