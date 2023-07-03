const fps = require('fd/promise');
const B2 = require('backblaze-b2');

const {APPLICATION_KEY_ID, APPLICATION_KEY, BUCKET_ID, BASE_URL_BACKBLAZE} = process.env;

const b2 = new B2({
    applicationKeyId: APPLICATION_KEY_ID,
    applicationKey:APPLICATION_KEY 
  });

const unlinkasync = fsp.unLink;
  
class FileController {
    async upload(req, res) {
        const { filename, path } = req.file;

        try {

            const file = awaitfsp.readFile(`uploads/${filename}`, (err, data) => {
                if (err) {
                    throw err
                }
                return data;

            });

            await b2.authorize();

            const { data: {getUploadUrl, authorizationToken} } = awaitb2.getUploadUrl({
                bucketId: BUCKET_ID,
            });

            const { data} = await b2.uploadFile({
                uploadUrl: uploadUrl,
                uploadAuthToken: uploadAuthToken,
                fileName: fileName,
                data: file,
            })

            await unLinkAsync(path);

            return res.send({ url: `${BASE_URL_BACKBLAZE}${data.filename}`});
            
        } catch (error) {
            return res.send(400).send({ message: 'Failed to upload!'});
        }
     }
}

module.exports = new FileController();