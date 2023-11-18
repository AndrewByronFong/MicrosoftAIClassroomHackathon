const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');

dotenv.config();

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const secretValue = process.env.SECRET;

    if (!secretValue) {
        console.error('Error: SECRET environmental variable is not set.');
        res.status(500).send('Internal Server Error');
        return;
    }

    res.render('index', { secretValue });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
