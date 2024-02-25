import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  end_year: {
    type: String,
    default: '', // You can set a default value if needed
  },
  intensity: {
    type: Number,
    required: false,
  },
  sector: {
    type: String,
    required: false,
  },
  topic: {
    type: String,
    required: false,
  },
  insight: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  region: {
    type: String,
    default: '', // You can set a default value if needed
  },
  start_year: {
    type: String,
    default: '', // You can set a default value if needed
  },
  impact: {
    type: String,
    default: '', // You can set a default value if needed
  },
  added: {
    type: Date,
    required: false,
  },
  published: {
    type: Date,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  relevance: {
    type: Number,
    required: false,
  },
  pestle: {
    type: String,
    default: '', // You can set a default value if needed
  },
  source: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  likelihood: {
    type: Number,
    required: false,
  },
});

const Data = mongoose.model('Data', dataSchema);

export default Data;
