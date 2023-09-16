const { searchManga } = require('../providers/mangakakalot/API/mangakakalot')

module.exports = async (req, res) => {
    const mangaName = req.query.mangaName
    const mangaList = await searchManga(mangaName)
    let pageCount = Math.ceil(mangaList.length / 9)
    let pageNumber = req.query.page

    if (!pageNumber) {
        pageNumber = 1
    }
    if (pageNumber > pageCount) {
        pageNumber = pageCount
    }

    res.render('results', {
        mangaList: mangaList.slice(pageNumber * 9 - 9, pageNumber * 9),
        pageCount: pageCount,
        mangaName: mangaName,
        pageNumber: pageNumber
    })
}