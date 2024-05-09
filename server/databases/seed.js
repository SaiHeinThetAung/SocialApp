const mongoose = require('mongoose');
const tagModel = require('../models/tagModel');
const slug = require('slug');
const languageModel = require('../models/languageModel');
require('dotenv').config();

(async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log('Connected to database');

        const tags = ['နည်းလမ်းများ'];
        const languages = ['Python', 'Java', 'Php', 'Javascript', 'Ruby', 'C'];

        await Promise.all(tags.map(async d => {
            await tagModel.create({
                slug: slug(d),
                name: d
            });
        }));
        await Promise.all(languages.map(async d => {
            await languageModel.create({
                slug: slug(d),
                name: d
            });
        }));

        console.log('Seeding completed');

        // Close database connection after seeding
        await mongoose.connection.close();
        console.log('Disconnected from database');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
})();
