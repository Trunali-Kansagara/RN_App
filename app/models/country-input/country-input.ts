import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { Api, GetCountryResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const CountryInputModel = types
  .model("CountryInput")
  .props({
    countryName: types.optional(types.string, ""),
    isLoading: types.optional(types.boolean, false),
    countryData: types.optional(types.frozen(), null),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    changeCountryName(countryName: string) {
      self.countryName = countryName
    },
    fetchCountryDetail: flow(function* fetchCountryDetail() {
      try {
        console.log("1")

        self.isLoading = true
        const data: GetCountryResult = yield api.getCountryDetail(self.countryName)
        if (data.kind === "ok") {
          const response = data.country
          for (let index = 0; index < response.length; index++) {
            const element = response[index]
            if (element.name.toLocaleLowerCase() === self.countryName.toLocaleLowerCase()) {
              self.countryData = element
              self.isLoading = false
              return true
            }
          }
        } else {
          console.log("kind====", data.kind)
          Alert.alert("data not found")
          self.isLoading = false
          return false
        }
      } catch (error) {
        self.isLoading = false
        Alert.alert("something wrong")
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type CountryInputType = Instance<typeof CountryInputModel>
export interface CountryInput extends CountryInputType {}
type CountryInputSnapshotType = SnapshotOut<typeof CountryInputModel>
export interface CountryInputSnapshot extends CountryInputSnapshotType {}
export const createCountryInputDefaultModel = () => types.optional(CountryInputModel, {})
