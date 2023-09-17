const { downloader } = require('../providers/mangakakalot/Helper/downloader')
const { convertSingle } = require('../providers/mangakakalot/Helper/converter')
const { delPDF } = require('../providers/mangakakalot/Helper/deleter')
const path = require('path')
const mimetype = require('mime')
const fs = require('fs')

module.exports = async (req, res) => {

    const mangaName = req.query.mangaName
    const chapName = req.query.chapName.replace(/[:\/\\|<>?*"]/g, '')
    const allChapterImages = JSON.parse(decodeURIComponent(req.query.allChapterImages))

    res.setHeader('Content-Disposition', `attachment; filename=${chapName}.pdf`)
    res.setHeader('Content-type', mimetype)

    await downloader(allChapterImages, mangaName, chapName)
    await convertSingle(mangaName, chapName)

    const pdfFilePath = path.resolve(__dirname, `../pdfs/${mangaName}/${chapName}.pdf`)
    const fileStream = fs.createReadStream(pdfFilePath)
    fileStream.pipe(res);
    console.log("File Sent!")

    delPDF(mangaName, chapName)

}