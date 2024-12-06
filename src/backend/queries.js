const Router = require('express');
const {Instance, thatOnePullFunction} = require ('./utils');

const router = Router();

// BUG: Switching tabs fast enough can result in crashing instance.

const advice = new Instance("Posts", "advice");
router.get('/advice', async(req, res) => {
    thatOnePullFunction(advice, req, res);
});

const resources = new Instance("Posts", "resources");
router.get('/resources', async(req, res) => {
    thatOnePullFunction(resources, req, res);
});

const limbo = new Instance("Posts", "limbo");
router.get('/limbo', async(req, res) => {
    thatOnePullFunction(limbo, req, res);
});

module.exports = router;
