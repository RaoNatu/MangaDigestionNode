const { getMangaInfo, getChaptersInfo } = require('../providers/mangakakalot/API/mangakakalot')

module.exports = async (req, res) => {
    const url = req.params.url
    const mangaInfo = await getMangaInfo(`https://chapmanganato.com/${url}`)
    const chapterInfo = await getChaptersInfo(`https://chapmanganato.com/${url}`)
    let pageNumber = req.query.page
    let pageCount = Math.ceil(Object.keys(chapterInfo).length / 10)

    if (!pageNumber) {
        pageNumber = 1
    }

    if (pageNumber > pageCount) {
        pageNumber = pageCount
    }

    res.render('chapters', {
        mangaInfo: mangaInfo,
        chapterInfo: Object.values(chapterInfo).slice(pageNumber * 10 - 10, pageNumber * 10),
        url: url,
        pageCount: pageCount,
        pageNumber: pageNumber
    })
}