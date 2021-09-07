import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { RowView, Screen, Text, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { View } from "react-native"
import _ from "lodash"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  marginHorizontal: spacing[4],
  marginVertical: spacing[4],
}
const TITLE: TextStyle = {
  color: color.palette.black,
  fontWeight: "bold",
  letterSpacing: 1.8,
}

export const PostListDetailScreen = observer(function PostListDetailScreen() {
  // Pull in one of our MST stores
  const { postStore } = useStores()
  const { postDetail } = postStore

  // Pull in navigation via hook
  const navigation = useNavigation()

  const onLeftPress = () => navigation.goBack()

  const story_url = _.get(postDetail, "story_url", "-----")
  console.log("storyUrl===", story_url)

  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <Header
        leftIcon={"back"}
        headerText={"Post Detail"}
        titleStyle={TITLE}
        onLeftPress={onLeftPress}
      />
      <View style={CONTAINER}>
        <RowView title={"postList.title"} value={postDetail.title} />
        <RowView title={"postList.author"} value={postDetail.author} />
        <RowView title={"postList.created_at"} value={postDetail.created_at} />
        <RowView title={"postList.url"} value={postDetail.url.toString()} />
        <RowView
          title={"postList.story_url"}
          value={postDetail.story_url !== null ? postDetail.story_url : story_url}
        />
        <RowView title={"postList.story_title"} value={postDetail.story_title} />
        <RowView title={"postList.num_comments"} value={postDetail.num_comments.toString()} />
      </View>
    </Screen>
  )
})
