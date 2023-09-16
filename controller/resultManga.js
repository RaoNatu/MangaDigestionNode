const { searchManga } = require('../providers/mangakakalot/API/mangakakalot')

module.exports = async (req, res) => {
    homePage = 'changed'
    let mangaName = req.body.name
    const mangaList = await searchManga(mangaName)
    let pageCount = Math.ceil(mangaList.length / 9)
    let pageNumber = req.params.page

    if (!pageNumber) {
        pageNumber = 1
    }
    if (pageNumber > pageCount) {
        pageNumber = pageCount
    }

    res.render('results', {
        mangaList: mangaList.slice(pageNumber * 9 - 9, pageNumber * 9),
        mangaName: mangaName,
        pageCount: pageCount,
        pageNumber: pageNumber
    })
}