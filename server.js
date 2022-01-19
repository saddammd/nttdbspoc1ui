//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, 'nttdbs-poc1/dist/nttdbs-poc1')));

app.get('*', (req, res) => {
    res.sendFile(`./nttdbs-poc1/dist/nttdbs-poc1/index.html`); // load the single view file (angular will handle the page changes on the front-end)
});

//app.get('/*', function(req,res) {
//res.sendFile(path.join(__dirname,'dist','nttdbs-poc1','index.html'));
//});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);