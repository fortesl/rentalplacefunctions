const request = require('request');

module.exports = async function (context, myBlob) {
    context.log("JavaScript blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");

    const options = {
        url: "https://rentalplaceface.cognitiveservices.azure.com/face/v1.0/detect?returnFaceAttributes=emotion&returnFaceId=false",
        method: "POST",
        body: myBlob,
        headers: {
            "Content-Type": "appication/octet-stream",
            "Ocp-Apim-Subscription-Key": process.env.COGNITIVE_SERVICES || "7a3da4d72c1e4d77a336551b51b56e0b"
        }
    };

    request(options, (err, results) => {
        if (err) return context.done(err);

        context.bindings.imageAnalysis = {
            imageId: context.bindingData.name,
            analysis: JSON.parse(results.body)
        }

        context.log(results.body);

        context.done();

    });
};