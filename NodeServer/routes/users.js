const jwt = require("jsonwebtoken");
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
        readFile(data => {
            // add the new user
            const userId = req.params["id"];
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

    //login
    app.post('/login', (req, res) => {
        const privateKey = 'A7ImxyeSug3U2QpzqzPSIOysakgzYxerkY7yrHjWhVn59OhD2XeLOzz45pud8uVcfFJKZPOikyAkvKjICwFwi/zXeYKsVODf90UiP00WhwkXB0LFez3MVH+hRz161mXx9uU31gGW0A+pvx/5j0lUzWkqapdivpTsg7CIefNSvnjBhyWCoc9DxT+gy/24Jruf8bovsWXBjq19XYB2v9TuSHw1hdE25zAxEQQQGK19jChF3vUADbxOAXjM9PsDaDvsW5TYlizwz/PbcDcOkDgJzZXgZOpFRcZGP1oCSXxSA1NWeGqa3ZDQW5YTWYms3qczbENCHpejkdQd7aW8Swj/Sg==';
        try {
            // Get user input
            const { email, password } = req.body;
            // Validate user input
            if (!(email && password)) {
                res.status(200).send({
                    status: 'Fail',
                    message: "Login can not blank!"
                }
                );
                return;
            }
            // Validate if user exist in our database
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                const records = JSON.parse(data);
                console.log(records);
                userValidate = records.find(item => item.email == email && item.password == password)
                if (userValidate) {
                    const token = jwt.sign(
                        { user_id: userValidate.id, email },
                        privateKey,
                        {
                            expiresIn: "10h",
                        }
                    );
                    // save user token
                    userValidate.token = token;
                    console.log(userValidate);
                    res.status(200).json({
                        status: 'success',
                        data: userValidate
                    });
                } else {
                    res.status(200).send({
                        status: 'Fail',
                        message: "Invalid Credentials..Server Error"
                    });
                }
            });
        } catch (err) {
            res.status(200).send({
                status: 'Fail',
                message: "..Server Error"
            });

        }
    });
};

module.exports = userRoutes;
