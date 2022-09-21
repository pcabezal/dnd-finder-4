import connect from "../../../lib/database";
import User from "../../../models/User";

export default async function updateProfile(req, res) {
    try {
        await connect();

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
}