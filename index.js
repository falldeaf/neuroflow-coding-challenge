//Web server setup
var express = require('express')
var app = express()
const port = process.env.PORT || 8080

//Static path
app.use('/', express.static('html/'))

//API'S - Temp, currently gets a file but would probably be connected to a DB
var fs = require('fs') //Temporarily needed for reading test json from disk
app.get('/api/audio', function(req, res) {
	res.setHeader('Content-Type', 'application/json')
	res.send(JSON.parse( fs.readFileSync("audio_files.json", 'utf8') ))
})

app.listen(port, () => console.log(`simple back-end listening on port ${port}!`))