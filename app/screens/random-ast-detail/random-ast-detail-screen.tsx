import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { RowView, Screen, Text, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { SafeAreaView } from "react-native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const FULL: ViewStyle = {
  flex: 1,
}

export const RandomAstDetailScreen = observer(function RandomAstDetailScreen() {
  // Pull in one of our MST stores
  const { randomIdStore } = useStores()
  const { astData } = randomIdStore
  const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } = astData

  // Pull in navigation via hook
  const navigation = useNavigation()
  const onLestPress = () => navigation.goBack()
  return (
    <SafeAreaView style={FULL}>
      <Screen style={ROOT} preset="scroll" unsafe>
        <Header leftIcon={"back"} onLeftPress={onLestPress} />
        <View style={{ marginHorizontal: spacing[4], marginVertical: spacing[4] }}>
          <RowView title={"randomInput.name"} value={name} />
          <RowView title={"randomInput.nasa_jpl_url"} value={nasa_jpl_url} />
          <RowView
            title={"randomInput.is_potentially_hazardous_asteroid"}
            value={is_potentially_hazardous_asteroid.toString()}
            titleStyles={{ flex: 6 }}
            valueStyles={{ flex: 3 }}
          />
        </View>
      </Screen>
    </SafeAreaView>
  )
})
