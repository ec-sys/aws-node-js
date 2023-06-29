import {S3Client, GetObjectCommand} from '@aws-sdk/client-s3';

// console.log('Loading function');
//
// import {S3Client, GetObjectCommand} from '@aws-sdk/client-s3';
// const s3 = new S3Client({region: 'us-east-1'});
//
// exports.handler = function (event, context) {
//   console.log(event);
//   context.succeed('hello ' + event.eventName);
// };

// import {S3Client, GetObjectCommand} from '@aws-sdk/client-s3';
// const s3 = new S3Client({region: 'us-east-1'});

// export const handler = async (event, context) => {
//     //console.log('Received event:', JSON.stringify(event, null, 2));

//     // Get the object from the event and show its content type
//     const bucket = event.Records[0].s3.bucket.name;
//     const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
//     const params = {
//         Bucket: bucket,
//         Key: key,
//     };
//     try {
//         const { ContentType } = await s3.send(new GetObjectCommand(params));
//         console.log('CONTENT TYPE:', ContentType);
//         return ContentType;
//     } catch (err) {
//         console.log(err);
//         const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
//         console.log(message);
//         throw new Error(message);
//     }
// };

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  console.log(`Bucket: ${bucket}, Key: ${key}`);

  try {
    const object = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    console.log(`Object content: ${object.Body.toString()}`);
  } catch (err) {
    console.log(`Error getting object: ${err}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
};
