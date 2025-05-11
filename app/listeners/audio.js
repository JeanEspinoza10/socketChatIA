import { emitter }  from '../events/index.js';
import { createStructureResponse } from '../utils/response.js';
import { v4 as uuidv4 } from 'uuid';
import { createRecordAudio } from '../controller/audioController.js';
import {  HOST, PORT_DOCKER } from '../config/server.js';

emitter.on('audioFromText', async (data)=>{
    const {answerEnglish, assistant,socketId} =  data;
    const contentBase64 = await assistant.transformTextToAudio(answerEnglish);
    const fileName = `${uuidv4()}.mp3`
    const record = await createRecordAudio({
        fileName,
        contentBase64
    })
    const url = `${HOST}:${PORT_DOCKER}/audio/${fileName}`
    emitter.emit('response', createStructureResponse('audio', url,socketId));

}) 