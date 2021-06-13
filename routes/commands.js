const express = require('express');

const router = express.Router();
const HttpStatus = require('http-status-codes');
const Command = require('../models/Command');

router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    const command = await new Command(req.body).save();
    res.location(`/commands/${command._id}`);
    res.status(HttpStatus.CREATED).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/', async (req, res) => {
  try {
    let commands = [];
    if (req.authorizedUser.roles.include('admin')) {
      commands = await Command.find();
    } else {
      commands = await Command.find({
        $or: [
          { arteSweepAccount: { $in: req.authorizedUser.accounts } },
          { catapointAccount: { $in: req.authorizedUser.accounts } },
          { treasuryAccount: { $in: req.authorizedUser.accounts } },
        ],
      });
    }
    res.status(HttpStatus.OK).json(commands);
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Command.findByIdAndDelete(req.params.id);
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
