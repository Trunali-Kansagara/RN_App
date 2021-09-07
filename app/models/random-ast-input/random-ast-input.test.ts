import { RandomAstInputModel } from "./random-ast-input"

test("can be created", () => {
  const instance = RandomAstInputModel.create({})

  expect(instance).toBeTruthy()
})
