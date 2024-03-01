import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { createClient } from 'redis';

const app = express();
app.use(cors());
app.use(express.json());

//REDIS intialization
const client = createClient({
    url: 'redis://localhost:6379'
});
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Search GitHub users
app.post('/api/search', async (req, res) => {
    const { searchText } = req.body;
    const cacheKey = `search:${searchText}`;

    try {
        // Try to fetch from cache
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            return res.json({ source: 'cache', data: JSON.parse(cachedData) });
        }

        // Fetch from GitHub API
        const response = await fetch(`https://api.github.com/search/users?q=${searchText}`);
        if (!response.ok) {
            throw new Error('Failed to fetch from GitHub API');
        }
        const data = await response.json();

        const users = data.items.map(user => ({
            login: user.login,
            avatar_url: user.avatar_url
        }));
        
        // Cache the response
        await client.set(cacheKey, JSON.stringify(data.items), {
            EX: 7200 // Cache expiration in seconds (2 hours)
        });

        res.json({ source: 'api', data: users });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Clear cache endpoint
app.post('/api/clear-cache', async (req, res) => {
    try {
        await client.flushAll();  // Clears the entire Redis cache
        res.json({ message: "Cache cleared successfully" });
    } catch (error) {
        console.error('Error clearing cache:', error);
        res.status(500).json({ message: "Failed to clear cache" });
    }
});