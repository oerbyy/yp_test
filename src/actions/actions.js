export const createTask = task => ({
  type: 'CREATE_TASK',
  payload: task
});

export const deleteTask = taskId => ({
  type: 'DELETE_TASK',
  payload: taskId
});

export const toggleShowModal = isShowModal => ({
  type: 'TOGGLE_SHOW_NEWTASK_FORM',
  payload: isShowModal
});
export const incrementTaskTimer = taskId => ({
  type: 'INCREMENT_TASK_TIMER',
  payload: taskId
});
