const express = require('express')
const homePageController = require('./controller/homePage.js')
const searchMangaController = require('./controller/resultManga.js')
const searchMangaPageController = require('./controller/resultPageManga.js')
const getChaptersController = require('./controller/getChapter.js')
const getChapInfoController = require('./controller/getChapInfo.js')
const downloadController = require('./controller/downloadController.js')

const bodyParser = require('body-parser')
const app = express()

global.homePage = null

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(4000, (req, res) => {
    console.log("Server started at port 4000")
})

app.get('/', homePageController)
app.post('/results', searchMangaController)
app.get('/results', searchMangaPageController)
app.get('/chapters/:url', getChaptersController)
app.get('/getchapinfo', getChapInfoController)
app.get('/downlaod', downloadController)
app.use((req, res) => res.render('notFound'))