import OpenAI from "openai";
import dotenv from "dotenv";
import { logger } from "../config/logger.js";

dotenv.config();
const client = new OpenAI();


class Assistant {
    constructor(topicOfConversation) {
        this.apiKey = process.env.API_KEY;
        this.model = process.env.MODEL;
        this.client = new OpenAI();
        this.topicOfConversation = topicOfConversation;
        this.history =[
            {
                role:"system",
                content: `Eres un asistente de conversación del idioma inglés, 
                        brindame la respuesta tanto en inglés como su traducción en español, teniendo el siguiente formato de respuesta:
                            {
                            "inglés": "",
                            "español": "" 
                            }.
                        El tema de conversación será "${this.topicOfConversation}".
                        Analiza el texto del usuario, y responde en caso haya alguna pregunta del usuario. Seguidamente, 
                        realiza la siguiente pregunta.  Maximo la respuesta debe ser de dos oraciones. 
                                                
                        Sí el usuario indica que no sabe que responder, entonces solamente brindar la sugerencia de la respuesta, y continues con la siguiente
                        pregunta de la conversación.
                        `
        }]
    }

    async getAssistantAnswer(question) {
        try {
            if(!question){
                throw new Error("No hay contenido en la pregunta")
            }
            this.history.push({role: "user",content : question})
            const response = await this.client.chat.completions.create({
                model: this.model,
                messages: this.history
            });
            const assistantReply = response.choices[0].message; 
            const answerOfIa = assistantReply.content 
            this.history.push({role:"assistant", content: answerOfIa})
            return answerOfIa

        } catch(error) {
            logger.error(`Functions getAnswer ${error.message}`)
            return null;
        }
        
    }

    async transformTextToAudio(content){
        try {
            const audioMp3 = await this.client.audio.speech.create({
            model: "tts-1",
            voice: "nova",
            input: content,
            instructions: "Speak slowly, correctly enunciating each word and respecting punctuation marks.",
            });
            const buffer = Buffer.from(await audioMp3.arrayBuffer());
            const audioBase64 = buffer.toString("base64")
            return audioBase64

        } catch (error){
            logger.error(`Functions transformTextToAudio ${error.message}`)
            return null
        }
        
    }

}

export { Assistant };