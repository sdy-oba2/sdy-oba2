import React, {useMemo} from 'react';
import {View, ViewProps, TextStyle} from 'react-native';
import {Timing} from './Dot';
import {TimeUp} from './Tick';

interface ClockProps {
  time: number;
  textStyle: TextStyle;
  dotStyle: TextStyle;
  isPlaying?: boolean;
}

export const Clock = ({
  time,
  isPlaying = false,
  style,
  textStyle,
  dotStyle,
  ...props
}: ClockProps & ViewProps) => {
  const {minutes, seconds} = useMemo(() => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');

    return {minutes, seconds};
  }, [time]);

  return (
    <View
      {...props}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          overflow: 'hidden',
        },
        style,
      ]}>
      <TimeUp
        key="1"
        time={minutes}
        run={isPlaying}
        style={textStyle}
      />
      <Timing key="2" run={isPlaying && `${time}` !== '0'} style={dotStyle} />
      <TimeUp
        key="3"
        time={seconds}
        run={isPlaying}
        style={textStyle}
      />
    </View>
  );
};
