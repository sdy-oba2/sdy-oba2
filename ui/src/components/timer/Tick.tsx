import React, {useEffect, useMemo, useState} from 'react';
import {Animated, TextProps, StyleSheet, View} from 'react-native';

const height = 50;
const toValue = -height;
const duration = 500;

interface TickProps {
  time: number | string;
  run: boolean;
}

const Tick = React.memo(({time, style, run}: TickProps & TextProps) => {
  const [preTime, setTime] = useState<number | string | null>(null);
  const timePositionValue = new Animated.Value(height);
  const startValue = new Animated.Value(0);

  useEffect(() => {
    if (run) {
      Animated.timing(startValue, {
        toValue: toValue,
        duration,
        useNativeDriver: true,
      }).start();

      Animated.timing(timePositionValue, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start(() => {
        startValue.setValue(0);
        timePositionValue.setValue(-height);
        setTime(time);
      });
    } else {
      setTime(null);
      Animated.timing(timePositionValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(startValue, {
        duration: 0,
        toValue: toValue,
        useNativeDriver: true,
      }).start();
    }
  }, [time, run]);

  const textStyle = StyleSheet.flatten([
    {minWidth: 25, fontWeight: 'bold', fontSize: 42, textAlign: 'center'},
    style,
  ]);

  return (
    <View>
      {preTime !== null && (
        <Animated.Text
          style={StyleSheet.flatten([
            textStyle,
            {position: 'absolute', transform: [{translateY: startValue}]},
          ]) as any}>
          {preTime}
        </Animated.Text>
      )}
      <Animated.Text
        style={StyleSheet.flatten([textStyle, {transform: [{translateY: timePositionValue}]}]) as any}>
        {time}
      </Animated.Text>
    </View>
  );
});

export const TimeUp = React.memo(
  ({time, run, ...props}: TickProps & TextProps) => {
    const arrs = useMemo(() => {
      const _time = time.toString().padStart(2, '0');
      return _time.split('');
    }, [time]);

    return (
      <>
        {arrs.map((tick: string, index: number) => <Tick time={tick} key={index} run={run} {...props} />)}
      </>
    );
  },
);
