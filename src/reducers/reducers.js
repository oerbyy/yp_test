import dataService from '../services/tasksServiceStubs';
import {arrayMove} from 'react-sortable-hoc';

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

    case 'DELETE_TASK':
      return Object.assign({}, state, {
        tasks: state.tasks.map(item => {
          if (item.id === action.payload) item.deleted = true;
          return item;
        })
      });

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

    case 'TOGGLE_NEWTASK_FORM':
      return Object.assign({}, state, {
        showModal: action.payload
      });

    case 'SWITCH_ACTIVE_TASK':
      return Object.assign({}, state, {
        activeTaskId: action.payload
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
