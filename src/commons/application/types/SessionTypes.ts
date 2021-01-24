import { HistoryHelper } from '../../utils/HistoryHelper';
import { Role } from '../ApplicationTypes';

export const FETCH_AUTH = 'FETCH_AUTH';
export const FETCH_ASSESSMENT = 'FETCH_ASSESSMENT';
export const FETCH_ASSESSMENT_OVERVIEWS = 'FETCH_ASSESSMENT_OVERVIEWS';
export const FETCH_GRADING = 'FETCH_GRADING';
export const FETCH_GRADING_OVERVIEWS = 'FETCH_GRADING_OVERVIEWS';
export const LOGIN = 'LOGIN';
export const LOGOUT_GOOGLE = 'LOGOUT_GOOGLE';
export const SET_TOKENS = 'SET_TOKENS';
export const SET_USER = 'SET_USER';
export const SET_GOOGLE_USER = 'SET_GOOGLE_USER';
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER';
export const SUBMIT_ASSESSMENT = 'SUBMIT_ASSESSMENT';
export const UNSUBMIT_SUBMISSION = 'UNSUBMIT_SUBMISSION';
export const SUBMIT_GRADING = 'SUBMIT_GRADING';
export const SUBMIT_GRADING_AND_CONTINUE = 'SUBMIT_GRADING_AND_CONTINUE';
export const REAUTOGRADE_SUBMISSION = 'REAUTOGRADE_SUBMISSION';
export const REAUTOGRADE_ANSWER = 'REAUTOGRADE_ANSWER';
export const UPDATE_HISTORY_HELPERS = 'UPDATE_HISTORY_HELPERS';
export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';
export const ACKNOWLEDGE_NOTIFICATIONS = 'ACKNOWLEDGE_NOTIFICATIONS';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';

export const UPLOAD_KEYSTROKE_LOGS = 'UPLOAD_KEYSTROKE_LOGS';
export const UPLOAD_UNSENT_LOGS = 'UPLOAD_UNSENT_LOGS';

export type SessionState = {
    readonly accessToken?: string;
    readonly group: string | null;
    readonly historyHelper: HistoryHelper;
    readonly refreshToken?: string;
    readonly role?: Role;
    readonly name?: string;
    readonly userId?: number;
    readonly notifications: Notification[];
    readonly googleUser?: string;
};

export type Tokens = {
    accessToken: string;
    refreshToken: string;
};

export type User = {
    userId: number;
    name: string;
    role: Role;
    group: string | null;
};
