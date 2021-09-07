import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { Api, GetPostResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const PostListModel = types
  .model("PostList")
  .props({
    postData: types.optional(types.frozen(), null),
    isLoading: types.optional(types.boolean, false),
    pageNo: types.optional(types.number, 0),
    postDetail: types.optional(types.frozen(), null),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    fetchPost: flow(function* fetchPost() {
      try {
        console.log("id====", types.identifierNumber)

        self.isLoading = true
        const response = yield api.getPost(self.pageNo)
        if (response.kind === "ok") {
          console.log("data=====", response)
          self.postData = response.post.hits
          self.isLoading = false
        } else {
          console.log("kind=====", response.kind)
          self.isLoading = false
        }
      } catch (error) {
        Alert.alert("something went wrong")
        self.isLoading = false
      }
    }),
    fetchMorePost: flow(function* fetchMorePost() {
      try {
        self.pageNo = self.pageNo + 1
        self.isLoading = true

        const response = yield api.getPost(self.pageNo)
        console.log("pageno", self.pageNo)

        if (response.kind === "ok") {
          const data = [...self.postData, ...response.post.hits]
          self.postData = data
          self.isLoading = false
        } else {
          self.isLoading = false
        }
      } catch (error) {
        self.isLoading = false

        Alert.alert("something wrong")
      }
    }),
    updatePostDetail(post: any) {
      self.postDetail = post
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PostListType = Instance<typeof PostListModel>
export interface PostList extends PostListType {}
type PostListSnapshotType = SnapshotOut<typeof PostListModel>
export interface PostListSnapshot extends PostListSnapshotType {}
export const createPostListDefaultModel = () => types.optional(PostListModel, {})
