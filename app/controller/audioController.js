import { Audio } from "../models/audio.js";

export const createRecordAudio = async (data) => {
  const record = await Audio.create(data);
  return record;
};

export const findRecordAudio = async (fileName) => {
  const record = await Audio.findOne({
    where: {
      fileName,
    },
  });
  return record
};
