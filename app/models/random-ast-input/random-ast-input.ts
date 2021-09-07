import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { Api, GetRandomIDResult } from "../../services/api"
import { findRandomObject } from "../../utils/utils"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const RandomAstInputModel = types
  .model("RandomAstInput")
  .props({
    randomId: types.optional(types.string, ""),
    isLoading: types.optional(types.boolean, false),
    astData: types.optional(types.frozen(), null),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    onChangeRandomId(randomId: string) {
      self.randomId = randomId
    },
    fetchRandomId: flow(function* fetchRandomId() {
      try {
        self.isLoading = true
        const response: GetRandomIDResult = yield api.getRandomId()
        if (response.kind === "ok") {
          const randomData = findRandomObject(response.randomData.near_earth_objects)
          console.log("randomData====", randomData.id)
          self.randomId = randomData.id

          self.isLoading = false
        } else {
          console.log("kind====", response.kind)
          self.isLoading = false
        }
      } catch (error) {
        self.isLoading = false
        Alert.alert("something wrong")
      }
    }),
    fetchAstData: flow(function* fetchAstData() {
      try {
        self.isLoading = true
        self.isLoading = true
        const data: GetRandomIDResult = yield api.getAstData(self.randomId)
        console.log("data====", data)

        if (data.kind === "ok") {
          self.astData = data.randomData
          self.isLoading = false
          return true
        } else {
          self.astData = null
          Alert.alert("please enter valid id")
          self.isLoading = false
          return false
        }
      } catch (error) {
        self.isLoading = false
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type RandomAstInputType = Instance<typeof RandomAstInputModel>
export interface RandomAstInput extends RandomAstInputType {}
type RandomAstInputSnapshotType = SnapshotOut<typeof RandomAstInputModel>
export interface RandomAstInputSnapshot extends RandomAstInputSnapshotType {}
export const createRandomAstInputDefaultModel = () => types.optional(RandomAstInputModel, {})
