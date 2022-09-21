import connect from "../../../lib/database";
import User from "../../../models/User";

export default async function updateProfile(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connect();
        console.log('CONNECTED TO MONGO');
    
        console.log(req.body.cloud_url);
        console.log(req.body.googid);
        const test = await User.findOneAndUpdate(
            { googid: req.body.googid },
            {
              cloud_url: req.body.cloud_url,
            }
        );
        console.log('UPDATED');
        res.json({ 'testpoo': 'pootest' });

        // res.redirect('/')
      } catch (error) {
        console.log(error);
        res.json({ error });
      }
}
