// This module is used to download images/pages from website
// This module will be given an array of image/page URLs: { https://...1-0.jpg, https://...2-0.jpg, ... };

const axios = require("axios");
const fs = require("fs");
const util = require('util');

PATH = ''

function createFolder(path) {
    fs.mkdir(path, (err) => {
        if(err) {
            console.log("Error creating folder: ", err);
        }   else {
            console.log("Folder created successfully");
        }
    });
}

async function downloader(allChapterImagesURL, mangaName, chapterName) {
    
    // Creating folder for a particular manga
    chapterName = chapterName.replace(/[:\/\\|<>?*"]/g, '');
    PATH = `./images/${mangaName}/${chapterName}/`;
    createFolder(`./images/${mangaName}`);
    createFolder(`./images/${mangaName}/${chapterName}`);

    for(const imageURL of allChapterImagesURL) {
        await mangakakalotDownloader(imageURL);
    }
}

async function mangakakalotDownloader(imageURL) {
    try {
        imageName = imageURL.split('/').pop();   // getting the name of the image
        const response = await axios({  // getting the image data in a stream and sending a referer of mangakakalot because without it the image won't get downloaded
            method: 'GET',
            url: imageURL,
            responseType: 'stream',
            headers: {
                Referer: 'https://mangakakalot.com'
            }
        });
        const writer = fs.createWriteStream(PATH + imageName); // creating a write stream with the name of image
        response.data.pipe(writer); // getting the data response and writing it using a pipe

        await new Promise((resolve, reject) => {    // adding a promise to check if the writing is finished or not
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log(`${imageName} successful`); // printing a message
    }   catch(error) {
        console.log("Error dowloading Images: ", error.message);    // throwing error
    }
}

exports.downloader = downloader;
exports.createFolder = createFolder;

// res.setHeader('Content-Disposition', `attachment; filename=${chapName}.pdf`)
// res.setHeader('Content-type', mimetype)
// await downloader(allChapterImages, mangaName, chapName)
// await convertSingle(mangaName, chapName)

// const pdfFilePath = path.resolve(__dirname, `../pdfs/${mangaName}/${chapName}.pdf`)
// const fileStream = fs.createReadStream(pdfFilePath)
// fileStream.pipe(res);