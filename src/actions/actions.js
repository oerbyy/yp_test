export const createTask = task => ({
  type: 'CREATE_TASK',
  payload: task
});

export const deleteTask = taskId => ({
  type: 'DELETE_TASK',
  payload: taskId
});

export const toggleShowModal = isShowModal => ({
  type: 'TOGGLE_SHOW_MODAL',
  payload: isShowModal
});
