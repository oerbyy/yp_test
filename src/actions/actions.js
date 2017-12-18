export const createTask = task => ({
  type: 'CREATE_TASK',
  payload: task
});

export const deleteTask = taskId => ({
  type: 'DELETE_TASK',
  payload: taskId
});

export const toggleShowModal = isShowModal => ({
  type: 'TOGGLE_NEWTASK_FORM',
  payload: isShowModal
});

export const startTimer = taskId => ({
  type: 'START_TIMER',
  payload: {taskId}
});

export const stopTimer = () => ({
  type: 'STOP_TIMER',
  payload: null
});

export const incrementTaskTime = () => ({
  type: 'INCREMENT_TASK_TIME',
  payload: null
});

export const switchActiveTask = taskId => ({
  type: 'SWITCH_ACTIVE_TASK',
  payload: taskId
});

export const moveTask = (oldIndex, newIndex) => ({
  type: 'MOVE_TASK',
  payload: {oldIndex, newIndex}
});
