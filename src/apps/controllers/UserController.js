const bcryptjs = require('bcryptjs');
const Users= require('../models/Users');

class UserController {
     async create(req,res) {
        const verifyUser = await Users.findOne({
            where: {
                email: req.body.email,
            }
        });

        if (verifyUser) {
            return res.status(400).json({ message : 'User already exists!'});
        }

        const user = await Users.create(req.body);
        if ( !user ) {
            return res.status(400).json({ message: 'Failed to create a user!'});
        }
        return res.send({ message: 'User created!' });
     }

     async update(req, res) {
        const {
          name, avatar, bio, gender, old_password, new_password, confire_new_password, 
        } = req.body;

        const user = await Users.findOne({
            where: {
                id: req.userId,
            },
        });

        if (!user) {
            return res.status(400).json({message: "User not exits!"});
        }

        const encryptPassword = '';

        if (old_password) {
            if (!await user.checkPassword(old_password)) {
                return res.status(401).json({ error: 'Old password does not match'});
            }

            if (!new_password  || !confirm_new_password) {
                return res.status(401).json({
                    error:'We need a new_password and confirm_new_password atributes!',
                });
            }

            if (new_password != confirm_new_password) {
                return res.status(401).json({
                    error: "New password and confirm new password does not match!",
                });
            }
            
            encryptPassword = await bcryptjs.hash(new_password);
        } 
        await Users.update (
            {
                name: name || user.name,
                avatar: avatar || user.avatar,
                bio: bio || user.bio,
                gender: gender || user.gender,
                password_hash: encryptPassword || user.password_hash,
            },
            {
                where: {
                    id: user.id,
                },
            },

        )
        return res.status(200).json({ message: "User updated!" });
     }

     async delete(req, res) {
        const userToDelete = await Users.findOne({
            where: {
                id: req.userId,
            },
        });

        if (!userToDelete) {
            return res.status(400).json({ message: "User not exists!"});
        }

        await Users.destroy({
            where: {
                id: req.userId,
            },
        });

        returnres.status(200).json({ message: 'User deleted!'});
     }

     async userProfile(req, res) {
        constuser = await User.findOne({
            atributes: ['id', 'name', 'user_name', 'email', 'avatar', 'bio', 'gender'],
            where: {
                id: req.userId,
            },
        });

        if (!user) {
            return res.status(400).json({ message: 'User not exists'});
        }

        const {
            id, name, user_name, email, avatar, bio, gender,
        } = user;

        return res.status(200).json({ 
            id, name, user_name, email, avatar, bio, gender
        });
     }
}
module.exports = new UserController();