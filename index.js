const AWS = require("aws-sdk");
const uuid = require("uuid");

// Create unique bucket name
const bucketName = `node-sdk-sample-${uuid.v4()}`;
// Create name for uploaded object key
const keyName = "hello_world.txt";
const objBody = "Hello World!";

// Create a promise on S3 service object
const bucketPromise = new AWS.S3({ apiVersion: "2006-03-01" })
  .createBucket({ Bucket: bucketName })
  .promise();

// Handle promise fulfilled/rejected states
bucketPromise
  .then(function(data) {
    // Create params for putObject call
    var objectParams = {
      Bucket: bucketName,
      Key: keyName,
      Body: objBody
    };
    // Create object upload promise
    var uploadPromise = new AWS.S3({ apiVersion: "2006-03-01" })
      .putObject(objectParams)
      .promise();
    uploadPromise.then(function(data) {
      console.log(
        "Successfully uploaded data to " + bucketName + "/" + keyName
      );
    });
  })
  .catch(function(err) {
    console.error(err, err.stack);
  });
