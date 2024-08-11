const User = require('../models/user');

// Get all registered users
const registeredUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({ users: users });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Edit a user's details
const editUser = async (req, res) => {
    const userId  = req.params.id; console.log('user id******* ',req.params)
    const { name, phone_no, profession } = req.body;

    try {

        const updatedUser = await User.findByIdAndUpdate(
            {_id: userId}, 
            { name, phone_no, profession }, 
            { new: true } // Return the updated document
    );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    console.log(userId)

    try {
        const deletedUser = await User.deleteOne({_id:userId});

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = {
    registeredUsers,
    editUser,
    deleteUser
};
