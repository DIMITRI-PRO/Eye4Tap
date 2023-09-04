import format from "../../src/utils/formatQuery";

const { formatInsertQuery } = format;

describe("formatInsertQuery", () => {
  test("should return formatted query, set, and values", () => {
    const data = {
      key1: "value1",
      key2: "value2",
    };

    const expectedResult = {
      query: "(key1, key2)",
      set: "(?, ?)",
      values: ["value1", "value2"],
    };

    const result = formatInsertQuery(data);

    expect(result.query).toEqual(expectedResult.query);
    expect(result.set).toEqual(expectedResult.set);
    expect(result.values).toEqual(expectedResult.values);
  });
});
