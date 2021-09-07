import React from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Keyboard, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
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
const CONTAINER: ViewStyle = {
  ...FULL,
  justifyContent: "center",
  marginHorizontal: spacing[4],
}
const INPUT: TextStyle = {
  backgroundColor: color.palette.lighterGrey,
  color: color.palette.black,
  paddingStart: spacing[2],
}
const SUBMIT_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: 1.8,
}
const SUBMIT: ViewStyle = {
  paddingVertical: spacing[4],
  marginHorizontal: spacing[4],
  marginVertical: spacing[2],
}

export const RandomAstInputScreen = observer(function RandomAstInputScreen() {
  // Pull in one of our MST stores
  const { randomIdStore } = useStores()

  // Pull in navigation via hook
  const navigation: any = useNavigation()

  const onRandomIDPress = async () => {
    Keyboard.dismiss()
    await randomIdStore.fetchRandomId()
  }

  const onSubmit = async () => {
    Keyboard.dismiss()
    let status: any = await randomIdStore.fetchAstData()
    if (status) {
      navigation.navigate("randomAstDetail")
    } else {
      randomIdStore.onChangeRandomId("")
    }
  }
  return (
    <SafeAreaView style={FULL}>
      <Screen style={ROOT} preset="fixed">
        <View style={CONTAINER}>
          {randomIdStore.isLoading && <ActivityIndicator color={"orange"} size={"large"} />}
          <TextField
            placeholderTx={"randomInput.placeholder"}
            placeholderTextColor={color.palette.black}
            inputStyle={INPUT}
            value={randomIdStore.randomId}
            onChangeText={(text) => {
              randomIdStore.onChangeRandomId(text)
            }}
          />
          <Button
            disabled={randomIdStore.randomId ? false : true}
            tx={"randomInput.submit"}
            style={[
              SUBMIT,
              { backgroundColor: randomIdStore.randomId ? color.primary : color.dim },
            ]}
            textStyle={SUBMIT_TEXT}
            onPress={onSubmit}
          />
          <Button
            tx={"randomInput.randomId"}
            style={[SUBMIT, { backgroundColor: color.palette.deepPurple }]}
            textStyle={SUBMIT_TEXT}
            onPress={onRandomIDPress}
          />
        </View>
      </Screen>
    </SafeAreaView>
  )
})
