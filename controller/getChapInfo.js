const { getChapterImagesInfo } = require('../providers/mangakakalot/API/mangakakalot')

module.exports = async (req, res) => {
    const url = req.query.url
    const mangaName = req.query.mangaName
    const chapName = req.query.chapName
    const allChapterImages = await getChapterImagesInfo(url)

    res.render(`waitingDownload`, {
        url: url,
        mangaName: mangaName,
        chapName: chapName,
        allChapterImages: allChapterImages
    })
}   