const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist/estoque-manager')));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/estoque-manager/index.html'));
});


app.listen(process.env.PORT || 8000);
