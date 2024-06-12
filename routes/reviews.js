const express = require('express');
const router = express.Router();
const path = require('node:path');
const { idIncrement } = require('../utils/utils');
const { log } = require('node:console');
const { MongoClient } = require('mongodb');

const publicPath = path.resolve(__dirname, '../public');

const url = 'mongodb+srv://d0638381640:22031991@cluster0.xshn7sj.mongodb.net/';
const dbName = 'myProject';
const client = new MongoClient(url);

async function getDataFromMongoDB() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const data = await collection.find({}).toArray();
    return data;
  } catch (err) {
    console.error('Error connecting to MongoDB or fetching documents', err);
    return [];
  }
}

router.get('/', async (req, res) => {
  const data = await getDataFromMongoDB();
  res.render('reviews.hbs', {
    title: 'Відгуки',
    reviews: data
  });
});

router.post('/', async (req, res) => {
  log('req.body: ', req.body);
  log('req.files: ', req.files);
  log('-----------------');

  const data = await getDataFromMongoDB();

  const newObj = {
    // id: idIncrement(data),
    name: req.body.name,
    about: req.body.about,
    emoji: req.body.review_type,
  };

  // Проверка наличия req.body.review_type
if (!req.body.review_type) {
  return res.status(400).send('Оберіть тип враження.');
}

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  } else {
    let imgFile = req.files.img_file;
    let newFileName = new Date().toLocaleDateString('uk-UA').replaceAll('.', '-') + '_' + imgFile.name;
    let uploadPath = path.join(publicPath, 'img', newFileName);

    try {
      await imgFile.mv(uploadPath);
      console.log('"mv" success!');
      newObj.imgName = newFileName;
    } catch (err) {
      console.log('"mv" error: ', err);
      newObj.imgName = '';
    }
  }

  async function saveToMongoDB() {
    try {
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(dbName);
      const collection = db.collection('documents');
      await collection.insertOne(newObj);
      console.log('Document inserted');
    } catch (err) {
      console.error('Error connecting to MongoDB or inserting document', err);
    }
  }

  await saveToMongoDB();
  res.redirect('back');
});

module.exports = router;