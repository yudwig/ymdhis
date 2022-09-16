import { ymdhis } from "./index";

describe("Basic alias properties", () => {
  // 2000-01-02 12:34:56 (Sunday)
  const date = ymdhis(new Date(2000, 0, 2, 12, 34, 56));
  it("year", () => {
    expect(date.year).toBe(2000);
  });
  it("month", () => {
    expect(date.month).toBe(1);
  });
  it("day", () => {
    expect(date.day).toBe(2);
  });
  it("dow", () => {
    expect(date.dow).toBe(0);
  });
  it("hour", () => {
    expect(date.hour).toBe(12);
  });
  it("minute", () => {
    expect(date.minute).toBe(34);
  });
  it("second", () => {
    expect(date.second).toBe(56);
  });
});

describe("Calculated properties", () => {
  it("ampm", () => {
    expect(ymdhis(new Date(2000, 0, 1, 0, 0, 0)).ampm).toBe(0);
    expect(ymdhis(new Date(2000, 0, 1, 1, 0, 0)).ampm).toBe(1);
    expect(ymdhis(new Date(2000, 0, 1, 11, 0, 0)).ampm).toBe(11);
    expect(ymdhis(new Date(2000, 0, 1, 12, 0, 0)).ampm).toBe(0);
    expect(ymdhis(new Date(2000, 0, 1, 23, 0, 0)).ampm).toBe(11);
  });
  it("number", () => {
    expect(ymdhis(new Date(2022, 0, 2, 12, 34, 56)).number).toBe(
      20220102123456
    );
  });
});

