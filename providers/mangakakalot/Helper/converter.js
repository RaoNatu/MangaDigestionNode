const { createFolder } = require('./downloader');
const PDFdocument = require('pdfkit');
const fs = require('fs');
const util = require('util');
const readdirAsync = util.promisify(fs.readdir);
const rmAsync = util.promisify(fs.rm);

// Creating an object name doc of class PDFdocument
const doc = new PDFdocument({
    autoFirstPage: false    // disabling the first autopage of pdf
});

async function convertSingle(mangaName, chapterName) {
    try {
        chapterName = chapterName.replace(/[:\/\\|<>?*"]/g, '');   // Removing any special symbol that can lead to error in folder creation
        createFolder(`./pdfs/${mangaName}`);    // creating a folder of manga name to store pdfs
        const fileList = await readdirAsync(`./images/${mangaName}/${chapterName}/`);    // Reading chapter directory to read images
        const files = fileList.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));  // sorting the files in numeric order
        await pre(mangaName, chapterName, files);    // calling the pre function so the files are accessible
    }   catch (err) {
        console.error("Error during conversion: ", err);
    }
}

async function pre(mangaName, chapterName, files) {    // a temporary function to execute the pdf commands
    
    // console.log(files); //   check statement

    doc.pipe(fs.createWriteStream(`./pdfs/${mangaName}/${chapterName}.pdf`)); // will make a pipe from image stream to pdf as async
  
    //  looping through each image
    for(let file of files) {
        let img = doc.openImage(`./images/${mangaName}/${chapterName}/${file}`);  // Opening an image file and storing it in 'img' object
        doc.addPage({size: [img.width, img.height]}); // adding a new page to pdf same height and width as the image
        doc.image(img, 0, 0); // pasting the image on the pdf page
    //   console.log("Done!");  // check statement
    }
    doc.end();  // Closing the document, here, pdf.

    await new Promise((resolve) => {
        doc.on('end', () => {
            console.log("PDF Saved Successfully");
            rmAsync(`./images/${mangaName}/${chapterName}/`, { recursive: true });
            rmAsync(`./images/${mangaName}/`, { recursive: true });
            console.log("Images deleted successfully!");
            resolve();
        });
    });
}

exports.convertSingle = convertSingle;