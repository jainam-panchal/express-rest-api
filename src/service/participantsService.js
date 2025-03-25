import {
  getAll,
  getById,
  create,
  update,
  remove
} from '../repository/participantsRepository.js';

export const getAllParticipants = async (req, res) => {
  try {
    const participants = await getAll();
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getParticipant = async (req, res) => {
  const { id } = req.params;
  try {
    const participant = await getById(id);
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }
    res.json(participant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createParticipant = async (req, res) => {
  const { name, age, role } = req.body;
  try {
    const participant = await create({ name, age, role });
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
    res.status(200).json({ message: 'Participant deleted successfully', participant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};