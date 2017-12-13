import dbData from '../db/db.json';

export default {
  getTasks,
  getActiveTaskId
};

function getTasks() {
  return dbData.tasks;
}

function getActiveTaskId() {
  return dbData.activeTaskId;
}
