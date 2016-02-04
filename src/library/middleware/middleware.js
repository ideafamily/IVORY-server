/*jshint esnext: true */

import removedeviceToken from './removedeviceToken';
import makeroom          from './makeroom';
import findclass         from './findclass';
import getProfile        from './getProfile';
import findorcreateGroup from './findorcreateGroup';
import joingroup         from './joingroup';
import setupsocket       from './setupsocket';

module.exports = {
  removedeviceToken : removedeviceToken,
  makeroom          : makeroom,
  findclass         : findclass,
  getProfile        : getProfile,
  findorcreateGroup : findorcreateGroup,
  joingroup         : joingroup,
  setupsocket       : setupsocket
};
