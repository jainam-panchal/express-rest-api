import {
  getAll,
  getById,
  create,
  update,
  remove
} from '../repository/participantsRepository.js';

import {
  getParticipantCache,
  setParticipantCache,
  delParticipantCache,
  getAllParticipantsCache,
  setAllParticipantsCache,
  delAllParticipantsCache
} from '../cacheHelper/participantCacheHelper.js';

export const getAllParticipants = async (req, res) => {
  try {

    // Check if it exists in the cache first
    const cachedParticipants = await getAllParticipantsCache();
    if (cachedParticipants) {
      return res.json(cachedParticipants);
    }
    
    const participants = await getAll();

    // Cache update
    await setAllParticipantsCache(participants);
    
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getParticipant = async (req, res) => {
  const { id } = req.params;
  try {

    // Check if it exists in the cache first
    const cachedParticipant = await getParticipantCache(id);
    if (cachedParticipant) {
      return res.json(cachedParticipant);
    }

    const participant = await getById(id);
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }

    // Cache update
    await setParticipantCache(id, participant);

    res.json(participant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createParticipant = async (req, res) => {
  const { name, age, role } = req.body;
  try {
    const participant = await create({ name, age, role });
    
    // Cache Update
    await setParticipantCache(participant.id, participant);
    await delAllParticipantsCache();
    setImmediate(repopulateAllParticipantsCache);

    res.status(201).json(participant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateParticipant = async (req, res) => {
  const { id } = req.params;
  const { name, age, role } = req.body;
  try {
    const participant = await update(id, { name, age, role });
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }

    // Cache update
    await setParticipantCache(id, participant);
    await delAllParticipantsCache();
    setImmediate(repopulateAllParticipantsCache);

    res.json(participant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteParticipant = async (req, res) => {
  const { id } = req.params;
  try {
    const participant = await remove(id);
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }

    // Cache update
    await delParticipantCache(id);
    await delAllParticipantsCache();
    setImmediate(repopulateAllParticipantsCache);

    res.status(200).json({ message: 'Participant deleted successfully', participant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const repopulateAllParticipantsCache = async () => {
  try {
    const participants = await getAll();
    await setAllParticipantsCache(participants);
  } catch (error) {
    console.error('Error repopulating participants cache:', error.message);
  }
};