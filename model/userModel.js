const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

insertUsers = async () => {
    try {
        const usersToInsert = [
            { name: 'John Doe', age: 25 },
            { name: 'Jane Smith', age: 30 },
            { name: 'Jane Smith1', age: 33 },
            { name: 'Jane Smith2', age: 35 },
        ];
        const result = await User.insertMany(usersToInsert);
        console.log(`${result.length} users inserted successfully!`);
    } catch (error) {
        console.error('Error inserting users:', error);
    }
}
insertUsers()

module.exports = User