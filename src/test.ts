import { ymdhis } from "./index"


describe("Basic alias properties", () => {
  // 2000-01-02 12:34:56 (Sunday)
  const date = ymdhis(new Date(2000, 0, 2, 12, 34, 56));
  it("year", () => {
    expect(date.year).toBe(2000)
  })
  it("month", () => {
    expect(date.month).toBe(1)
  })
  it("day", () => {
    expect(date.day).toBe(2)
  })
  it("dow", () => {
    expect(date.dow).toBe(0)
  })
  it("hour", () => {
    expect(date.hour).toBe(12)
  })
  it("minute", () => {
    expect(date.minute).toBe(34)
  })
  it("second", () => {
    expect(date.second).toBe(56)
  })
})

describe("Calculated properties", () => {
  it("ampm", () => {
    expect(ymdhis(new Date(2000, 0, 1, 0, 0, 0)).ampm).toBe(0)
    expect(ymdhis(new Date(2000, 0, 1, 1, 0, 0)).ampm).toBe(1)
    expect(ymdhis(new Date(2000, 0, 1, 11, 0, 0)).ampm).toBe(11)
    expect(ymdhis(new Date(2000, 0, 1, 12, 0, 0)).ampm).toBe(0)
    expect(ymdhis(new Date(2000, 0, 1, 23, 0, 0)).ampm).toBe(11)
  })
  it("number", () => {
    expect(ymdhis(new Date(2022, 0, 2, 12, 34, 56)).number).toBe(
      20220102123456
    )
  })
})


