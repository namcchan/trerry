import React from 'react';
import { Platform, StyleSheet, Text, TextStyle } from 'react-native';

import { ITextProps } from './types';
import { useTheme } from './hooks';

const Typography = (props: ITextProps) => {
  const {
    id = 'Text',
    children,
    style,
    center,
    flex,
    gradient,
    color = 'text',
    opacity,
    size,
    bold,
    semibold,
    weight,
    h1,
    h2,
    h3,
    h4,
    h5,
    p,
    font,
    align,
    transform,
    lineHeight,
    position,
    right,
    left,
    top,
    bottom,
    start,
    end,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    marginRight,
    marginLeft,
    paddingBottom,
    paddingTop,
    paddingHorizontal,
    paddingVertical,
    paddingRight,
    paddingLeft,
    ...rest
  } = props;
  const { colors, sizes, lines, weights, fonts } = useTheme();

  const textColor = colors[color] ?? color;

  const textStyles = StyleSheet.flatten([
    style,
    {
      fontSize: sizes.text,
      lineHeight: lines.text,
      fontWeight: weights.text,
      fontFamily: fonts.text,
      ...(textColor && { color: textColor }),
      ...(flex && { flex }),
      ...(h1 && {
        fontSize: sizes.h1,
        lineHeight: lines.h1,
        fontWeight: weights.h1,
        fontFamily: fonts.h1,
      }),
      ...(h2 && {
        fontSize: sizes.h2,
        lineHeight: lines.h2,
        fontWeight: weights.h2,
        fontFamily: fonts.h2,
      }),
      ...(h3 && {
        fontSize: sizes.h3,
        lineHeight: lines.h3,
        fontWeight: weights.h3,
        fontFamily: fonts.h3,
      }),
      ...(h4 && {
        fontSize: sizes.h4,
        lineHeight: lines.h4,
        fontWeight: weights.h4,
        fontFamily: fonts.h4,
      }),
      ...(h5 && {
        fontSize: sizes.h5,
        lineHeight: lines.h5,
        fontWeight: weights.h5,
        fontFamily: fonts.h5,
      }),
      ...(p && {
        fontSize: sizes.p,
        lineHeight: lines.p,
        fontWeight: weights.p,
        fontFamily: fonts.p,
      }),
      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
      ...(paddingBottom && { paddingBottom }),
      ...(paddingTop && { paddingTop }),
      ...(paddingHorizontal && { paddingHorizontal }),
      ...(paddingVertical && { paddingVertical }),
      ...(paddingRight && { paddingRight }),
      ...(paddingLeft && { paddingLeft }),
      ...(center && { textAlign: 'center' }),
      ...(align && { textAlign: align }),
      ...(bold && { fontFamily: fonts.bold }),
      ...(semibold && { fontFamily: fonts.semibold }),
      ...(weight && { fontWeight: weight }),
      ...(transform && { textTransform: transform }),
      ...(font && { fontFamily: font }),
      ...(size && { fontSize: size }),
      ...(opacity && { opacity }),
      ...(lineHeight && { lineHeight }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
    },
  ]) as TextStyle;

  /*
   * Calculate gradient height container based on text lineHeight or fontSize
   * add an extra value from marginVertical or marginTop or marginBottom
   */
  const gradientHeight =
    Number(textStyles?.lineHeight || textStyles?.fontSize || 0) +
    Number(
      textStyles?.marginVertical ||
        textStyles?.marginTop ||
        textStyles?.marginBottom ||
        0
    );

  // generate component testID or accessibilityLabel based on Platform.OS
  const textID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

  return (
    <Text {...textID} {...rest} style={textStyles}>
      {children}
    </Text>
  );
};

export default React.memo(Typography);
