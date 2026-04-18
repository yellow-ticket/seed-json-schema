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
      { name: "fully", age: 100 },
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
      { user: { name: "fully", age: 100 } },
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
      { name: "fully", age: 100, active: true },
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
      { name: "fully", age: 100 },
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
      { name: "fully" },
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
      { user: { name: "fully" } },
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
      { name: "fully" },
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
      { name: "fully", age: 100 },
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
      { name: "fully" },
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
      { user: { name: "fully" } },
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
      { name: "fully" },
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
      { name: "fully", age: 100 },
    ],
  ])("%s", (_, input, output) => {
    expect(seedSchema(input)).toEqual(output);
  });
});
