import type { NextApiRequest, NextApiResponse } from 'next'
import { Entry } from '../../../models';
import { IEntry } from '../../../models/Entry';
import mongoose from 'mongoose';
import { db } from '../../../database';

type Data = 
{ message: string }
| IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method) {
        case 'PUT':
            return updateEntry(req, res);
        case 'GET':
            return getEntry(req, res);
        case 'DELETE':
            break;
        default:
            res.status(400).json({message: 'This endpoint was not implemented yet.'});
    }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    
    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ message: 'Wrong ID' });
    }

    await db.connect();
    
    const entry = await Entry.findById(id);

    if (!entry) {
        await db.disconnect();
        return res.status(404).json({message: 'Entry not found.'});
    }

    await db.disconnect();
    res.status(200).json(entry!);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ message: 'Wrong ID' });
    }
    try {
        const { description, status } = req.body;

        await db.connect();
        
        const updatedEntry = await Entry.findByIdAndUpdate(id, {
            description,
            status,
        }, { runValidators: true, new: true });
        
        res.status(200).json(updatedEntry!);
    } catch (error) {
        res.status(500).json({ message: error?.toString() || '' });
    }
};