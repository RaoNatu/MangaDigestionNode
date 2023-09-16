const { searchManga, getMangaInfo, getChaptersInfo, getChapterImagesInfo } = require('./API/mangakakalot');
const { printMangaName, getUserChoice, returnChosenMangaNameURL, printChapterName, returnChosenChapNameURL } = require('./Helper/helper');
// const { downloader } = require('./Helper/downloader');
// const { convertSingle } = require('./Helper/converter');

async function startMangakakalot() {
    const mangaName = "Grand Blue";  // Getting manga name

    // Working with Manga
    // const mangaList = await searchManga(mangaName);  // Passing the manga name to get related manga titles and URLs
    // printMangaName(mangaList);
    // const choiceOfManga = getUserChoice(mangaTitlesURLs);    // Get user choice of manga
    // const chosenMangaNameURL = returnChosenMangaNameURL(mangaTitlesURLs, choiceOfManga);    // This will return the chosen manga URL... [ 'Grand Blue', 'https://readmanganato.com/manga-uo972223' ]
    // const mangaDetails = await getMangaInfo(chosenMangaNameURL);   // Getting manga information { mangaName, alterName, author(s), genre(s), description, coverURL }

    // // // Working with Chapters
    // const allMangaChapInfo = await getChaptersInfo(chosenMangaNameURL);   // Getting manga chapter information { 0: { chapName, chapURL }, 1: { chapName, chapURL } ... }
    // printChapterName(allMangaChapInfo); // Printing Manga Chapter Names
    // console.log(allMangaChapInfo);
    // const choiceOfChap = getUserChoice();   // Get user choice of chapter
    // const chosenChapNameURL = returnChosenChapNameURL(allMangaChapInfo, choiceOfChap);    // This will return the chosen chap URL... [ 'Chapter 86', 'https://chapmanganato.com/manga-uo972223/chapter-86' ]

    // // Working with Images/Pages
    // const allChapterImages = await getChapterImagesInfo(chosenChapNameURL); // returning [ https://...1-0.jpg, https://...2-0.jpg, ... ];

    // // Downloading images
    // await downloader(allChapterImages, chosenMangaNameURL[0], chosenChapNameURL[0]); // This function will download images of one chapter only

    // // Converting images to pdf
    // await convertSingle(chosenMangaNameURL[0], chosenChapNameURL[0]);   // This function will convert only one chapter to pdf
}

startMangakakalot();