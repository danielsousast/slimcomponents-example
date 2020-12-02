import React, {useState} from 'react';

import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from './components/BottomSheet';

// import { Container } from './styles';

const App: React.FC = () => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setBottomSheetVisible(true)}>
        <Text style={styles.buttonTitle}>BottomSheet</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTitle}>CustomAlert</Text>
      </TouchableOpacity>
      <BottomSheet
        visible={bottomSheetVisible}
        onRequestClose={() => setBottomSheetVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },
  button: {
    padding: 8,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default App;
