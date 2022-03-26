const {User} = require("../models/user");

exports.changePassword = async (req, res) => {
     console.log(req.body)
     const user = await User.findOne({email: req.body.confirm})
     if (!user) {
          console.log('Bad user')
     } else {
          user.email = req.body.newPassword
          await user.save()
          // console.log(user)
          res.send('Password has been changed')
     }
}
