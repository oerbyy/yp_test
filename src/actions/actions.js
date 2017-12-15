export const createTask = task => ({
  type: 'CREATE_TASK',
  payload: {task}
});

export const deleteTask = taskId => ({
  type: 'DELETE_TASK',
  payload: taskId
});

export const loadInitData = () => ({
  type: 'LOAD_INIT_DATA',
  payload: ''
});
