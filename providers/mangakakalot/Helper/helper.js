// const prompt = require('prompt-sync')({ sigint: true });    // Inporting prompt-sync to get input in Node JS

// This function will traverse manga titles and URLs JSON. And will display it.
function printMangaName(mangaList) {
    console.log("List of searched Mangas: ");  // Message to send
    for(let index = 0; index < mangaList.length; index ++) {
        console.log(`${index + 1}. ${mangaList[index].name}`)
    }
}

function printChapterName(allMangaChapInfo) {
    console.log("List of Manga Chapters: ");
    Object.keys(allMangaChapInfo).forEach((value, index) => {
        console.log(`${index + 1}. ${allMangaChapInfo[value].chapName}`);   // Printing the chapName
    });
}

function getUserChoice(mangaTitlesURLs) { 
    const choice = prompt("Enter your choice: ");   // Getting user choice
    return choice;  // returning user choice
}

// This will return [ 'Grand Blue', 'https://readmanganato.com/manga-uo972223' ]
function returnChosenMangaNameURL(mangaTitlesURLs, choiceOfManga) {
    return [ Object.keys(mangaTitlesURLs)[choiceOfManga - 1], mangaTitlesURLs[Object.keys(mangaTitlesURLs)[choiceOfManga - 1]] ]; // returning URL of chosen manga
}

function returnChosenChapNameURL(allMangaChapInfo, choiceOfChap) {
    return [ allMangaChapInfo[choiceOfChap - 1].chapName, allMangaChapInfo[choiceOfChap - 1].chapURL ];
}

exports.printMangaName = printMangaName;
exports.getUserChoice = getUserChoice;
exports.returnChosenMangaNameURL = returnChosenMangaNameURL;
exports.printChapterName = printChapterName;
exports.returnChosenChapNameURL = returnChosenChapNameURL;
