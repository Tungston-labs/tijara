/**
 * @format
 */

if (typeof global.WeakRef === 'undefined') {
  global.WeakRef = class WeakRef {
    constructor(target) {
      this.target = target;
    }
    deref() {
      return this.target;
    }
  };
}

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
