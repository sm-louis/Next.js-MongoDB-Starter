import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
const ObjectId = require('mongodb').ObjectId; 
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const { type } = req.query
    console.log(type)
     
    const media = await req.db
                    .collection('medias')
                    .find( { type: type } ).toArray()
    res.send({
        status: 200,
        message: 'Get media successfully',
        media: media
    })
})

export default handler