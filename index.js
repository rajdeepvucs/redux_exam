/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './component/store';
import {Provider} from 'react-redux';
const Raj=()=>(
    <Provider store={store}>
        <App />
    </Provider>
)
AppRegistry.registerComponent(appName, () => Raj);
