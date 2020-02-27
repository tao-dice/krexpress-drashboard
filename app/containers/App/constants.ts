/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 */

enum ActionTypes {
  LOAD_REPOS = 'LOAD_REPOS',
}

export const SET_LOTTO_DRAWS_DATA = 'Lotto/SET_LOTTO_DRAWS_DATA';

enum ActionTypes {
  SET_LOTTO_DRAWS_DATA = 'App/SET_LOTTO_DRAWS_DATA',
  PUSH_YEEKEE_NUMBER = 'App/PUSH_YEEKEE_NUMBER',
  SET_BET_OPTIONS = 'App/SET_BET_OPTIONS',
  ADD_BET_OPTIONS = 'App/ADD_BET_OPTIONS',
  REMOVE_BET_OPTIONS = 'App/REMOVE_BET_OPTIONS',
  SET_BET_ORDER = 'App/SET_BET_ORDER',
  ADD_ORDER = 'App/ADD_ORDER',
  ADD_BET_ORDER = 'App/ADD_BET_ORDER',
  CLEAR_ORDER = 'App/CLEAR_ORDER',
  SUBMIT_ORDER = 'App/SUBMIT_ORDER',
  REMOVE_BET_ORDER = 'App/REMOVE_BET_ORDER',
  SET_ORDER_ITEM_CREDITS = 'App/SET_ORDER_ITEM_CREDITS',
  SET_ORDER_ITEMS_CREDITS = 'App/SET_ORDER_ITEMS_CREDITS',
  TOGGLE_MODAL_STAKE_NUMBER = 'App/TOGGLE_MODAL_STAKE_NUMBER',
}

export const FIRST_PRIZE = 'FIRST_PRIZE';  // สามตัวหน้า
export const YEEKEE_POOL = 'YEEKEE_POOL';  // ผลรวมเลขยี่กี่
export const YEEKEE_SUMMARY = 'YEEKEE_SUMMARY';  // ผลรวมเลขยี่กี่
export const YEEKEE_16TH = 'YEEKEE_16TH';  //
export const YEEKEE_MEMBER_1ST = 'YEEKEE_MEMBER_1ST';  //
export const YEEKEE_MEMBER_16TH = 'YEEKEE_MEMBER_16TH';  //
export const TWO_DIGITS = 'TWO_DIGITS';
export const THREE_DIGITS = 'THREE_DIGITS'; // สามตัวบน
export const THREE_DIGITS_TOD = 'THREE_DIGITS_TOD';  // สามตัวบน
export const THREE_DIGITS_FIRST = 'THREE_DIGITS_FIRST';  // สามตัวหน้า
export const THREE_DIGITS_LAST = 'THREE_DIGITS_LAST';  // สามตัวหลัง
export const TWO_DIGITS_TOP = 'TWO_DIGITS_TOP';
export const TWO_DIGITS_UNDER = 'TWO_DIGITS_UNDER';
export const RUN_DIGITS = 'RUN_DIGITS';
export const SWIPE_FIRST = 'SWIPE_FIRST';
export const SWIPE_LAST = 'SWIPE_LAST';
export const RUN_DIGITS_TOP = 'RUN_DIGITS_TOP';
export const RUN_DIGITS_UNDER = 'RUN_DIGITS_UNDER';
export const NINETEEN_DOOR = 'NINETEEN_DOOR';
export const DIGITS_PERMUTATION = 'DIGITS_PERMUTATION';
export const DOUBLE_NUMBER = 'DOUBLE_NUMBER';
export const LOW_NUMBER = 'LOW_NUMBER';
export const HIGH_NUMBER = 'HIGH_NUMBER';
export const EVEN_NUMBER = 'EVEN_NUMBER';
export const ODD_NUMBER = 'ODD_NUMBER';
// example
export const LOAD_REPOS = 'LOAD_REPOS';

export const BET_KEYS = [
  TWO_DIGITS_TOP,
  TWO_DIGITS_UNDER,
  RUN_DIGITS_TOP,
  RUN_DIGITS_UNDER,
  THREE_DIGITS,
  THREE_DIGITS_FIRST,
  THREE_DIGITS_LAST,
];

export default ActionTypes;