describe("Basic format date properties", () => {
  it("y: digits 4", () => {
    expect(ymdhis(new Date(1987, 0, 1)).y).toBe("1987");
  });
  it("y: digits 2, enable padding", () => {
    expect(ymdhis(new Date(1987, 0, 1)).setYearAsTwoDigits().y).toBe("87");
    expect(ymdhis(new Date(2003, 0, 1)).setYearAsTwoDigits().y).toBe("03");
    expect(ymdhis(new Date(2000, 0, 1)).setYearAsTwoDigits().y).toBe("00");
  });
  it("y: digits 2, disable padding", () => {
    expect(
      ymdhis(new Date(1987, 0, 1)).setYearAsTwoDigits().disableYearPadding().y
    ).toBe("87");
    expect(
      ymdhis(new Date(2003, 0, 1)).setYearAsTwoDigits().disableYearPadding().y
    ).toBe("3");
    expect(
      ymdhis(new Date(2000, 0, 1)).setYearAsTwoDigits().disableYearPadding().y
    ).toBe("0");
  });
  it("m: enable padding", () => {
    expect(ymdhis(new Date(2000, 0, 1)).m).toBe("01");
    expect(ymdhis(new Date(2000, 11, 1)).m).toBe("12");
  });
  it("m: disable padding", () => {
    expect(ymdhis(new Date(2000, 0, 1)).disableMonthPadding().m).toBe("1");
    expect(ymdhis(new Date(2000, 11, 1)).disableMonthPadding().m).toBe("12");
  });
  it("d: enable padding", () => {
    expect(ymdhis(new Date(2000, 0, 1)).d).toBe("01");
    expect(ymdhis(new Date(2000, 0, 20)).d).toBe("20");
  });
  it("d: disable padding", () => {
    expect(ymdhis(new Date(2000, 0, 1)).disableDayPadding().d).toBe("1");
    expect(ymdhis(new Date(2000, 0, 20)).disableDayPadding().d).toBe("20");
  });
  it("noPaddingDate()", () => {
    expect(ymdhis(new Date(2000, 0, 1)).disableDatePadding().y).toBe("2000");
    expect(ymdhis(new Date(2000, 0, 1)).disableDatePadding().m).toBe("1");
    expect(ymdhis(new Date(2000, 0, 1)).disableDatePadding().d).toBe("1");
    expect(ymdhis(new Date(2000, 11, 20)).disableDatePadding().m).toBe("12");
    expect(ymdhis(new Date(2000, 11, 20)).disableDatePadding().d).toBe("20");
  });
  it("h: enable padding", () => {
    expect(ymdhis(new Date(2000, 0, 1, 1, 0, 0)).h).toBe("01");
    expect(ymdhis(new Date(2000, 0, 1, 12, 0, 0)).h).toBe("12");
  });
  it("h: disable padding", () => {
    expect(ymdhis(new Date(2000, 0, 1, 1, 0, 0)).disableHourPadding().h).toBe("1");
    expect(ymdhis(new Date(2000, 0, 1, 12, 0, 0)).disableHourPadding().h).toBe(
      "12"
    );
  });
  it("i: enable padding", () => {
    expect(ymdhis(new Date(2000, 0, 1, 1, 1, 0)).i).toBe("01");
    expect(ymdhis(new Date(2000, 0, 1, 1, 20, 0)).i).toBe("20");
  });
  it("i: disable padding", () => {
    expect(ymdhis(new Date(2000, 0, 1, 1, 1, 0)).disableMinutePadding().i).toBe(
      "1"
    );
    expect(ymdhis(new Date(2000, 0, 1, 1, 20, 0)).disableMinutePadding().i).toBe(
      "20"
    );
  });
  it("s: enable padding", () => {
    expect(ymdhis(new Date(2000, 0, 1, 1, 1, 1)).s).toBe("01");
    expect(ymdhis(new Date(2000, 0, 1, 1, 1, 20)).s).toBe("20");
  });
  it("s: disable padding", () => {
    expect(ymdhis(new Date(2000, 0, 1, 1, 1, 1)).disableSecondPadding().s).toBe(
      "1"
    );
    expect(ymdhis(new Date(2000, 0, 1, 1, 1, 20)).disableSecondPadding().s).toBe(
      "20"
    );
  });
  it("w: default dow notations", () => {
    // 2022-01-01 (Saturday)
    expect(ymdhis(new Date(2022, 0, 1)).w).toBe("Saturday");
    expect(ymdhis(new Date(2022, 0, 2)).w).toBe("Sunday");
    expect(ymdhis(new Date(2022, 0, 3)).w).toBe("Monday");
    expect(ymdhis(new Date(2022, 0, 4)).w).toBe("Tuesday");
    expect(ymdhis(new Date(2022, 0, 5)).w).toBe("Wednesday");
    expect(ymdhis(new Date(2022, 0, 6)).w).toBe("Thursday");
    expect(ymdhis(new Date(2022, 0, 7)).w).toBe("Friday");
    expect(ymdhis(new Date(2022, 0, 8)).w).toBe("Saturday");
  });
  it("w: set incomplete dow list", () => {
    // 2022-01-02 (Sunday)
    const list = ["Sun.", "Mon.", "Tue."];
    expect(ymdhis(new Date(2022, 0, 2)).setDowNotations(list).w).toBe("Sun.");
    expect(ymdhis(new Date(2022, 0, 3)).setDowNotations(list).w).toBe("Mon.");
    expect(ymdhis(new Date(2022, 0, 4)).setDowNotations(list).w).toBe("Tue.");
    expect(ymdhis(new Date(2022, 0, 5)).setDowNotations(list).w).toBe("");
    expect(ymdhis(new Date(2022, 0, 6)).setDowNotations(list).w).toBe("");
    expect(ymdhis(new Date(2022, 0, 7)).setDowNotations(list).w).toBe("");
    expect(ymdhis(new Date(2022, 0, 8)).setDowNotations(list).w).toBe("");
    expect(ymdhis(new Date(2022, 0, 9)).setDowNotations(list).w).toBe("Sun.");
  });
  it("a", () => {
    expect(ymdhis(new Date(2000, 0, 1, 0, 0)).a).toBe("AM");
    expect(ymdhis(new Date(2000, 0, 1, 12, 0)).a).toBe("AM");
    expect(ymdhis(new Date(2000, 0, 1, 13, 0)).a).toBe("PM");
    expect(ymdhis(new Date(2000, 0, 1, 23, 0)).a).toBe("PM");
  });
});

describe("Combined format date properties", () => {
  it("ymd", () => {
    expect(ymdhis(new Date(2000, 0, 2)).ymd).toBe("2000-01-02");
    expect(ymdhis(new Date(2000, 0, 2)).separateDateBy("/").ymd).toBe(
      "2000/01/02"
    );
  });
});
