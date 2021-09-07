import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"
import { TxKeyPath } from "../../i18n"

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing[1],
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 16,
  color: color.palette.black,
  flex: 2,
  lineHeight: 20,
  letterSpacing: 2,
  textTransform: "capitalize",
}
const VALUE: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.palette.black,
  flex: 7,
  lineHeight: 20,
  letterSpacing: 2,
}

export interface RowViewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  title?: TxKeyPath
  value?: any
  titleStyles?: StyleProp<TextStyle>
  valueStyles?: StyleProp<TextStyle>
}

/**
 * Describe your component here
 */
export const RowView = observer(function RowView(props: RowViewProps) {
  const { style, title, value, titleStyles, valueStyles } = props
  const styles = flatten([CONTAINER, style])
  const titleStyle = flatten([TEXT, titleStyles])
  const valueStyle = flatten([VALUE, valueStyles])

  return (
    <View style={styles}>
      <Text preset={"bold"} style={titleStyle} tx={title} />
      <Text preset={"bold"} style={[TEXT, { flex: 1 }]} text={":"} />
      <Text style={valueStyle} text={value} />
    </View>
  )
})
