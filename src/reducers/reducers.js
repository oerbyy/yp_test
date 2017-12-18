import dataService from '../services/tasksServiceStubs';
import {arrayMove} from 'react-sortable-hoc';

const initState = {
  activeTaskId: dataService.getActiveTaskId(),
  isTimerRunning: false,
  tasks: dataService.getTasks(),
  showModal: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TASK':
      return Object.assign({}, state, {
        tasks: [action.payload, ...state.tasks]
      });

    case 'DELETE_TASK':
      return Object.assign({}, state, {
        tasks: state.tasks.map(item => {
          if (item.id === action.payload) item.deleted = true;
          return item;
        })
      });

    case 'DONE_TASK':
      return Object.assign({}, state, {
        tasks: state.tasks.map(item => {
          if (item.id === action.payload) item.done = true;
          return item;
        })
      });

    case 'TOGGLE_NEWTASK_FORM':
      return Object.assign({}, state, {
        showModal: action.payload
      });

    case 'START_TIMER':
      return Object.assign({}, state, {
        activeTaskId: action.payload.taskId,
        isTimerRunning: true
      });

    case 'STOP_TIMER':
      return Object.assign({}, state, {
        isTimerRunning: false
      });

    case 'INCREMENT_TASK_TIME':
      return Object.assign({}, state, {
        tasks: state.tasks.map(item => {
          if (item.id === state.activeTaskId) {
            let updatedItem = Object.assign({}, item);
            updatedItem.timeRecorded++;
            return updatedItem;
          }
          return item;
        })
      });

    case 'MOVE_TASK':
      let {oldIndex, newIndex} = action.payload;
      let newTasksList = arrayMove(state.tasks, oldIndex, newIndex);
      return Object.assign({}, state, {tasks: newTasksList});

    default:
      return state;
  }
};

export default reducer;
