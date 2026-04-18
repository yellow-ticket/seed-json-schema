import { merge } from "../src/utils/merge";

it("merges schemas", () => {
  expect(
    merge([{ type: "string" }, { minLength: 1 }, { description: "abc" }]),
  ).toEqual({
    description: "abc",
    type: "string",
    minLength: 1,
  });
});

it("overrides primitive values", () => {
  expect(merge([{ type: "string" }, { type: "number" }])).toEqual({
    type: "number",
  });
});

it("deeply merges nested objects", () => {
  expect(
    merge([
      { properties: { name: { type: "string" } } },
      { properties: { age: { type: "integer" } } },
    ]),
  ).toEqual({
    properties: {
      name: { type: "string" },
      age: { type: "integer" },
    },
  });
});

it("concatenates arrays", () => {
  expect(merge([{ enum: ["a", "b"] }, { enum: ["c", "d"] }])).toEqual({
    enum: ["a", "b", "c", "d"],
  });
});

it("deduplicates arrays", () => {
  expect(
    merge([{ required: ["id", "name"] }, { required: ["name", "email"] }]),
  ).toEqual({ required: ["id", "name", "email"] });
});

it("skips boolean schemas", () => {
  expect(merge([true, { type: "string" }])).toEqual({ type: "string" });
});

it("flattens nested allOf arrays", () => {
  expect(
    merge([
      { type: "object" },
      { allOf: [{ required: ["id"] }, { required: ["name"] }] },
    ]),
  ).toEqual({ type: "object", required: ["id", "name"] });
});
