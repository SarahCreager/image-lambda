// index.js file that is in my AWS creager-image-lambda function. 

const AWS = require('aws-sdk');
let s3 = new AWS.S3();

exports.handler = async (event) => {

  // what file was uploaded?
  const bucketName = event.Records[0].s3.bucket.name;
  const fileName = event.Records[0].s3.object.key;
  const fileSize = event.Records[0].s3.object.size;
  console.log(bucketName, fileName, fileSize);

  // what is in our current images.json in our bucket? (what bucket to get object from and name of file)
  const params = {
    Bucket: bucketName,
    Key: 'images.json',
  }

  // try to give them the manifest, if you can't create a new manifest. 
  try {
    // read what is in the images.json file, convert from buffer to readable object
    // JSON parses takes a string turn it back into an obejct
    const manifest = await s3.getObject(params).promise();
    let manifestData = JSON.parse(manifest.Body.toString());

    // add the name/ size/ type to our json file
    manifestData.push({
      name: fileName,
      size: fileSize,
      type: 'image',
    })

    console.log('current manifest:', manifestData);
    let manifestBody = JSON.stringify(manifestData);

    // write the file back to the bucket
    const newManifest = await s3.putObject({ ...params, Body: manifestBody, ContentType: 'application/json' }).promise();
    console.log('new manifest:', newManifest);

  } catch (e) {
    console.log(e);

    // if the manifest is not there create a new one
    const newManifest = {
      Bucket: bucketName,
      Key: 'images.json',
      Body: JSON.stringify([{ name: fileName, size: fileSize, type: 'image' }]),
      ContentType: 'application/json',
    }

    const manifest = await s3.putObject(newManifest).promise();
    console.log('JSON file created from bucket:', manifest);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
