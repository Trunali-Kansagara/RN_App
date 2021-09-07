import React from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Keyboard, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { SafeAreaView } from "react-native"
import { TextStyle } from "react-native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  ...FULL,
  justifyContent: "center",
  marginHorizontal: spacing[4],
}
const INPUT: TextStyle = {
  backgroundColor: color.palette.offWhite,
  paddingStart: spacing[2],
  color: color.palette.black,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: color.palette.lighterGrey,
}
const SUBMIT: ViewStyle = {
  paddingVertical: spacing[4],
  marginHorizontal: spacing[2],
}
const SUBMIT_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 14,
  textTransform: "uppercase",
  letterSpacing: 1.8,
}

export const CountryInputScreen = observer(function CountryInputScreen() {
  // Pull in one of our MST stores
  const { countryStore } = useStores()

  // Pull in navigation via hook
  const navigation: any = useNavigation()

  const onSubmit = async () => {
    Keyboard.dismiss()

    let status = await countryStore.fetchCountryDetail()
    if (status) {
      navigation.navigate("countryDetail")
    }
  }

  return (
    <SafeAreaView style={FULL}>
      <Screen style={ROOT} preset="scroll" unsafe>
        <View style={CONTAINER}>
          <TextField
            placeholderTx={"countryInput.placeholder"}
            placeholderTextColor={color.palette.black}
            inputStyle={INPUT}
            value={countryStore.countryName}
            onChangeText={(text) => {
              countryStore.changeCountryName(text)
            }}
          />
          <Button
            disabled={countryStore.countryName ? false : true}
            tx={"countryInput.submit"}
            style={[
              SUBMIT,
              { backgroundColor: countryStore.countryName ? color.primary : color.dim },
            ]}
            textStyle={SUBMIT_TEXT}
            onPress={onSubmit}
          >
            {countryStore.isLoading && <ActivityIndicator size={"small"} color={"white"} />}
          </Button>
        </View>
      </Screen>
    </SafeAreaView>
  )
})
