import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../../middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.post((req, res) => {
    const { data } = req.body
    const type = data.type
    delete data.type

    return req.db
            .collection('medias')
            .insertOne({
                type: type,
                data: data,
                views: 0,
                viewTime: new Date()
            })
            .then(() => {
                res.status(200).send({
                    status: 'ok',
                    message: 'media data inserted successfully',
                });
            })
})

export default handler;