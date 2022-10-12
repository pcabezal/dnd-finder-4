import connect from "../../../lib/database";
import User from "../../../models/User";

export default async function updateProfile(req, res) {
  const { method } = req;

  await connect();

  switch (method) {
    case 'PUT':
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
        const allUsers = await User.find({}) /* find all the data in our database */
        res.status(200).json( allUsers )
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
  }
}
