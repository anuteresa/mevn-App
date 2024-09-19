import { Request, Response } from 'express';
const Launch = require('../model/launchDetails');

module.exports = async function (req: Request, res: Response) {

    try {
        const result = new Launch(req.body);
        await result.save();
        res.status(201).json({ message: 'Saved launch details' });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Failed to save launch details' });
    }

}