import { logger } from "../config/logger.js";

function convertFromAnswerIa(answer){
    let answerSpanish;
    let answerEnglish;
    try{
        const jsonAnswer = JSON.parse(answer);
        answerSpanish =  jsonAnswer['español'];
        answerEnglish = jsonAnswer['inglés'];
        return {
            answerEnglish,
            answerSpanish
        }
    }catch(error){
        logger.error(`${error}`)
        return {
            answerEnglish,
            answerSpanish
        }
    }
    
}

function createStructureResponse(type,content,socketId){
    const response = {
        type,
        content,
        socketId
    }
    return response
}

export {convertFromAnswerIa ,createStructureResponse}