// TODO: Lift this to env variables
import { getCache, setCache, deleteCache } from "../lib/redisHelper.js";

const PARTICIPANTS_PREFIX = "participants:";
const PARTICIPANTS_EXPIRATION = 60 * 60 * 24; // 1 day

const getParticipantsKey = (id) => {
  return `${PARTICIPANTS_PREFIX}${id}`;
}

const getParticipantCache = async (id) => {
  return await getCache(getParticipantsKey(id));
}

const setParticipantCache = async (id, value) => {
  await setCache(getParticipantsKey(id), value, PARTICIPANTS_EXPIRATION);
}

const delParticipantCache = async (id) => {
  await deleteCache(getParticipantsKey(id));
}

const setAllParticipantsCache = async (value) => {
  await setCache(`${PARTICIPANTS_PREFIX}all`, value, PARTICIPANTS_EXPIRATION);
}

const getAllParticipantsCache = async () => {
  return await getCache(`${PARTICIPANTS_PREFIX}all`);
}

const delAllParticipantsCache = async () => {
  await deleteCache(`${PARTICIPANTS_PREFIX}all`);
}

export {
  getParticipantCache,
  setParticipantCache,
  delParticipantCache,
  getAllParticipantsCache,
  setAllParticipantsCache,
  delAllParticipantsCache
}