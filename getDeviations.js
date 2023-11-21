const { DOMParser } = require('xmldom');
const axios = require('axios');
const { parseString } = require("xml2js");

const getDeviations = async (url, limit, start) => {
    console.log(limit, start)
    let object = {};
  
    const result = await axios.get(url)
        .then(async (response) => {
            const xmlString = response.data;

             parseString(xmlString, async function (err, results) {
          
                const items = results.rss.channel[0].item;
                for (let i = 0; i < items.length; i++) {
                    
                    if (i < start) continue;
                    if (limit && i === start + limit) break;
                    object = {
                        title: items[i].title[0],
                        image: items[i]["media:content"][0]["$"].url,
                        next_page:results.rss.channel[0]["atom:link"][1]["$"].href,
                        width:items[i]["media:content"][0]["$"].width,
                        height:items[i]["media:content"][0]["$"].height,
                        medium:items[i]["media:content"][0]["$"].image,
                    };

                }

            });

        })
        .catch((error) => {
            console.error('Hata:', error);
        });


    return object;

}


module.exports = getDeviations;



