const { IgApiClient } = require('instagram-private-api');
const { get } = require("request-promise");
const getDeviations = require("./getDeviations");
const ImageCount = require("./models/ImageCount");

const postToInsta = async () => {

    const ig = new IgApiClient();

    try {
        ig.state.generateDevice(process.env.IG_USERNAME);
        await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    } catch (error) {
        console.log(error)
    }

    let imageCount = await ImageCount.findOne();

    if (!imageCount) {
        imageCount = await ImageCount.create({
            count: 0,
            next_page: "https://backend.deviantart.com/rss.xml?type=deviation&q=gallery"
        })
    }


    const image = await getDeviations(imageCount.next_page, 1, imageCount.count);



    if (imageCount.count == 59) {
        imageCount.count = 0;
        imageCount.next_page = image.next_page;

    } else {
        imageCount.count = imageCount.count + 1;
    }


    const imageBuffer = await get({
        url: image.image,
        encoding: null
    });

    console.log(image)
    try {
        await ig.publish.photo({
            file: imageBuffer,
            caption: image.title
        });
    } catch (error) {
        console.log(error)
    } finally {
        try {
            await ig.account.logout();
            console.log("Logout successful");
        } catch (logoutError) {
            console.log("Logout error:", logoutError);
        }
    }

    imageCount.save();

}

module.exports = postToInsta;


