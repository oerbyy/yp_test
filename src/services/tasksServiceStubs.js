import dbData from '../db/db.json';

export default {
  getTasks
};

function getTasks() {
  return dbData.tasks;
}
