const {query} = require('./db');
const {ObjectId} = require('mongodb');

module.exports = function(app) {
    app.delete('/notes/:noteId', (req, res) => {
        query('deleteOne', {_id: ObjectId(req.params.noteId)}).then((collection, client) => {
            res.send(200);
        })
    
    });
    app.get('/notes', (req, res) => {
        query('find', {}).then(result => {
            result.toArray(function(err,result) {
                res.send(JSON.stringify(result));
            });
        });
    })
    app.post('/notes', (req, res) => {
        const {body, title} = req.body;

        query('insertOne', {body, title}).then(id => {
            res.send({id});
        });
    });
    app.put('/notes/:noteId', (req, res) => {
        query('findOneAndUpdate', {_id: ObjectId(req.params.noteId), $set: {
            body: req.body.body,
            title: req.body.title
        }}).then(() => {
            res.status(200);
        });
    });
}