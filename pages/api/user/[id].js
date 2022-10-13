import connect from "../../../lib/database";
import User from "../../../models/User";

export default async function handler(req, res) {
    const {
      query: { id },
      method,
    } = req
  
    await connect()

    switch (method) {
        case 'PUT':
          try {
            const test = await User.findByIdAndUpdate(req.body.userId,
              { $push: { likes: req.body.id}}
            );
      
            res.json({ 'testpoo': 'pootest' });
          } catch (error) {
            console.log(error);
            res.json({ error });
          }
          break;
        case 'POST':
          try {
            const test = await User.findOneAndUpdate(
                { googid: req.body.googid },
                {
                  cloud_url: req.body.cloud_url,
                }
            );
      
            res.json({ 'testpoo': 'pootest' });
            // res.redirect('/profile')
          } catch (error) {
            console.log(error);
            res.json({ error });
          }
          break;
        case 'GET':
          try {

            const test = await User.findById(req.body.userId);
      
            res.status(200).json({ success: true, data: test })
          } catch (error) {
            console.log(error);
            res.json({ error });
          }
          break;
    }




}
