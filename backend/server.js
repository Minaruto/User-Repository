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