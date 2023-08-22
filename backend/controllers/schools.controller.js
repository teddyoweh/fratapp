const Schools = require("../models/Schools");


async function searchSchools(req, res) {
    
    try {
        const searchTerm = req.body.search;
        const searchResults = await Schools.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { shortname: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        console.log(searchResults)
        res.status(200).json(searchResults);
    } catch (error) {
        console.error("Error during school search:", error);
        res.status(500).json({ error: "An error occurred while searching for schools." });
    }
}

module.exports = {
    searchSchools
};
