import redisClient from "../config/redis.js";

const getCache = async (key) => {
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting cache:", error);
    return null;
  }
}

const setCache = async (key, value, expirationInSeconds) => {
  try {
    const stringValue = JSON.stringify(value);
    await redisClient.set(key, stringValue, 'EX', expirationInSeconds);
  } catch (error) {
    console.error("Error setting cache:", error);
  }
}

const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error("Error deleting cache:", error);
  }
}

export { getCache, setCache, deleteCache };