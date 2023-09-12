/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 * REMOVED DARK MODE FOR NOW
 */

import { Text as DefaultText, useColorScheme, View as DefaultView, SafeAreaView as DefaultSafeAreaView } from 'react-native';

import Colors from '../constants/Colors';

export function useThemeColor(
  props,
  colorName,
) {
  //const theme = useColorScheme() ?? 'light';
  const theme = 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  //removing darkmode for now
  //const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const color = useThemeColor({ light: lightColor }, 'text');
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  //const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const backgroundColor = useThemeColor({ light: lightColor }, 'background');
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function SafeAreaView(props: SafeAreaViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  //const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const backgroundColor = useThemeColor({ light: lightColor}, 'background');
  return <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}