import consts from '../actions/CoreActionConsts';

/**
 * @description This action sends all of the group Ids and
 * group names to the groupIndexReducer
 * @param {string} groupIndex - The object of group indecies
 * @return {object} action object.
 */
export const addGroupIndex = (groupIndex) => {
  return {
    type: consts.ADD_GROUP_INDEX,
    groupIndex
  };
};