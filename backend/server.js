const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const redis = require('redis');

const app = express();
const client = redis.createClient(6379); // Configure as needed
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Search GitHub users
app.post('/api/search', async (req, res) => {
    const { searchText } = req.body;
    const cacheKey = `search:${searchText}`;

    // Try to fetch from cache
    client.get(cacheKey, async (err, cachedData) => {
        if (err) throw err;

        if (cachedData) {
            return res.json({ source: 'cache', data: JSON.parse(cachedData) });
        } else {
            // Fetch from GitHub API
            try {
                const response = await fetch(`https://api.github.com/search/users?q=${searchText}`);
                const data = await response.json();
                client.setex(cacheKey, 7200, JSON.stringify(data.items)); // Cache for 2 hours
                res.json({ source: 'api', data: data.items });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
    });
});