import dbData from '../db/db.json';

export default {
  getTasks,
  getActiveTaskId
};

function getTasks() {
  let tasks = dbData.tasks;
  tasks.sort((x, y) => y.priorityOrder - x.priorityOrder);
  tasks.sort((x, y) => x.done - y.done);
  return tasks;
}

function getActiveTaskId() {
  return dbData.activeTaskId;
}
