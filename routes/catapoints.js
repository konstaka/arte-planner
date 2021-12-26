const express = require('express');
const HttpStatus = require('http-status-codes');
// const Village = require('../models/Village');
const { save, get, remove } = require('../util/db');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    const newEntity = req.body;
    // const matchingVillage = await Village.findOne({
    //   xCoord: newEntity.xCoord,
    //   yCoord: newEntity.yCoord,
    // });
    // if (matchingVillage) {
    //   newEntity.player = matchingVillage.playerName;
    // }
    const item = await save('catapoint', newEntity);
    res.location(`/catapoints/${item._id}`);
    res.status(HttpStatus.CREATED).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await get('catapoint');
    res.status(HttpStatus.OK).json(result);
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
    // const matchingVillage = await Village.findOne({
    //   xCoord: toUpdate.xCoord,
    //   yCoord: toUpdate.yCoord,
    // });
    // if (matchingVillage) {
    //   toUpdate.player = matchingVillage.playerName;
    // }
    await save('catapoint', toUpdate);
    res.status(HttpStatus.NO_CONTENT).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await remove('catapoint', req.params.id);
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
