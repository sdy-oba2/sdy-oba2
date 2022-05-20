import React from 'react';
import {
  StyleSheet,
  TextStyle,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {Clock} from './Clock';
import {ColorFormat, TimeProps, OnComplete} from './types';
import {useCountdown} from './useCountDown';
import {getWrapperStyle, timeStyle} from '../../ultis';
import {Theme} from '../../token/theme';

export type TimerProps = {
  playing?: boolean;
  label?: string;
  labelStyle?: TextStyle;
  textStyle?: TextStyle;
  dotStyle?: TextStyle;

  /** Countdown duration in seconds */
  duration: number;
  /** Set the initial remaining time if it is different than the duration */
  initialRemainingTime?: number;
  /** Update interval in seconds. Determines how often the timer updates. When set to 0 the value will update on each key frame. Default: 0 */
  updateInterval?: number;
  /** Width and height of the SVG element. Default: 180 */
  size?: number;
  /** Path stroke width. Default: 12 */
  strokeWidth?: number;
  /** Trail stroke width */
  trailStrokeWidth?: number;
  /** Path stroke line cap. Default: "round" */
  strokeLinecap?: 'round' | 'square' | 'butt';
  /** Progress path rotation direction. Default: "clockwise" */
  rotation?: 'clockwise' | 'counterclockwise';
  /** Circle trail color - takes any valid color format (HEX, rgb, rgba, etc.). Default: #d9d9d9 */
  trailColor?: ColorFormat;
  /** Play or pause animation. Default: false */
  isPlaying?: boolean;
  /** Indicates if the colors should smoothly transition to the next color. Default: true */
  isSmoothColorTransition?: boolean;
  /** Render function to customize the time/content in the center of the circle */
  children?: (props: TimeProps) => React.ReactNode;
  /** On animation complete event handler */
  onComplete?: (totalElapsedTime: number) => OnComplete | void;
  /** On remaining time update event handler */
  onUpdate?: (remainingTime: number) => void;
};

export function Timer({
  size = 220,
  duration = 0,
  playing = true,
  strokeWidth = 16,
  rotation = 'counterclockwise',
  label,
  dotStyle,
  textStyle,
  labelStyle,
  trailColor,
  strokeLinecap,
  trailStrokeWidth,
  ...props
}: TimerProps) {
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size: _size,
    isPlaying,
    strokeWidth: _strokeWidth,
  } = useCountdown({
    size,
    duration,
    strokeWidth,
    colors: Theme.colors.globalLightPaletteGreen500 || '#',
    isPlaying: playing,
    rotation,
    ...props,
  });

  return (
    <View style={getWrapperStyle(size) as StyleProp<ViewStyle>}>
      <Svg width={size} height={size}>
        <Path
          d={path}
          fill="none"
          stroke={trailColor ?? '#d9d9d9'}
          strokeWidth={trailStrokeWidth ?? strokeWidth}
        />
        {elapsedTime !== duration && (
          <Path
            d={path}
            fill="none"
            stroke={stroke}
            strokeLinecap={strokeLinecap ?? 'round'}
            strokeWidth={strokeWidth}
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
          />
        )}
      </Svg>
      <View style={timeStyle as StyleProp<ViewStyle>}>
        {
          <Clock
            time={remainingTime}
            isPlaying={isPlaying}
            dotStyle={dotStyle}
            textStyle={textStyle}
          />
        }
        {!!label && (
          <Text style={StyleSheet.flatten([styles.label, labelStyle])}>
            {label}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  timeDisplay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1C1D20',
  },
  label: {
    color: '#909198',
  },
});

export default Timer;
