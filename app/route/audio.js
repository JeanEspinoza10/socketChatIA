import express from 'express';
import { findRecordAudio } from '../controller/audioController.js';
import { logger } from "../config/logger.js";

const router = express.Router();

router.get('/:fileName', async (req, res) =>{
    try {
        const { fileName } = req.params; 
        const record = await findRecordAudio(fileName);
        if (!record){
            return res.status(404).json({
                message:'Audio not found'
            })
        }
        // Decodificar base64 a buffer
        const audioBuffer = Buffer.from(record.contentBase64, 'base64');

        // Establecer headers para enviar como archivo de audio
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', `inline; filename="${record.fileName}"`);
        res.send(audioBuffer);
        
    } catch (error){
        logger.error('Error in server => route audio')
        res.status(500).json({ error: 'Error in server' });
    }
})

export default router;