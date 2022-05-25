
const userRoutes = (app, fs) => {

    // variables
    const dataPath = './data/users.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.send(JSON.parse(data));
        });
    });
    app.get('/users/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            const records = JSON.parse(data);
            // console.log(records[0], req.params["id"])
            res.send(records.filter((i) => i.id == req.params["id"]));
        });
    });
    // CREATE
    app.post('/users', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            const newUserId = Date.now().toString();
            req.body.id = newUserId
            // add the new user
            data.push(req.body)
            console.log(data)
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/users/:id', (req, res) => {
        //const userId = req.params["id"];
        /*  res.setHeader('Access-Control-Allow-Origin', '*');
         res.setHeader('Access-Control-Allow-Methods', 'PUT');
         res.status(200).send(`users id:${userId} updated`); */
        readFile(data => {
            // add the new user
            const userId = req.params["id"];
            //data[userId] = req.body;
            //console.log(data)
            const records = data.map((items) => {
                if (items.id == userId) {
                    return req.body
                }
                return items;
            })
            console.log(records)
            writeFile(JSON.stringify(records, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/users/:id', (req, res) => {
        readFile(data => {
            // delete the user
            const userId = req.params["id"];
            console.log(userId);
            const record = data.filter(item => item.id != userId)
            writeFile(JSON.stringify(record, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    });
};

module.exports = userRoutes;
