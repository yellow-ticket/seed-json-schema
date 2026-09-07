import type { JSONSchema7 } from "json-schema";
import { seedSchema } from "../src/seed-schema.js";

describe("allOf", () => {
  it.each<[string, JSONSchema7, unknown]>([
    [
      "merges properties from multiple schemas",
      {
        allOf: [
          { type: "object", properties: { name: { type: "string" } } },
          { type: "object", properties: { age: { type: "integer" } } },
        ],
      },
      { name: "yowza", age: 34 },
    ],
    [
      "respects allOf in properties",
      {
        type: "object",
        properties: {
          user: {
            allOf: [
              { type: "object", properties: { name: { type: "string" } } },
              { type: "object", properties: { age: { type: "integer" } } },
            ],
          },
        },
      },
      { user: { name: "yowza", age: 34 } },
    ],
    [
      "respects nested allOf schemas",
      {
        allOf: [
          { type: "object", properties: { name: { type: "string" } } },
          {
            allOf: [
              { type: "object", properties: { age: { type: "integer" } } },
              { type: "object", properties: { active: { type: "boolean" } } },
            ],
          },
        ],
      },
      { name: "yowza", age: 34, active: true },
    ],
    [
      "merges sibling keywords alongside allOf",
      {
        type: "object",
        properties: { name: { type: "string" } },
        allOf: [
          { type: "object", properties: { age: { type: "integer" } } },
        ],
      },
      { name: "yowza", age: 34 },
    ],
  ])("%s", (_, input, output) => {
    expect(seedSchema(input)).toEqual(output);
  });
});

describe("oneOf", () => {
  it.each<[string, JSONSchema7, unknown]>([
    [
      "picks the first schema",
      {
        oneOf: [
          { type: "object", properties: { name: { type: "string" } } },
          { type: "object", properties: { age: { type: "integer" } } },
        ],
      },
      { name: "yowza" },
    ],
    [
      "respects oneOf in properties",
      {
        type: "object",
        properties: {
          user: {
            oneOf: [
              { type: "object", properties: { name: { type: "string" } } },
              { type: "object", properties: { age: { type: "integer" } } },
            ],
          },
        },
      },
      { user: { name: "yowza" } },
    ],
    [
      "respects nested oneOf schemas",
      {
        oneOf: [
          {
            oneOf: [
              { type: "object", properties: { name: { type: "string" } } },
              { type: "object", properties: { age: { type: "integer" } } },
            ],
          },
          {
            type: "object",
            properties: { active: { type: "boolean" } },
          },
        ],
      },
      { name: "yowza" },
    ],
    [
      "merges sibling keywords alongside oneOf",
      {
        type: "object",
        properties: { name: { type: "string" } },
        oneOf: [
          { type: "object", properties: { age: { type: "integer" } } },
          { type: "object", properties: { active: { type: "boolean" } } },
        ],
      },
      { name: "yowza", age: 34 },
    ],
  ])("%s", (_, input, output) => {
    expect(seedSchema(input)).toEqual(output);
  });
});

describe("anyOf", () => {
  it.each<[string, JSONSchema7, unknown]>([
    [
      "picks the first schema",
      {
        anyOf: [
          { type: "object", properties: { name: { type: "string" } } },
          { type: "object", properties: { age: { type: "integer" } } },
        ],
      },
      { name: "yowza" },
    ],
    [
      "respects anyOf in properties",
      {
        type: "object",
        properties: {
          user: {
            anyOf: [
              { type: "object", properties: { name: { type: "string" } } },
              { type: "object", properties: { age: { type: "integer" } } },
            ],
          },
        },
      },
      { user: { name: "yowza" } },
    ],
    [
      "respects nested anyOf schemas",
      {
        anyOf: [
          {
            anyOf: [
              { type: "object", properties: { name: { type: "string" } } },
              { type: "object", properties: { age: { type: "integer" } } },
            ],
          },
          {
            type: "object",
            properties: { active: { type: "boolean" } },
          },
        ],
      },
      { name: "yowza" },
    ],
    [
      "merges sibling keywords alongside anyOf",
      {
        type: "object",
        properties: { name: { type: "string" } },
        anyOf: [
          { type: "object", properties: { age: { type: "integer" } } },
          { type: "object", properties: { active: { type: "boolean" } } },
        ],
      },
      { name: "yowza", age: 34 },
    ],
  ])("%s", (_, input, output) => {
    expect(seedSchema(input)).toEqual(output);
  });
});
