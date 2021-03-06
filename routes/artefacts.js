const express = require('express');
const HttpStatus = require('http-status-codes');

const { save, get, remove } = require('../util/db');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    const item = await save('artefact', req.body);
    res.location(`/artefacts/${item._id}`);
    res.status(HttpStatus.CREATED).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await get('artefact');
    res.status(HttpStatus.OK).json(result);
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.put('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    const existingArtefacts = await get('artefact');
    console.log(existingArtefacts);
    console.log(req.body);
    const newArtefacts = req.body.filter(
      (newArtefact) =>
        !existingArtefacts.some(
          (existingArtefact) =>
            newArtefact.xCoord === existingArtefact.xCoord &&
            newArtefact.yCoord === existingArtefact.yCoord
        )
    );
    console.log(newArtefacts);
    // eslint-disable-next-line no-restricted-syntax
    for (const newArtefact of newArtefacts) {
      // eslint-disable-next-line no-await-in-loop
      await save('artefact', newArtefact);
    }
    res.status(HttpStatus.OK).json(newArtefacts.length);
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!req.body) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    const toUpdate = req.body;
    toUpdate._id = req.params.id;
    await save('artefact', toUpdate);
    res.status(HttpStatus.NO_CONTENT).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await remove('artefact', req.params.id);
    if (!deleted) {
      res.status(HttpStatus.NOT_FOUND).end();
      return;
    }
    res.status(HttpStatus.NO_CONTENT).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
