import consts from '../actions/ActionTypes';

const initialState = {
  loggedInUser: false,
  displayLogin: true,
  userdata: {},
  feedback: '',
  subject: 'Bug Report',
  placeholder: 'Leave us your feedback!'
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case consts.TOGGLE_ACOUNT_VIEW_TO_LOGIN:
      return {
        ...state,
        displayLogin: action.val
      };
    case consts.RECEIVE_LOGIN:
      return {
        ...state,
        userdata: action.userdata,
        loggedInUser: true
      };
    case consts.LOGIN_LOCAL_USER:
      return {
        ...state,
        userdata: {
          username: action.username,
          localUser: true
        },
        loggedInUser: true
      };
    case consts.LOGOUT_USER:
      localStorage.removeItem('localUser');
      localStorage.removeItem('user');
      return {
        ...state,
        userdata: {},
        loggedInUser: false
      };
    case consts.FEEDBACK_CHANGE:
      return { ...state, feedback: action.val }
    case consts.FEEDBACK_SUBJECT_CHANGE:
      return { ...state, subject: action.val }
    case consts.SUBMIT_FEEDBACK:
      Rollbar.configure({
        payload: {
          person: {
            username: state.userdata.username,
          }
        }
      });
      Rollbar.info(state.subject+ ':\n' + state.feedback);
      return { ...state,   placeholder:"Feedback Submitted!", feedback:"" }
    default:
      return state;
  }
};

export default loginReducer;
