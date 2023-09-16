const cheerio = require("cheerio");
const pretty = require("pretty");
const axios = require("axios");
const URL = "https://mangakakalot.com/search/story/";


// Get the searched manga results
async function searchManga(mangaName) {
    try {
        mangaName = mangaName.replace(/[!@#$%^&*()\/{},-;'" ]/g, "_");  // replacing special symbols with underscore of manga name
        const { data } = await axios.get(URL + mangaName);    // Getting page markup
        
        // Fetching Manga Title and Manga URL
        const $ = cheerio.load(data);

        // Initialize an array to store manga objects
        const mangaList = [];

        // Iterate through each story item and extract information
        $('.story_item').each((index, element) => {
            const mangaItem = {};
            mangaItem.name = $(element).find('h3.story_name a').text();
            mangaItem.URL = $(element).find('h3.story_name a').attr('href');
            mangaItem.imageUrl = $(element).find('img').attr('src');
            mangaItem.authors = $(element).find('span:contains("Author(s)")').text().replace('Author(s) : ', '');
            mangaItem.updatedDate = $(element).find('span:contains("Updated")').text().replace('Updated : ', '');
            
            // Push the manga object into the array
            mangaList.push(mangaItem);
        });

        return mangaList;    // Returning mangaTitlesURLs JSON
    }   catch(err) {
        console.log(err);
    }
}

// Get searched manga information. Information Contains { mangaName, alterName, author(s), genre(s), description, coverURL }
async function getMangaInfo(mangaURL) {
    // const mangaURL = mangaNameURL[1];   // Storing mangaURL

    const { data } = await axios.get(mangaURL);

    // Fetching Manga Details
    mangaDetails = {};
    const $ = cheerio.load(data);   // Parsing the markup to cheerio to convert it into DOM
    mangaDetails["mangaName"] = $(".story-info-right h1").text();   // Getting manga name
    const detailsArray = $(".table-value").text().split("\n");  // Getting details of manga and adding them to array
    mangaDetails["alterName"] = detailsArray[0];
    mangaDetails["author"] = detailsArray[1];
    mangaDetails["genre"] = detailsArray[2];
    mangaDetails["description"] = $(".panel-story-info-description").text().split("\n")[2]; // Getting description and adding it to the object
    mangaDetails["coverURL"] = $(".info-image img").attr("src");   // Getting Manga Cover image URL and adding it to the object
    mangaDetails["chapterURL"] = mangaURL;
    return mangaDetails;
}

// Get searched manga chapters information. Information Contains { 0: { chapName, chapURL }, 1: { chapName, chapURL } ... }
async function getChaptersInfo(mangaURL) {

    // const mangaURL = mangaNameURL[1];   // Storing mangaNameURL

    const { data } = await axios.get(mangaURL);

    // Fetching Manga Chapter Details
    allMangaChapDetails = {}    // Will store all chapter details
    const $ = cheerio.load(data);   // Parsing the markup to cheerio to convert it into DOM
    $(".row-content-chapter a").each((index, element) => {
        mangaChapDetails = {};  // Will store one chapter details
        mangaChapDetails["chapName"] = element.children[0].data;    // Getting Chapter name and adding it to mangaChapDetails
        mangaChapDetails["chapURL"] = element.attribs.href;    // Getting Chapter URL and adding it to mangaChapDetails
        allMangaChapDetails[index] = mangaChapDetails;
    });
    
    return allMangaChapDetails; // returning { 0: { chapName, chapURL }, 1: { chapName, chapURL } ... }
}

// Get chosen chapter pages/images. It will return a array of image URLs
async function getChapterImagesInfo(chapterURL) {
    // const chapterURL = chosenChapterNameURL[1];
    const { data } = await axios.get(chapterURL);  
    allChapterImages = [];  // This will store all the image URLs
    const $ = cheerio.load(data);   // Parsing the markup to cheerio to convert it into DOM
    $(".container-chapter-reader img").each((index, element) => {
        allChapterImages[index] = element.attribs['src'];   // Getting image URLs and adding it to allChapterImages
    });

    return allChapterImages;    // returning [ https://...1-0.jpg, https://...2-0.jpg, ... ];
}

exports.searchManga = searchManga;
exports.getMangaInfo = getMangaInfo;
exports.getChaptersInfo = getChaptersInfo;
exports.getChapterImagesInfo = getChapterImagesInfo;
