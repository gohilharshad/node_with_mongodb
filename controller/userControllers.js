const User = require('../model/userModel');

const addUser = async (req, res) => {
    try {
        const { name, age } = req.body;
        if (!name || !age) {
            return res.status(400).json({ message: 'Name and age are required fields.' });
        }

        const data = new User({
            name: name,
            age: age
        })

        data.save().then(function (data) {
            res.status(200).json(data);
        }).catch(function (error) {
            res.status(400).json({ error: error.message });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserListWithFilter = async (req, res) => {
    const { name, sort, page, limit } = req.query;
    try {
        const currentPage = parseInt(page) || 1;
        const limit1 = parseInt(limit) || 10;
        const startIndex = (parseInt(currentPage) - 1) * parseInt(limit1);

        let query = {};
        if (name) {
            query = { ...query, name: { $regex: name, $options: 'i' } };
        }

        let sortOptions = {};
        if (sort) {
            sortOptions = { age: sort === 'asc' ? 1 : -1 };
        }

        const users = await User.find(query).sort(sortOptions).skip(startIndex).limit(limit1).exec();
        const totalCount = await User.countDocuments(query).exec();
        const pageCount = Math.ceil(totalCount / limit1);

        const results = {};
        if (currentPage < pageCount) {
            results.next = {
                page: currentPage + 1,
                limit: limit1,
            };
        }

        if (currentPage > 1) {
            results.previous = {
                page: currentPage - 1,
                limit: limit1,
            };
        }
        res.json({ total: totalCount, currentPage: currentPage, total_page: pageCount, users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { addUser, getUserListWithFilter }