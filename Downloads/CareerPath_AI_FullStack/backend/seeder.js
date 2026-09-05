import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { PAKISTANI_QUESTION_BANK } from './data/pakistaniQuestions.ts';
import { PAKISTANI_LECTURE_LIBRARY } from './data/learningHubData.ts';
import { ALL_CAREERPATH_RESOURCES } from './data/pathfinderLearningResources.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

// Generic schema keeps the seed data flexible as the source datasets evolve.
const genericSchema = new mongoose.Schema({}, { strict: false });
const getCollectionModel = (name, collection) =>
  mongoose.models[name] || mongoose.model(name, genericSchema, collection);

const datasets = [
  {
    name: 'StudentTest',
    collection: 'student_tests',
    data: JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'students_test.json'), 'utf-8')),
  },
  { name: 'QuestionBank', collection: 'question_bank', data: PAKISTANI_QUESTION_BANK },
  { name: 'LearningHubLecture', collection: 'learning_hub_lectures', data: PAKISTANI_LECTURE_LIBRARY },
  { name: 'CareerPathResource', collection: 'careerpath_resources', data: ALL_CAREERPATH_RESOURCES },
];


const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Atlas Connected Successfully!');

    for (const dataset of datasets) {
      const Model = getCollectionModel(dataset.name, dataset.collection);
      await Model.deleteMany({});
      if (dataset.data.length > 0) {
        await Model.insertMany(dataset.data);
      }
      console.log(`${dataset.collection}: ${dataset.data.length} records uploaded`);
    }

    console.log('All datasets successfully uploaded to MongoDB Atlas!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error importing data:', err.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

importData();