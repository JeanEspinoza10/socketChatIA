import { emitter }  from '../events/index.js';
import { convertFromAnswerIa, createStructureResponse } from '../utils/response.js';

emitter.on("message:User", async (data)=>{
  const {question , assistant, socketId} =  data;
  const responseIA = await assistant.getAssistantAnswer(question);
  if (!responseIA){
    const responseError = 'Now Assistant can not response'
    emitter.emit('response',createStructureResponse('text',responseError,socketId))
  }else{
    const answers = convertFromAnswerIa(responseIA);
    const { answerEnglish } = answers
    emitter.emit('response', createStructureResponse('text',answers,socketId));
    emitter.emit('audioFromText', {
      answerEnglish,
      assistant,
      socketId
    });
  }
})