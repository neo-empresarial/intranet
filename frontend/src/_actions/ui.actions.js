import uiConstants from '../_constants/ui.constants';

// export function toggleDrawer() {
//   return {
//     type: uiConstants.TOGGLE_DRAWER,
//   }
// }

export function selectSection(id) {
  return {
    type: uiConstants.SELECT_SECTION,
    payload: id
  };
}

export function selectSubsection(id) {
  return {
    type: uiConstants.SELECT_SUBSECTION,
    payload: id
  };
}

export function rotateSection(id) {
  return {
    type: uiConstants.ROTATE_SECTION,
    payload: id
  };
}

export function toggleDrawer() {
  return {
    type: uiConstants.TOGGLE_DRAWER
  };
}

export function setResponsive(bool) {
  return {
    type: uiConstants.SET_RESPONSIVE,
    payload: bool
  };
}

const uiActions = {
  setResponsive,
  toggleDrawer,
  selectSection,
  rotateSection,
  selectSubsection
};

export default uiActions;
