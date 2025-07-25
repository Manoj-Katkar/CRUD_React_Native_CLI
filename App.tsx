/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { ScrollView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import CRUD from './src/screens/crud-screen/crud.screen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container} >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* working for android only because of the ip issue android it is working properlly */}
      <CRUD/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default App;
