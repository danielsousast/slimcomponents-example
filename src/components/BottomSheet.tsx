import React, {useEffect, useMemo, useState} from 'react';

import {
  StyleSheet,
  Modal,
  View,
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';

interface BottomSheetProps {
  visible: boolean;
  onRequestClose: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  visible,
  onRequestClose,
}) => {
  const [panY, setpanY] = useState(
    new Animated.Value(Dimensions.get('screen').height),
  );

  useEffect(() => {
    if (visible) {
      resetPosition.start();
    }
  }, []);

  const resetPosition = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  });

  const closeAnimation = Animated.timing(panY, {
    toValue: Dimensions.get('screen').height,
    duration: 500,
    useNativeDriver: false,
  });

  const onDismiss = () => {
    onRequestClose;
  };

  const top = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, {dy: panY}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gs) => {
        console.log('teste');

        return closeAnimation.start(() => onDismiss());

        //return resetPosition.start();
      },
    }),
  );

  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <TouchableWithoutFeedback
        onPress={onRequestClose}
        style={{backgroundColor: 'transparent'}}>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.container, {top}]} {...panResponder}>
        {children}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'red',
    paddingTop: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    minHeight: 300,
  },
});

export default BottomSheet;
