import {combineReducers} from 'redux';
import dataService from '../services/tasksServiceStubs';

const initState = {
  activeTaskId: dataService.getActiveTaskId(),
  tasks: dataService.getTasks(),
  showModal: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TASK':
      return Object.assign({}, state, {
        tasks: [...state.tasks, action.payload]
      });
      break;

    case 'DELETE_TASK':
      return Object.assign({}, state, {
        tasks: state.tasks.map(item => {
          if (item.id === action.payload) item.deleted = true;
          return item;
        })
      });
      break;

    case 'INCREMENT_TASK_TIMER':
      return Object.assign({}, state, {
        tasks: state.tasks.map(item => {
          if (item.id === action.payload) {
            let updatedItem = Object.assign({}, item);
            updatedItem.timeRecorded++;
            return updatedItem;
          }
          return item;
        })
      });
      break;

    case 'TOGGLE_NEWTASK_FORM':
      return Object.assign({}, state, {
        showModal: action.payload
      });
      break;

    case 'SWITCH_ACTIVE_TASK':
      return Object.assign({}, state, {
        activeTaskId: action.payload
      });
      break;

    default:
      return state;
  }
};

export default reducer;
