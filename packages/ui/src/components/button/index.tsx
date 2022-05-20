import React from 'react';
import {TouchableOpacity, Text, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Style} from './Style';

export interface ButtonProps {
  /** Text to display in button */
  text?: string;

  /** Prevent click to button */
  disabled?: boolean;

  /** Style of text in button */
  textStyle?: TextStyle;

  /** Style of the button */
  style?: ViewStyle;

  /** Enable shadow button or not */
  shadow?: boolean;

  /** Type of button */
  variant?: 'Filled' | 'Outlined';
}

export const Button = ({
  text,
  disabled,
  style,
  variant,
  textStyle,
  shadow,
  ...props
}: ButtonProps) => {
  const txtStyle = [];
  const btnStyle: any = [styles.button];

  if (shadow) {
    btnStyle.push({
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    });
  }

  if (disabled) {
    txtStyle.push({
      color: Style.Button[variant || 'Filled']?.Disabled?.textColor,
    });
    btnStyle.push(Style.Button[variant || 'Filled']?.Disabled);
  } else {
    btnStyle.push(Style.Button[variant || 'Filled']?.Enabled);
    txtStyle.push({
      color: Style.Button[variant || 'Filled']?.Enabled?.textColor,
    });
  }

  btnStyle.push(style);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={StyleSheet.flatten(btnStyle)}
      {...props}>
      <Text style={StyleSheet.flatten([txtStyle, textStyle])}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;
