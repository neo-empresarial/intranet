import uiConstants from '../_constants/ui.constants';
import uiActions from '../_actions/ui.actions';

const initialState = {
  sectionSelected: 'Dashboard',
  subsectionSelected: '',
  sectionRotated: '',
  drawerOpen: false,
  responsive: false
};

function ui(state = initialState, action) {
  switch (action.type) {
    case uiConstants.SELECT_SECTION:
      return {
        ...state,
        sectionSelected: action.payload
      };
    case uiConstants.SELECT_SUBSECTION:
      return {
        ...state,
        subsectionSelected: action.payload
      };
    case uiConstants.ROTATE_SECTION:
      return {
        ...state,
        sectionRotated: action.payload
      };
    case uiConstants.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen
      };
    case uiConstants.SET_RESPONSIVE:
      return {
        ...state,
        responsive: action.payload
      };
    default:
      return state;
  }
}

export default ui;
