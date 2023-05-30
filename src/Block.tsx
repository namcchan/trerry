import React from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'react-native-linear-gradient';

import { IBlockProps } from './types';
import { useTheme } from './hooks';

const Block = (
  props: IBlockProps & {
    onPress?: () => void;
  }
) => {
  const {
    id = 'Block',
    children,
    style,
    shadow,
    card,
    center,
    outlined,
    overflow,
    row,
    safe,
    keyboard,
    scroll,
    color,
    gradient,
    radius,
    height,
    width,
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
    justify,
    align,
    flex = 0,
    wrap,
    blur,
    intensity,
    tint,
    position,
    right,
    left,
    top,
    bottom,
    end,
    start,
    zIndex,
    onPress,
    ...rest
  } = props;
  const { colors, sizes } = useTheme();

  const blockColor = color ? colors?.[color] : 'transparent';

  const blockStyles = StyleSheet.flatten([
    {
      ...(shadow && {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: sizes.shadowOffsetWidth,
          height: sizes.shadowOffsetHeight,
        },
        shadowOpacity: sizes.shadowOpacity,
        shadowRadius: sizes.shadowRadius,
        elevation: sizes.elevation,
      }),
      ...(card && {
        backgroundColor: colors.card,
        borderRadius: sizes.cardRadius,
        padding: sizes.cardPadding,
        shadowColor: colors.shadow,
        shadowOffset: {
          width: sizes.shadowOffsetWidth,
          height: sizes.shadowOffsetHeight,
        },
        shadowOpacity: sizes.shadowOpacity,
        shadowRadius: sizes.shadowRadius,
        elevation: sizes.elevation,
      }),
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
      ...(radius && { borderRadius: radius }),
      ...(height && { height }),
      ...(width && { width }),
      ...(overflow && { overflow }),
      ...(flex !== undefined && { flex }),
      ...(row && { flexDirection: 'row' }),
      ...(align && { alignItems: align }),
      ...(center && { justifyContent: 'center' }),
      ...(justify && { justifyContent: justify }),
      ...(wrap && { flexWrap: wrap }),
      ...(blockColor && { backgroundColor: blockColor }),
      ...(outlined && {
        borderWidth: 1,
        borderColor: blockColor,
        backgroundColor: 'transparent',
      }),
      ...(zIndex && { zIndex }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
    },
    style,
  ]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const blockID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

  if (safe) {
    return (
      <SafeAreaView {...blockID} {...rest} style={blockStyles}>
        {children}
      </SafeAreaView>
    );
  }

  if (keyboard) {
    return (
      <KeyboardAwareScrollView {...blockID} {...rest} style={blockStyles}>
        {children}
      </KeyboardAwareScrollView>
    );
  }

  if (scroll) {
    return (
      <ScrollView {...blockID} {...rest} style={blockStyles}>
        {children}
      </ScrollView>
    );
  }

  if (gradient) {
    return (
      <LinearGradient
        {...blockID}
        colors={gradient}
        style={blockStyles}
        end={end || { x: 1, y: 0 }}
        start={start || { x: 0, y: 0 }}
        {...rest}
      >
        {children}
      </LinearGradient>
    );
  }

  // if (blur) {
  //   return (
  //     <BlurView {...blockID} tint={tint} intensity={intensity} style={blockStyles}>
  //       {children}
  //     </BlurView>
  //   );
  // }

  if (onPress) {
    return (
      <Pressable onPress={onPress} {...blockID} {...rest} style={blockStyles}>
        {children}
      </Pressable>
    );
  }

  return (
    <View {...blockID} {...rest} style={blockStyles}>
      {children}
    </View>
  );
};

export default React.memo(Block);
