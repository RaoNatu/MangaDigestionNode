const fs = require('fs').promises

async function delPDF(mangaName, chapName) {
    console.log("Entering...")
    const pdfFilePath = `./pdfs/${mangaName}/${chapName}.pdf`;
    const folderPath = `./pdfs/${mangaName}`;
    
    try {
        await fs.unlink(pdfFilePath);
        console.log("File Deleted!")

        await new Promise((resolve) => setTimeout(resolve, 2000));

        const files = await fs.readdir(folderPath)
        
        if (files.length === 0) {
            await fs.rmdir(folderPath)
            console.log("Folder Deleted!")
        }   else {
            console.log("Folder is not empty.")
        }
    }   catch(err) {
        console.log("Error: ", err)
    }
}

exports.delPDF = delPDF