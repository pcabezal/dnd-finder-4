import connect from "../../../lib/database";
import User from "../../../models/User";

export default async function updateBio(req, res) {
    try {
        await connect();

        const test = await User.findOneAndUpdate(
            { googid: req.body.googid },
            {
              profile_bio: req.body.profile_bio,
            }
        );

        res.json({ 'testpoo': 'pootest' });
        // res.redirect('/profile')
      } catch (error) {
        console.log(error);
        res.json({ error });
      }
}
