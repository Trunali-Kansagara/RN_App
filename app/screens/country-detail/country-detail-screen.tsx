import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Screen, Text, Header, RowView } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { SvgUri } from "react-native-svg"
import { TextStyle } from "react-native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const ROWS: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
const FLAG_TEXT: TextStyle = {
  color: color.palette.black,
  fontSize: 14,
  // lineHeight: 2,
  fontWeight: "bold",
  flex: 0.2,
  letterSpacing: 2,
  // backgroundColor: "red",
  // height: 100,
}
export const CountryDetailScreen = observer(function CountryDetailScreen() {
  // Pull in one of our MST stores
  const { countryStore } = useStores()
  const { countryData } = countryStore
  console.log("capital====", countryData.capital)

  const RenderFlagView = () => {
    return (
      <View style={ROWS}>
        <Text text={"Flag"} style={FLAG_TEXT} />
        <Text text={":"} style={[FLAG_TEXT, { flex: 0.2 }]} />

        <View style={{ flex: 1 }}>
          <SvgUri uri={countryData.flag} height={50} width={50} />
        </View>
      </View>
    )
  }

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        leftIcon={"back"}
        onLeftPress={() => {
          navigation.goBack()
        }}
      />
      <View style={{ flex: 1, justifyContent: "center", marginHorizontal: spacing[4] }}>
        <RowView
          style={{ justifyContent: "center" }}
          title={"countryInput.capital"}
          value={countryData.capital}
        />
        <RowView
          titleStyles={{ flex: 4 }}
          title={"countryInput.population"}
          value={countryData.population}
        />
        <RowView title={"countryInput.latlng"} value={countryData.latlng[0]} />

        <RenderFlagView />
      </View>
    </Screen>
  )
})
