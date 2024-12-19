import { Router } from 'express';
import boatService from '../services/boatService.js';
//import { getErrorMessage } from '../utils/errorUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const boatController = Router();


boatController.get('/api/boats', async (req, res) => {
    const boats = await boatService.getAll();
    console.log(boats);
    res.json(boats);
});


boatController.get('/api/boats/:boatId', async (req, res) => {
    const boatId = req.params.boatId;
    const boat = await boatService.getOne(boatId).lean();
    // const isOwner = boat.owner && boat.owner.toString() === req.user?._id;

    res.json(boat);
});

boatController.post('/api/create', async (req, res) => {
    const boatData = req.body;
    console.log(req.body);
    const userId = req.user._id;
    try {
        await boatService.create(...boatData, userId);
    } catch (err) {
        console.log(err);
    }
});
// boatController.post('/:boatId/edit', isAuth, async(req, res, next) => {
//     const boatData = req.body;
//     const boatId = req. params.planetId;

//     await boatService.edit(boatId, boatData);

//     next();
// });

export default boatController;