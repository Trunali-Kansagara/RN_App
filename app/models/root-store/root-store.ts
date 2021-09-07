import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { CountryInputModel } from "../country-input/country-input"
import { PostListModel } from "../post-list/post-list"
import { RandomAstInputModel } from "../random-ast-input/random-ast-input"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  postStore:types.optional(PostListModel,{} as any),
  randomIdStore:types.optional(RandomAstInputModel,{} as any),
  countryStore:types.optional(CountryInputModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
