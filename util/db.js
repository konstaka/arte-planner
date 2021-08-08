const Artefact = require('../models/Artefact');
const Artesweep = require('../models/Artesweep');
const Catapoint = require('../models/Catapoint');
const Treasury = require('../models/Treasury');

const entities = {
  artefact: Artefact,
  artesweep: Artesweep,
  catapoint: Catapoint,
  treasury: Treasury,
};

const save = async (entityType, entity) => {
  const EntityModel = entities[entityType];
  // Find possibly existing entity
  let savedEntity = await EntityModel.findById(entity._id);
  if (savedEntity) {
    // Update existing entity
    savedEntity = await EntityModel.findByIdAndUpdate(entity._id, entity);
  } else {
    // Adding new entity
    savedEntity = await new EntityModel(entity).save();
  }
  return savedEntity;
};

const get = async (entityType) => {
  const EntityModel = entities[entityType];
  const result = await EntityModel.find();
  return result;
};

const getOne = async (entityType, id) => {
  const EntityModel = entities[entityType];
  const result = await EntityModel.findById(id);
  return result;
};

const remove = async (entityType, id) => {
  const EntityModel = entities[entityType];
  const res = await EntityModel.findByIdAndDelete(id);
  return res;
};

module.exports = {
  save,
  get,
  getOne,
  remove,
};
