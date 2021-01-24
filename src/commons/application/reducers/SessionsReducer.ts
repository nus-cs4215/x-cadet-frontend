import { Reducer } from 'redux';

import { SourceActionType } from '../../utils/ActionsHelper';
import { defaultSession } from '../ApplicationTypes';
import { LOG_OUT } from '../types/CommonsTypes';
import {
  SessionState,
  SET_GOOGLE_USER,
  SET_TOKENS,
  SET_USER,
  UPDATE_HISTORY_HELPERS,
  UPDATE_NOTIFICATIONS
} from '../types/SessionTypes';

export const SessionsReducer: Reducer<SessionState> = (
  state = defaultSession,
  action: SourceActionType
) => {
  switch (action.type) {
    case LOG_OUT:
      return defaultSession;
    case SET_TOKENS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    case SET_USER:
      return {
        ...state,
        ...action.payload
      };
    case SET_GOOGLE_USER:
      return {
        ...state,
        googleUser: action.payload
      };
    case UPDATE_HISTORY_HELPERS:
      const helper = state.historyHelper;
      const isAcademy = isAcademyRe.exec(action.payload) != null;
      const newAcademyLocations = isAcademy
        ? [helper.lastAcademyLocations[1], action.payload]
        : [...helper.lastAcademyLocations];
      const newGeneralLocations = [helper.lastGeneralLocations[1], action.payload];
      return {
        ...state,
        historyHelper: {
          lastAcademyLocations: newAcademyLocations,
          lastGeneralLocations: newGeneralLocations
        }
      };
    case UPDATE_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    default:
      return state;
  }
};

export const isAcademyRe = new RegExp('^/academy.*', 'i');
