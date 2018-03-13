import moment from 'moment';
const dateFormat = 'DD/MM/YYYY HH:mm';
const ENTER_HOME_VIEW  = 'ENTER_HOME_VIEW'
const LEAVE_HOME_VIEW  = 'LEAVE_HOME_VIEW'
const ENTER_GALLERY_VIEW  = 'ENTER_GALLERY_VIEW'
const LEAVE_GALLERY_VIEW  = 'LEAVE_GALLERY_VIEW'

const initialState = {
  currentView:  'not set',
  enterTime:    null,
  leaveTime:    null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ENTER_HOME_VIEW :
    case ENTER_GALLERY_VIEW:
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    action.enterTime,
        leaveTime:    action.leaveTime
      };
    case LEAVE_HOME_VIEW:
    case LEAVE_GALLERY_VIEW:
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    action.enterTime,
        leaveTime:    action.leaveTime
      };
    default: return state
  }
}

// Action Creator 
const getViewName = (view, type) => {
  return `${type}_${view.toUpperCase()}_VIEW`
}

export function enterView(view, time = moment().format(dateFormat)) {
  return {
    type: getViewName(view, 'ENTER'),
    currentView: view,
    enterTime: time,
    leaveTime: null,
  }
}

export function leaveView(view, time= moment().format(dateFormat)) {
  return {
    type: getViewName(view, 'LEAVE'),
    currentView: view,
    enterTime: null,
    leaveTime: time,
  }
}