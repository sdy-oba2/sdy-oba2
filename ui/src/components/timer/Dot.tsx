import React, {useEffect} from 'react';
import {Animated, View, TextProps} from 'react-native';

export const Timing = React.memo(({run, style}: {run: boolean} & TextProps) => {
  const startValue = new Animated.Value(1);

  useEffect(() => {
    if (run) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(startValue, {
            toValue: 0,
            duration: 100,
            delay: 100,
            useNativeDriver: true,
          }),
          Animated.timing(startValue, {
            toValue: 1,
            duration: 200,
            delay: 600,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      Animated.timing(startValue, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [run]);

  return (
    <View style={{height: '100%'}}>
      <Animated.Text
        style={[
          {
            fontWeight: 'bold',
            fontSize: 42,
            lineHeight: 42,
            opacity: startValue,
          },
          style,
        ]}>
        :
      </Animated.Text>
    </View>
  );
});
