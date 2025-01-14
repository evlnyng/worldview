import {
  CHANGE_TAB,
  TOGGLE_COLLAPSE,
  COLLAPSE_SIDEBAR,
  EXPAND_SIDEBAR,
  TOGGLE_MOBILE_COLLAPSE,
  MOBILE_COLLAPSE_SIDEBAR,
  MOBILE_EXPAND_SIDEBAR
} from './constants';

export function changeTab(str) {
  return {
    type: CHANGE_TAB,
    activeTab: str
  };
}
export function toggleSidebarCollapse(str) {
  return (dispatch, getState) => {
    const isMobile = getState().browser.lessThan.medium;
    if (isMobile) {
      dispatch({ type: TOGGLE_MOBILE_COLLAPSE });
    } else {
      dispatch({ type: TOGGLE_COLLAPSE });
    }
  };
}

export function collapseSidebar(str) {
  return (dispatch, getState) => {
    const isMobile = getState().browser.lessThan.medium;
    if (isMobile) {
      dispatch({ type: MOBILE_COLLAPSE_SIDEBAR });
    } else {
      dispatch({ type: COLLAPSE_SIDEBAR });
    }
  };
}

export function expandSidebar(str) {
  return (dispatch, getState) => {
    const isMobile = getState().browser.lessThan.medium;
    if (isMobile) {
      dispatch({ type: MOBILE_EXPAND_SIDEBAR });
    } else {
      dispatch({ type: EXPAND_SIDEBAR });
    }
  };
}
