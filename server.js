const express = require('express')
const app = express()
const path = require('path')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, './public')))

app.get('/', (req, res) => {
	res.render('pages/index')
})
app.listen(port)
console.log(`server on port: ${port}`)
