const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Use cors middleware
app.use(cors());


// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: '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'
});

// Middleware
app.use(bodyParser.json());

// Route for ChatGPT API
app.post('/chat', async (req, res) => {
    const { query } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: query }],
            model: "gpt-3.5-turbo",
        });

        res.json({ response: completion.choices[0].message.content.trim() });
    } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
