const {Storage} = require('@google-cloud/storage');
const stream = require('stream');
const fs = require('fs');
const v = 0.04;

function main(fileLocation, bucketName, destFileName, keyFile) {

  const storage = new Storage({keyFilename: keyFile});

  const myBucket = storage.bucket(bucketName);
  const file = myBucket.file(destFileName);

  function readFromFile(filePath) {
    const readableStream = fs.createReadStream(filePath);

    readableStream.on('error', function (error) {
        console.log(`error: ${error.message}`);
    })

    readableStream.on('data', (chunk) => {
        console.log(chunk);
    })
  }

  async function uploadFile(){
    await myBucket.upload(fileLocation, {
     destination: destFileName,
   });
  }

  uploadFile().catch(console.error);
}

//FIXME::
//argv.lenght return all line arguments, need to count only after command name
if (process.argv.length < 3) {
  console.error(process.argv.length);
  console.error('Expected at least one argument!');
  process.exit(1);
}else{
  console.log('Arguments Accepted');
  main(...process.argv.slice(2));
}
