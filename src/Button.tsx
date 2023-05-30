import { IButtonProps } from './types';
import { useTheme } from './hooks';
import React, { useCallback } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const Button = ({
  id = 'Button',
  children,
  style,
  color,
  gradient,
  flex,
  radius,
  round,
  rounded,
  disabled,
  margin,
  marginBottom,
  marginTop,
  marginHorizontal,
  marginVertical,
  marginRight,
  marginLeft,
  padding,
  paddingBottom,
  paddingTop,
  paddingHorizontal,
  paddingVertical,
  paddingRight,
  paddingLeft,
  align,
  justify,
  height,
  width,
  row,
  outlined,
  activeOpacity = 0.7,
  shadow = true,
  position,
  right,
  left,
  top,
  bottom,
  zIndex,
  vibrate,
  vibrateRepeat,
  onPress,
  ...props
}: IButtonProps) => {
  const { colors, sizes } = useTheme();

  const buttonColor = color ? colors[color] : 'transparent';

  const buttonStyles = StyleSheet.flatten([
    style,
    {
      // height: sizes.inputHeight,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: buttonColor,
      borderRadius: rounded ? sizes.s : sizes.buttonRadius,
      ...(shadow &&
        buttonColor !== 'transparent' && {
          shadowColor: colors.shadow,
          shadowOffset: {
            width: sizes.shadowOffsetWidth,
            height: sizes.shadowOffsetHeight,
          },
          shadowOpacity: sizes.shadowOpacity,
          shadowRadius: sizes.shadowRadius,
          elevation: sizes.elevation,
        }),
      ...(zIndex && { zIndex }),
      ...(row && { flexDirection: 'row' }),
      ...(radius && { borderRadius: radius }),
      ...(flex !== undefined && { flex }),
      ...(margin !== undefined && { margin }),
      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
      ...(padding !== undefined && { padding }),
      ...(paddingBottom && { paddingBottom }),
      ...(paddingTop && { paddingTop }),
      ...(paddingHorizontal && { paddingHorizontal }),
      ...(paddingVertical && { paddingVertical }),
      ...(paddingRight && { paddingRight }),
      ...(paddingLeft && { paddingLeft }),
      ...(align && { alignItems: align }),
      ...(justify && { justifyContent: justify }),
      ...(height && { height }),
      ...(width && { width }),
      ...(typeof outlined === 'boolean' && {
        borderWidth: sizes.buttonBorder,
        borderColor: buttonColor,
        backgroundColor: 'transparent',
      }),
      ...(typeof outlined === 'string' && {
        borderWidth: sizes.buttonBorder,
        borderColor: outlined,
      }),
      ...(disabled && { opacity: 0.5 }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
    },
  ]) as ViewStyle;

  /* handle onPress event */
  const handlePress = useCallback(
    (event) => {
      onPress?.(event);
    },
    [onPress]
  );

  if (round) {
    const maxSize = Math.max(
      Number(buttonStyles.width || 0),
      Number(buttonStyles.minWidth || 0),
      Number(buttonStyles.maxWidth || 0),
      Number(buttonStyles.height || 0),
      Number(buttonStyles.minHeight || 0),
      Number(buttonStyles.maxHeight || 0)
    );
    buttonStyles.maxWidth = maxSize;
    buttonStyles.maxHeight = maxSize;
    buttonStyles.borderRadius = maxSize / 2;
  }

  const gradientStyles = StyleSheet.flatten([
    buttonStyles,
    {
      flex: 1,
      width: '100%',
      ...(round && { maxWidth: buttonStyles.maxWidth }),
    },
  ]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const buttonID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

  if (gradient) {
    return (
      <TouchableOpacity
        {...buttonID}
        activeOpacity={activeOpacity}
        onPress={handlePress}
        {...props}
        style={buttonStyles}
      >
        <LinearGradient
          style={gradientStyles}
          colors={gradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      {...buttonID}
      activeOpacity={activeOpacity}
      onPress={handlePress}
      {...props}
      style={buttonStyles}
    >
      {children}
    </TouchableOpacity>
  );
};

export default React.memo(Button);
