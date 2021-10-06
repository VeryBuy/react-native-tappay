import {AppRegistry, Platform} from 'react-native';
import App from './components/App';

const APP_NAME = 'example';

AppRegistry.registerComponent(APP_NAME, () => App);

// register the web
if (Platform.OS === 'web') {
  AppRegistry.runApplication(APP_NAME, {
    rootTag: document.getElementById('root'),
  });
}
