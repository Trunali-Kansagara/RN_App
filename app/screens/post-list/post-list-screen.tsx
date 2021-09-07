import React from "react"
import { observer } from "mobx-react-lite"
import { FlatList, SafeAreaView, TouchableOpacity, ViewStyle } from "react-native"
import { RowView, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useEffect } from "react"
import { ActivityIndicator } from "react-native"
import { toJS } from "mobx"
import { View } from "react-native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const LISTCONTAINER: ViewStyle = {
  marginHorizontal: spacing[2],
  marginVertical: spacing[1],
}
const SEPERATOR: ViewStyle = {
  backgroundColor: color.palette.lighterGrey,
  padding: spacing[1],
}
export const PostListScreen = observer(function PostListScreen() {
  // Pull in one of our MST stores
  const { postStore } = useStores()

  // Pull in navigation via hook
  const navigation: any = useNavigation()

  useEffect(() => {
    async function fetchData() {
      await postStore.fetchPost()
    }
    const interval = setInterval(async () => {
      await postStore.fetchMorePost()
    }, 10000)
    fetchData()
    return () => {
      clearInterval(interval)
    }
  }, [])

  const onPostDetail = async (item) => {
    postStore.updatePostDetail(item)
    navigation.navigate("postDetail")
  }

  const onEndReached = async () => {
    if (!postStore.isLoading) {
      await postStore.fetchMorePost()
    }
  }
  const renderList = (item: any, index: number) => {
    return (
      <TouchableOpacity
        style={LISTCONTAINER}
        onPress={() => {
          onPostDetail(item)
        }}
      >
        <RowView title={"postList.title"} value={item.title} />
        <RowView title={"postList.url"} value={item.url} />
        <RowView title={"postList.author"} value={item.author} />
        <RowView title={"postList.created_at"} value={item.created_at} />
      </TouchableOpacity>
    )
  }
  const listFooterComponent = () => {
    return <ActivityIndicator size={"small"} color={color.palette.orange} />
  }

  const itemSeparator = () => {
    return <View style={SEPERATOR} />
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Screen style={ROOT} preset="fixed" unsafe>
        {/* {postStore.isLoading && <ActivityIndicator size={"large"} color={"orange"} />} */}
        <FlatList
          data={toJS(postStore.postData)}
          renderItem={({ item, index }) => renderList(item, index)}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.1}
          onEndReached={onEndReached}
          ListFooterComponent={listFooterComponent}
          ItemSeparatorComponent={itemSeparator}
        />
      </Screen>
    </SafeAreaView>
  )
})
