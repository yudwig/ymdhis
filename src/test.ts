import { ymdhis } from "./index";

describe("Basic alias properties", () => {
  // 2000-01-02 12:34:56 (Sunday)
  const date = ymdhis(2000, 1, 2, 12, 34, 56);
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
    expect(ymdhis(2000, 1, 1, 0, 0, 0).ampmHour).toBe(12);
    expect(ymdhis(2000, 1, 1, 1, 0, 0).ampmHour).toBe(1);
    expect(ymdhis(2000, 1, 1, 11, 0, 0).ampmHour).toBe(11);
    expect(ymdhis(2000, 1, 1, 12, 0, 0).ampmHour).toBe(12);
    expect(ymdhis(2000, 1, 1, 23, 0, 0).ampmHour).toBe(11);
  });
  it("number", () => {
    expect(ymdhis(2022, 1, 2, 12, 34, 56).number).toBe(20220102123456);
  });
  it("string", () => {
    expect(ymdhis(2022, 1, 2, 12, 34, 56).string).toBe("2022-01-02 12:34:56");
  });
  it("timestamp", () => {
    expect(ymdhis().utc(0).timestamp).toBe(0);
    expect(ymdhis().utc(-1).timestamp).toBe(-1);
    expect(ymdhis(1970, 1, 1).timestamp).toBe(0);
    expect(ymdhis().utc(1970, 1, 1).local().timestamp).toBe(
      (7 * 60 + 30) * 60 * 1000
    );
  });
  it("valueOf", () => {
    expect(ymdhis(2000, 1, 2) > ymdhis(2000, 1, 1)).toBe(true);
    expect(ymdhis(2000, 1, 2) < ymdhis(2000, 1, 1)).toBe(false);
    expect(ymdhis(2000, 1, 1, 0, 0, 0) < ymdhis(2000, 1, 1, 0, 0, 1)).toBe(
      true
    );
    expect(
      ymdhis(2000, 1, 1, 0, 0, 0, 0) < ymdhis(2000, 1, 1, 0, 0, 0, 1)
    ).toBe(true);
  });
});

describe("Basic format date properties", () => {
  it("y: digits 4", () => {
    expect(ymdhis(1987, 1, 1).y).toBe("1987");
  });
  it("y: digits 2, enable padding", () => {
    expect(ymdhis(1987, 1, 1).setYearAsTwoDigits().y).toBe("87");
    expect(ymdhis(2003, 1, 1).setYearAsTwoDigits().y).toBe("03");
    expect(ymdhis(2000, 1, 1).setYearAsTwoDigits().y).toBe("00");
  });
  it("y: digits 2, disable padding", () => {
    expect(ymdhis(1987, 1, 1).setYearAsTwoDigits().clearYearPadding().y).toBe(
      "87"
    );
    expect(ymdhis(2003, 1, 1).setYearAsTwoDigits().clearYearPadding().y).toBe(
      "3"
    );
    expect(ymdhis(2000, 1, 1).setYearAsTwoDigits().clearYearPadding().y).toBe(
      "0"
    );
  });
  it("m: enable padding", () => {
    expect(ymdhis(2000, 1, 1).m).toBe("01");
    expect(ymdhis(2000, 12, 1).m).toBe("12");
  });
  it("m: disable padding", () => {
    expect(ymdhis(2000, 1, 1).clearMonthPadding().m).toBe("1");
    expect(ymdhis(2000, 12, 1).clearMonthPadding().m).toBe("12");
  });
  it("d: enable padding", () => {
    expect(ymdhis(2000, 1, 1).d).toBe("01");
    expect(ymdhis(2000, 1, 20).d).toBe("20");
  });
  it("d: disable padding", () => {
    expect(ymdhis(2000, 1, 1).clearDayPadding().d).toBe("1");
    expect(ymdhis(2000, 1, 20).clearDayPadding().d).toBe("20");
  });
  it("h: enable padding", () => {
    expect(ymdhis(2000, 1, 1, 1, 0, 0).h).toBe("01");
    expect(ymdhis(2000, 1, 1, 12, 0, 0).h).toBe("12");
  });
  it("h: disable padding", () => {
    expect(ymdhis(2000, 1, 1, 1, 0, 0).clearHourPadding().h).toBe("1");
    expect(ymdhis(2000, 1, 1, 12, 0, 0).clearHourPadding().h).toBe("12");
  });
  it("i: enable padding", () => {
    expect(ymdhis(2000, 1, 1, 1, 1, 0).i).toBe("01");
    expect(ymdhis(2000, 1, 1, 1, 20, 0).i).toBe("20");
  });
  it("i: disable padding", () => {
    expect(ymdhis(2000, 1, 1, 1, 1, 0).clearMinutePadding().i).toBe("1");
    expect(ymdhis(2000, 1, 1, 1, 20, 0).clearMinutePadding().i).toBe("20");
  });
  it("s: enable padding", () => {
    expect(ymdhis(2000, 1, 1, 1, 1, 1).s).toBe("01");
    expect(ymdhis(2000, 1, 1, 1, 1, 20).s).toBe("20");
  });
  it("s: disable padding", () => {
    expect(ymdhis(2000, 1, 1, 1, 1, 1).clearSecondPadding().s).toBe("1");
    expect(ymdhis(2000, 1, 1, 1, 1, 20).clearSecondPadding().s).toBe("20");
  });
  it("w: default dow notations", () => {
    // 2022-01-01 (Saturday)
    expect(ymdhis(2022, 1, 1).w).toBe("Saturday");
    expect(ymdhis(2022, 1, 2).w).toBe("Sunday");
    expect(ymdhis(2022, 1, 3).w).toBe("Monday");
    expect(ymdhis(2022, 1, 4).w).toBe("Tuesday");
    expect(ymdhis(2022, 1, 5).w).toBe("Wednesday");
    expect(ymdhis(2022, 1, 6).w).toBe("Thursday");
    expect(ymdhis(2022, 1, 7).w).toBe("Friday");
    expect(ymdhis(2022, 1, 8).w).toBe("Saturday");
  });
  it("w: set incomplete dow list", () => {
    // 2022-01-02 (Sunday)
    const list = ["Sun.", "Mon.", "Tue."];
    expect(ymdhis(2022, 1, 2).setDowNotations(list).w).toBe("Sun.");
    expect(ymdhis(2022, 1, 3).setDowNotations(list).w).toBe("Mon.");
    expect(ymdhis(2022, 1, 4).setDowNotations(list).w).toBe("Tue.");
    expect(ymdhis(2022, 1, 5).setDowNotations(list).w).toBe("");
    expect(ymdhis(2022, 1, 6).setDowNotations(list).w).toBe("");
    expect(ymdhis(2022, 1, 7).setDowNotations(list).w).toBe("");
    expect(ymdhis(2022, 1, 8).setDowNotations(list).w).toBe("");
    expect(ymdhis(2022, 1, 9).setDowNotations(list).w).toBe("Sun.");
  });
  it("a", () => {
    expect(ymdhis(2000, 1, 1, 0, 0).a).toBe("AM");
    expect(ymdhis(2000, 1, 1, 11, 0).a).toBe("AM");
    expect(ymdhis(2000, 1, 1, 12, 0).a).toBe("PM");
    expect(ymdhis(2000, 1, 1, 23, 0).a).toBe("PM");
  });
});

describe("Combined format date properties", () => {
  it("ym", () => {
    expect(ymdhis(2000, 1, 2).ym).toBe("2000-01");
    expect(ymdhis(2000, 1, 2).setDateSeparator("/").ym).toBe("2000/01");
  });
  it("ymd", () => {
    expect(ymdhis(2000, 1, 2).ymd).toBe("2000-01-02");
    expect(ymdhis(2000, 1, 2).setDateSeparator("/").ymd).toBe("2000/01/02");
  });
  it("ymdhi", () => {
    expect(ymdhis(2000, 1, 2, 12, 34).ymdhi).toBe("2000-01-02 12:34");
    expect(
      ymdhis(2000, 1, 2, 12, 34)
        .setDateSeparator("/")
        .setDateTimeSeparator("-")
        .setTimeSeparator(".").ymdhi
    ).toBe("2000/01/02-12.34");
    expect(ymdhis(2000, 1, 2, 12, 34).setSeparators("/", "-", ".").ymdhi).toBe(
      "2000/01/02-12.34"
    );
  });
  it("ymdw", () => {
    // 2000-01-02 (Sunday)
    expect(ymdhis(2000, 1, 2).ymdw).toBe("2000-01-02 Sunday");
    expect(
      ymdhis(2000, 1, 2).setDateSeparator("/").setDowSeparator("_").ymdw
    ).toBe("2000/01/02_Sunday");
  });
  it("wymd", () => {
    // 2000-01-02 (Sunday)
    expect(ymdhis(2000, 1, 2).wymd).toBe("Sunday 2000-01-02");
    expect(
      ymdhis(2000, 1, 2).setDateSeparator("/").setDowSeparator("_").wymd
    ).toBe("Sunday_2000/01/02");
  });
  it("dmy", () => {
    expect(ymdhis(2000, 1, 2).dmy).toBe("02-01-2000");
    expect(ymdhis(2000, 1, 2).setDateSeparator("/").dmy).toBe("02/01/2000");
  });
  it("dm", () => {
    expect(ymdhis(2000, 1, 2).dm).toBe("02-01");
    expect(ymdhis(2000, 1, 2).setDateSeparator("/").dm).toBe("02/01");
  });
  it("mdy", () => {
    expect(ymdhis(2000, 1, 2).mdy).toBe("01-02-2000");
    expect(ymdhis(2000, 1, 2).setDateSeparator("/").mdy).toBe("01/02/2000");
  });
  it("md", () => {
    expect(ymdhis(2000, 1, 2).md).toBe("01-02");
    expect(ymdhis(2000, 1, 2).setDateSeparator("/").md).toBe("01/02");
  });
  it("hi", () => {
    expect(ymdhis(2000, 1, 2, 12, 34).hi).toBe("12:34");
    expect(ymdhis(2000, 1, 2, 12, 34).setTimeSeparator(".").hi).toBe("12.34");
  });
  it("his", () => {
    expect(ymdhis(2000, 1, 2, 12, 34, 56).his).toBe("12:34:56");
    expect(ymdhis(2000, 1, 2, 12, 34, 56).setTimeSeparator(".").his).toBe(
      "12.34.56"
    );
  });
  it("hia", () => {
    expect(ymdhis(2000, 1, 2, 0, 0).hia).toBe("12:00 AM");
    expect(ymdhis(2000, 1, 2, 11, 59).hia).toBe("11:59 AM");
    expect(ymdhis(2000, 1, 2, 12, 0).hia).toBe("12:00 PM");
    expect(ymdhis(2000, 1, 2, 23, 59).hia).toBe("11:59 PM");
    expect(
      ymdhis(2000, 1, 2, 12, 34).setTimeSeparator(".").setAmpmSeparator("_").hia
    ).toBe("12.34_PM");
    expect(ymdhis(2000, 1, 2, 3, 4, 5).clearHourPadding().hia).toBe("3:04 AM");
    expect(ymdhis(2000, 1, 2, 3, 4, 5).setHourSuffix("H").hia).toBe(
      "03H:04 AM"
    );

    expect(ymdhis(2000, 1, 2, 12, 34, 56).clearHourPadding().hia).toBe(
      "12:34 PM"
    );
    expect(ymdhis(2000, 1, 2, 12, 34, 56).setHourSuffix("H").hia).toBe(
      "12H:34 PM"
    );
  });
  it("hisa", () => {
    expect(ymdhis(2000, 1, 2, 0, 0).hisa).toBe("12:00:00 AM");
    expect(ymdhis(2000, 1, 2, 11, 59).hisa).toBe("11:59:00 AM");
    expect(ymdhis(2000, 1, 2, 12, 0).hisa).toBe("12:00:00 PM");
    expect(ymdhis(2000, 1, 2, 23, 59).hisa).toBe("11:59:00 PM");
    expect(
      ymdhis(2000, 1, 2, 12, 34, 56).setTimeSeparator(".").setAmpmSeparator("_")
        .hisa
    ).toBe("12.34.56_PM");
  });
  it("ahi", () => {
    expect(ymdhis(2000, 1, 2, 0, 0).ahi).toBe("AM 12:00");
    expect(ymdhis(2000, 1, 2, 11, 59).ahi).toBe("AM 11:59");
    expect(ymdhis(2000, 1, 2, 12, 0).ahi).toBe("PM 12:00");
    expect(ymdhis(2000, 1, 2, 23, 59).ahi).toBe("PM 11:59");
    expect(
      ymdhis(2000, 1, 2, 12, 34).setTimeSeparator(".").setAmpmSeparator("_").ahi
    ).toBe("PM_12.34");
  });
  it("ahis", () => {
    expect(ymdhis(2000, 1, 2, 0, 0).ahis).toBe("AM 12:00:00");
    expect(ymdhis(2000, 1, 2, 11, 59).ahis).toBe("AM 11:59:00");
    expect(ymdhis(2000, 1, 2, 12, 0).ahis).toBe("PM 12:00:00");
    expect(ymdhis(2000, 1, 2, 23, 59).ahis).toBe("PM 11:59:00");
    expect(
      ymdhis(2000, 1, 2, 12, 34, 56).setTimeSeparator(".").setAmpmSeparator("_")
        .ahis
    ).toBe("PM_12.34.56");
  });
});

describe("ISO date format properties", () => {
  it("iso9075", () => {
    expect(ymdhis(2022, 1, 2, 12, 34, 56).iso9075).toBe("2022-01-02 12:34:56");
    expect(
      ymdhis(2022, 1, 2, 12, 34, 56)
        .setDateSeparator("/")
        .setDateTimeSeparator("_")
        .setTimeSeparator(":")
        .setMonthNotations([])
        .setDayNotations([])
        .setYearSuffix("Y")
        .setMonthSuffix("M")
        .setDaySuffix("D")
        .setHourSuffix("H")
        .setMinuteSuffix("I")
        .setSecondSuffix("S")
        .clearDatePaddings()
        .clearTimePaddings().iso9075
    ).toBe("2022-01-02 12:34:56");
    expect(() => ymdhis("-")).toThrow();
  });
  it("iso8601", () => {
    expect(ymdhis(2022, 1, 2, 12, 34, 56, 7).iso8601).toBe(
      "2022-01-02T12:34:56.007+08:00"
    );
    expect(ymdhis().utc(2022, 1, 2, 12, 34, 56).iso8601).toBe(
      "2022-01-02T12:34:56.000Z"
    );
    expect(ymdhis().utc(2022, 1, 2, 12, 34, 56).iso8601).toBe(
      "2022-01-02T12:34:56.000Z"
    );
  });
});

describe("Calculate date functions", () => {
  it("afterYears", () => {
    expect(ymdhis(2000, 1, 2).afterYears(10).year).toBe(2010);
    expect(ymdhis(2000, 1, 2).afterYears(0).year).toBe(2000);
    expect(ymdhis(2000, 1, 2).afterYears(-10).year).toBe(1990);
  });
  it("beforeYears", () => {
    expect(ymdhis(2000, 1, 2).beforeYears(10).year).toBe(1990);
    expect(ymdhis(2000, 1, 2).beforeYears(0).year).toBe(2000);
    expect(ymdhis(2000, 1, 2).beforeYears(-10).year).toBe(2010);
  });
  it("afterMonths", () => {
    expect(ymdhis(2000, 1, 2).afterMonths(1).ym).toBe("2000-02");
    expect(ymdhis(2000, 1, 2).afterMonths(0).ym).toBe("2000-01");
    expect(ymdhis(2000, 1, 2).afterMonths(-1).ym).toBe("1999-12");
    expect(ymdhis(2000, 1, 2).afterMonths(6).ym).toBe("2000-07");
    expect(ymdhis(2000, 1, 2).afterMonths(12).ym).toBe("2001-01");
  });
  it("beforeMonths", () => {
    expect(ymdhis(2000, 1, 2).beforeMonths(1).ym).toBe("1999-12");
    expect(ymdhis(2000, 1, 2).beforeMonths(0).ym).toBe("2000-01");
    expect(ymdhis(2000, 1, 2).beforeMonths(-1).ym).toBe("2000-02");
    expect(ymdhis(2000, 1, 2).beforeMonths(6).ym).toBe("1999-07");
    expect(ymdhis(2000, 1, 2).beforeMonths(12).ym).toBe("1999-01");
  });
  it("afterWeeks", () => {
    expect(ymdhis(2022, 1, 2).afterWeeks(1).ymd).toBe("2022-01-09");
    expect(ymdhis(2022, 1, 2).afterWeeks(0).ymd).toBe("2022-01-02");
    expect(ymdhis(2022, 1, 2).afterWeeks(-1).ymd).toBe("2021-12-26");
  });
  it("beforeWeeks", () => {
    expect(ymdhis(2022, 1, 2).beforeWeeks(1).ymd).toBe("2021-12-26");
    expect(ymdhis(2022, 1, 2).beforeWeeks(0).ymd).toBe("2022-01-02");
    expect(ymdhis(2022, 1, 2).beforeWeeks(-1).ymd).toBe("2022-01-09");
  });
  it("afterDays", () => {
    expect(ymdhis(2022, 1, 2).afterDays(1).ymd).toBe("2022-01-03");
    expect(ymdhis(2022, 1, 2).afterDays(0).ymd).toBe("2022-01-02");
    expect(ymdhis(2022, 1, 2).afterDays(-1).ymd).toBe("2022-01-01");
    expect(ymdhis(2022, 1, 2).afterDays(-2).ymd).toBe("2021-12-31");
  });
  it("beforeDays", () => {
    expect(ymdhis(2022, 1, 2).beforeDays(1).ymd).toBe("2022-01-01");
    expect(ymdhis(2022, 1, 2).beforeDays(0).ymd).toBe("2022-01-02");
    expect(ymdhis(2022, 1, 2).beforeDays(-1).ymd).toBe("2022-01-03");
    expect(ymdhis(2022, 1, 2).beforeDays(2).ymd).toBe("2021-12-31");
  });
  it("afterHours", () => {
    expect(ymdhis(2022, 1, 2).afterHours(1).string).toBe("2022-01-02 01:00:00");
    expect(ymdhis(2022, 1, 2).afterHours(0).string).toBe("2022-01-02 00:00:00");
    expect(ymdhis(2022, 1, 2).afterHours(-1).string).toBe(
      "2022-01-01 23:00:00"
    );
  });
  it("beforeHours", () => {
    expect(ymdhis(2022, 1, 2).beforeHours(1).string).toBe(
      "2022-01-01 23:00:00"
    );
    expect(ymdhis(2022, 1, 2).beforeHours(0).string).toBe(
      "2022-01-02 00:00:00"
    );
    expect(ymdhis(2022, 1, 2).beforeHours(-1).string).toBe(
      "2022-01-02 01:00:00"
    );
  });
  it("afterMinutes", () => {
    expect(ymdhis(2022, 1, 2).afterMinutes(1).string).toBe(
      "2022-01-02 00:01:00"
    );
    expect(ymdhis(2022, 1, 2).afterMinutes(0).string).toBe(
      "2022-01-02 00:00:00"
    );
    expect(ymdhis(2022, 1, 2).afterMinutes(-1).string).toBe(
      "2022-01-01 23:59:00"
    );
  });
  it("beforeMinutes", () => {
    expect(ymdhis(2022, 1, 2).beforeMinutes(1).string).toBe(
      "2022-01-01 23:59:00"
    );
    expect(ymdhis(2022, 1, 2).beforeMinutes(0).string).toBe(
      "2022-01-02 00:00:00"
    );
    expect(ymdhis(2022, 1, 2).beforeMinutes(-1).string).toBe(
      "2022-01-02 00:01:00"
    );
  });
  it("afterSeconds", () => {
    expect(ymdhis(2022, 1, 2).afterSeconds(1).string).toBe(
      "2022-01-02 00:00:01"
    );
    expect(ymdhis(2022, 1, 2).afterSeconds(0).string).toBe(
      "2022-01-02 00:00:00"
    );
    expect(ymdhis(2022, 1, 2).afterSeconds(-1).string).toBe(
      "2022-01-01 23:59:59"
    );
  });
  it("beforeSeconds", () => {
    expect(ymdhis(2022, 1, 2).beforeSeconds(1).string).toBe(
      "2022-01-01 23:59:59"
    );
    expect(ymdhis(2022, 1, 2).beforeSeconds(0).string).toBe(
      "2022-01-02 00:00:00"
    );
    expect(ymdhis(2022, 1, 2).beforeSeconds(-1).string).toBe(
      "2022-01-02 00:00:01"
    );
  });
  it("afterMillisecond", () => {
    expect(ymdhis(2022, 1, 2, 0, 0, 0, 0).afterMilliseconds(0).iso8601).toBe(
      "2022-01-02T00:00:00.000+08:00"
    );
    expect(ymdhis(2022, 1, 2, 0, 0, 0, 0).afterMilliseconds(1).iso8601).toBe(
      "2022-01-02T00:00:00.001+08:00"
    );
    expect(ymdhis(2022, 1, 2, 0, 0, 0, 0).afterMilliseconds(999).iso8601).toBe(
      "2022-01-02T00:00:00.999+08:00"
    );
    expect(ymdhis(2022, 1, 2, 0, 0, 0, 0).afterMilliseconds(1000).iso8601).toBe(
      "2022-01-02T00:00:01.000+08:00"
    );
  });
  it("beforeMillisecond", () => {
    expect(ymdhis(2022, 1, 2, 0, 0, 10, 0).beforeMilliseconds(0).iso8601).toBe(
      "2022-01-02T00:00:10.000+08:00"
    );
    expect(ymdhis(2022, 1, 2, 0, 0, 10, 0).beforeMilliseconds(1).iso8601).toBe(
      "2022-01-02T00:00:09.999+08:00"
    );
    expect(
      ymdhis(2022, 1, 2, 0, 0, 10, 0).beforeMilliseconds(1000).iso8601
    ).toBe("2022-01-02T00:00:09.000+08:00");
  });
  it("lastOfMonth", () => {
    expect(ymdhis(2022, 1, 10, 12, 34, 56).lastOfMonth().string).toBe(
      "2022-01-31 12:34:56"
    );
    expect(ymdhis(2022, 2, 10, 12, 34, 56).lastOfMonth().string).toBe(
      "2022-02-28 12:34:56"
    );
    expect(ymdhis(2022, 2, 10, 12, 34, 56).firstOfMonth().string).toBe(
      "2022-02-01 12:34:56"
    );
  });
});

describe("Suffix and Notations", () => {
  it("setYearSuffix", () => {
    expect(ymdhis(2000, 1, 1).y).toBe("2000");
    expect(ymdhis(2000, 1, 1).setYearSuffix("Y").y).toBe("2000Y");
  });
  it("setMonthSuffix", () => {
    expect(ymdhis(2000, 1, 1).m).toBe("01");
    expect(ymdhis(2000, 1, 1).setMonthSuffix("M").m).toBe("01M");
  });
  it("setDaySuffix", () => {
    expect(ymdhis(2000, 1, 1).d).toBe("01");
    expect(ymdhis(2000, 1, 1).setDaySuffix("D").d).toBe("01D");
  });
  it("setHourSuffix", () => {
    expect(ymdhis(2000, 1, 1, 12, 34, 56).h).toBe("12");
    expect(ymdhis(2000, 1, 1, 12, 34, 56).setHourSuffix("H").h).toBe("12H");
  });
  it("setMinuteSuffix", () => {
    expect(ymdhis(2000, 1, 1, 12, 34, 56).i).toBe("34");
    expect(ymdhis(2000, 1, 1, 12, 34, 56).setMinuteSuffix("I").i).toBe("34I");
  });
  it("setSecondSuffix", () => {
    expect(ymdhis(2000, 1, 1, 12, 34, 56).s).toBe("56");
    expect(ymdhis(2000, 1, 1, 12, 34, 56).setSecondSuffix("S").s).toBe("56S");
  });
  it("setSuffixes", () => {
    expect(
      ymdhis(2000, 1, 2, 12, 34, 56)
        .clearSeparators()
        .setSuffixes("Y", "M", "D", "H", "I", "S").string
    ).toBe("2000Y01M02D12H34I56S");
  });
  it("setAmNotation", () => {
    expect(ymdhis(2000, 1, 1, 0, 0).a).toBe("AM");
    expect(ymdhis(2000, 1, 1, 0, 0).setAmNotation("a.m.").a).toBe("a.m.");
  });
  it("setPmNotation", () => {
    expect(ymdhis(2000, 1, 1, 12, 0).a).toBe("PM");
    expect(ymdhis(2000, 1, 1, 12, 0).setPmNotation("p.m.").a).toBe("p.m.");
  });
  it("setMonthNotations", () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    expect(ymdhis(2000, 1, 1).m).toBe("01");
    expect(ymdhis(2000, 1, 1).setMonthNotations(months).m).toBe("January");
    expect(ymdhis(2000, 2, 1).setMonthNotations(months).m).toBe("February");
    expect(ymdhis(2000, 3, 1).setMonthNotations(months).m).toBe("March");
    expect(ymdhis(2000, 4, 1).setMonthNotations(months).m).toBe("April");
    expect(ymdhis(2000, 5, 1).setMonthNotations(months).m).toBe("May");
    expect(ymdhis(2000, 6, 1).setMonthNotations(months).m).toBe("June");
    expect(ymdhis(2000, 7, 1).setMonthNotations(months).m).toBe("July");
    expect(ymdhis(2000, 8, 1).setMonthNotations(months).m).toBe("August");
    expect(ymdhis(2000, 9, 1).setMonthNotations(months).m).toBe("September");
    expect(ymdhis(2000, 10, 1).setMonthNotations(months).m).toBe("October");
    expect(ymdhis(2000, 11, 1).setMonthNotations(months).m).toBe("November");
    expect(ymdhis(2000, 12, 1).setMonthNotations(months).m).toBe("December");
    expect(ymdhis(2001, 1, 1).setMonthNotations(months).m).toBe("January");
    expect(ymdhis(2000, 1, 1).setMonthNotations([]).m).toBe("");
    expect(ymdhis(2000, 1, 1).setMonthNotations(["J"]).m).toBe("J");
    expect(ymdhis(2000, 2, 1).setMonthNotations(["J"]).m).toBe("");
  });

  it("setMonthNotations", () => {
    const arr = [
      "1st",
      "2nd",
      "3rd",
      "4th",
      "5th",
      "6th",
      "7th",
      "8th",
      "9th",
      "10th",
      "11th",
      "12th",
      "13th",
      "14th",
      "15th",
      "16th",
      "17th",
      "18th",
      "19th",
      "20th",
      "21st",
      "22nd",
      "23rd",
      "24th",
      "25th",
      "26th",
      "27th",
      "28th",
      "29th",
      "30th",
      "31st",
    ];
    expect(ymdhis(2000, 1, 1).d).toBe("01");
    expect(ymdhis(2000, 1, 1).setDayNotations(arr).d).toBe("1st");
    expect(ymdhis(2000, 1, 2).setDayNotations(arr).d).toBe("2nd");
    expect(ymdhis(2000, 1, 3).setDayNotations(arr).d).toBe("3rd");
    expect(ymdhis(2000, 1, 4).setDayNotations(arr).d).toBe("4th");
    expect(ymdhis(2000, 1, 5).setDayNotations(arr).d).toBe("5th");
    expect(ymdhis(2000, 1, 6).setDayNotations(arr).d).toBe("6th");
    expect(ymdhis(2000, 1, 7).setDayNotations(arr).d).toBe("7th");
    expect(ymdhis(2000, 1, 8).setDayNotations(arr).d).toBe("8th");
    expect(ymdhis(2000, 1, 9).setDayNotations(arr).d).toBe("9th");
    expect(ymdhis(2000, 1, 10).setDayNotations(arr).d).toBe("10th");
    expect(ymdhis(2000, 1, 11).setDayNotations(arr).d).toBe("11th");
    expect(ymdhis(2000, 1, 12).setDayNotations(arr).d).toBe("12th");
    expect(ymdhis(2000, 1, 13).setDayNotations(arr).d).toBe("13th");
    expect(ymdhis(2000, 1, 14).setDayNotations(arr).d).toBe("14th");
    expect(ymdhis(2000, 1, 15).setDayNotations(arr).d).toBe("15th");
    expect(ymdhis(2000, 1, 16).setDayNotations(arr).d).toBe("16th");
    expect(ymdhis(2000, 1, 17).setDayNotations(arr).d).toBe("17th");
    expect(ymdhis(2000, 1, 18).setDayNotations(arr).d).toBe("18th");
    expect(ymdhis(2000, 1, 19).setDayNotations(arr).d).toBe("19th");
    expect(ymdhis(2000, 1, 20).setDayNotations(arr).d).toBe("20th");
    expect(ymdhis(2000, 1, 21).setDayNotations(arr).d).toBe("21st");
    expect(ymdhis(2000, 1, 22).setDayNotations(arr).d).toBe("22nd");
    expect(ymdhis(2000, 1, 23).setDayNotations(arr).d).toBe("23rd");
    expect(ymdhis(2000, 1, 24).setDayNotations(arr).d).toBe("24th");
    expect(ymdhis(2000, 1, 25).setDayNotations(arr).d).toBe("25th");
    expect(ymdhis(2000, 1, 26).setDayNotations(arr).d).toBe("26th");
    expect(ymdhis(2000, 1, 27).setDayNotations(arr).d).toBe("27th");
    expect(ymdhis(2000, 1, 28).setDayNotations(arr).d).toBe("28th");
    expect(ymdhis(2000, 1, 29).setDayNotations(arr).d).toBe("29th");
    expect(ymdhis(2000, 1, 30).setDayNotations(arr).d).toBe("30th");
    expect(ymdhis(2000, 1, 31).setDayNotations(arr).d).toBe("31st");
    expect(ymdhis(2000, 1, 1).setDayNotations(arr).d).toBe("1st");
    expect(ymdhis(2000, 1, 1).setDayNotations([]).d).toBe("");
    expect(ymdhis(2000, 1, 1).setDayNotations(["a", "b"]).d).toBe("a");
    expect(ymdhis(2000, 1, 2).setDayNotations(["a", "b"]).d).toBe("b");
    expect(ymdhis(2000, 1, 3).setDayNotations(["a", "b"]).d).toBe("");
  });
});

describe("Paddings", () => {
  it("clearDatePaddings", () => {
    expect(ymdhis(2000, 1, 1).clearDatePaddings().y).toBe("2000");
    expect(ymdhis(2000, 1, 1).clearDatePaddings().m).toBe("1");
    expect(ymdhis(2000, 1, 1).clearDatePaddings().d).toBe("1");
    expect(ymdhis(2000, 12, 20).clearDatePaddings().m).toBe("12");
    expect(ymdhis(2000, 12, 20).clearDatePaddings().d).toBe("20");
  });
  it("clearPaddings", () => {
    expect(ymdhis(2001, 1, 2, 3, 4, 5).string).toBe("" + "2001-01-02 03:04:05");
    expect(
      ymdhis(2001, 2, 3, 4, 5, 6).setYearAsTwoDigits().clearPaddings().string
    ).toBe("" + "1-2-3 4:5:6");
  });
});

describe("Initializer functions", () => {
  it("local", () => {
    expect(ymdhis().local("2000-01-02 12:34:56").string).toBe(
      "2000-01-02 12:34:56"
    );
    expect(ymdhis().local("2000-01-02 12:34:56").local().string).toBe(
      "2000-01-02 12:34:56"
    );
    expect(ymdhis().local(2000, 1, 2, 12, 34, 56, 789).iso8601).toBe(
      "2000-01-02T12:34:56.789+08:00"
    );
    expect(ymdhis().local(2000, 1, 2, 12, 34, 56, 789).local().iso8601).toBe(
      "2000-01-02T12:34:56.789+08:00"
    );
    expect(ymdhis().local(2000, 1, 2, 12, 34, 56).string).toBe(
      "2000-01-02 12:34:56"
    );
    expect(ymdhis().local(new Date(2000, 0, 2, 12, 34, 56)).string).toBe(
      "2000-01-02 12:34:56"
    );
    expect(ymdhis().local(2000, 1, 2, 12, 34, 56).local().string).toBe(
      "2000-01-02 12:34:56"
    );
  });
  it("utc", () => {
    expect(ymdhis().utc("2000-01-02 12:34:56").string).toBe(
      "2000-01-02 12:34:56"
    );
    expect(ymdhis().utc("2000-01-02 12:34:56").utc().string).toBe(
      "2000-01-02 12:34:56"
    );
    expect(ymdhis().utc(2000, 1, 2, 12, 34, 56, 789).iso8601).toBe(
      "2000-01-02T12:34:56.789Z"
    );
    expect(ymdhis().utc(2000, 1, 2, 12, 34, 56, 789).utc().iso8601).toBe(
      "2000-01-02T12:34:56.789Z"
    );
    expect(ymdhis().utc(2000, 1, 2, 12, 34, 56).string).toBe(
      "2000-01-02 12:34:56"
    );
    expect(ymdhis().utc(new Date(2000, 0, 2, 12, 34, 56)).string).toBe(
      "2000-01-02 04:34:56"
    );
    expect(
      ymdhis().utc(new Date(2000, 0, 2, 12, 34, 56).getTime()).string
    ).toBe("2000-01-02 04:34:56");
    expect(ymdhis().utc(2000, 1, 2, 12, 34, 56).utc().string).toBe(
      "2000-01-02 12:34:56"
    );
    expect(ymdhis().utc(0).string).toBe("1970-01-01 00:00:00");
    expect(ymdhis().utc(0).utc().string).toBe("1970-01-01 00:00:00");
  });
  it("utc: to UTC datetime", () => {
    const dt = ymdhis(2000, 1, 1, 10, 0, 0);
    expect(dt.string).toBe("2000-01-01 10:00:00");
    expect(dt.utc().string).toBe("2000-01-01 02:00:00");
    expect(dt.utc().utc().string).toBe("2000-01-01 02:00:00");
  });
  it("utc: from UTC datetime", () => {
    const dt = ymdhis().utc(2000, 1, 1, 2, 0, 0);
    expect(dt.string).toBe("2000-01-01 02:00:00");
    expect(dt.utc().string).toBe("2000-01-01 02:00:00");
    expect(dt.local().string).toBe("2000-01-01 10:00:00");
    expect(dt.local().local().string).toBe("2000-01-01 10:00:00");
  });
  it("now", () => {
    const timestamp = new Date().getTime();
    expect(ymdhis().utc(0).now().timestamp).toBeGreaterThanOrEqual(timestamp);
  });
});

describe("Create Date functions", () => {
  it("iso9075 to Date", () => {
    expect(ymdhis("2000-01-02 12:34:56").string).toBe("2000-01-02 12:34:56");
    expect(ymdhis("2000-1-2 3:4:5").string).toBe("2000-01-02 03:04:05");
    expect(ymdhis("2000-01-02 12:34").string).toBe("2000-01-02 12:34:00");
    expect(ymdhis("2000-1-2 3:4").string).toBe("2000-01-02 03:04:00");
    expect(ymdhis("2000-01-02").string).toBe("2000-01-02 00:00:00");
    expect(ymdhis("2000-1-2").string).toBe("2000-01-02 00:00:00");
    expect(ymdhis("2000-01").string).toBe("2000-01-01 00:00:00");
    expect(ymdhis("2000-1").string).toBe("2000-01-01 00:00:00");
    expect(ymdhis("1-2-3").string).toBe("0001-02-03 00:00:00");
    expect(ymdhis("9999-12-31 23:59:59").string).toBe("9999-12-31 23:59:59");
    expect(ymdhis("2000-1-2 3:4:5.6").iso8601).toBe(
      "2000-01-02T03:04:05.006+08:00"
    );
    expect(ymdhis("2000-1-2 3:4:5.67").iso8601).toBe(
      "2000-01-02T03:04:05.067+08:00"
    );
    expect(ymdhis("2000-1-2 3:4:5.678").iso8601).toBe(
      "2000-01-02T03:04:05.678+08:00"
    );

    expect(() => ymdhis("2000-01-02-03 12:34:56")).toThrow();
    expect(() => ymdhis("2000-01-02 12:34:56:78")).toThrow();
    expect(() => ymdhis("1-2-3-4")).toThrow();
    expect(() => ymdhis("12:34:56")).toThrow();
    expect(() => ymdhis("2000-01-02 12")).toThrow();
    expect(() => ymdhis("-1-2-3")).toThrow();
    expect(() => ymdhis("2000")).toThrow();
    expect(() => ymdhis("2000-0x10-02")).toThrow();
    expect(() => ymdhis("")).toThrow();
    expect(() => ymdhis("2000-13-01")).toThrow();
    expect(() => ymdhis("2000-01-02-03 12:34:56.7890")).toThrow();
    expect(() => ymdhis("1 2 3")).toThrow();
    expect(() => ymdhis("1-2-3 4:5:6.7")).not.toThrow();
    expect(() => ymdhis("1-2-3 4:5:6.7.8")).toThrow();
    expect(() => ymdhis("1-2-3 4:5:6.123")).not.toThrow();
    expect(() => ymdhis("1-2-3 4:5:6.1234")).toThrow();
  });

  it("iso8601 to Date", () => {
    expect(ymdhis().utc("2000-01-02T03:04:05Z").string).toBe(
      "2000-01-02 03:04:05"
    );
    expect(ymdhis().utc("2000-01-02T03:04:05.678Z").string).toBe(
      "2000-01-02 03:04:05"
    );
    expect(ymdhis().utc("2000-01-02T03:04:05.678Z").iso8601).toBe(
      "2000-01-02T03:04:05.678Z"
    );
    expect(ymdhis().utc("2000-01-02t03:04:05z").string).toBe(
      "2000-01-02 03:04:05"
    );
    expect(ymdhis().utc("2000-01-02T03:04:05+02:00").string).toBe(
      "2000-01-02 01:04:05"
    );
    expect(ymdhis().utc("2000-01-02T03:04:05-02:00").string).toBe(
      "2000-01-02 05:04:05"
    );
    expect(() => {
      ymdhis("2000-01-02T03:04:05Z");
    }).toThrow();
    expect(() => {
      ymdhis().local("2000-01-02T03:04:05Z");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-01-02 03:04:05Z");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-01-02T03:04:05");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-01-02T03:04:05:06Z");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-01-02T03:04:05Z");
    }).not.toThrow();
    expect(() => {
      ymdhis().utc("2-01-02T03:04:05Z");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-1-02T03:04:05Z");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-01-2T03:04:05Z");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-01-02T3:04:05Z");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-01-02T03:4:05Z");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-01-02T03:04:5Z");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-01-02T03:04:05.678Z");
    }).not.toThrow();
    expect(() => {
      ymdhis().utc("2000-01-02T03:04:05.67Z");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-01-02T03:04:05.6Z");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-01-02T03:04:05.678");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-01-02T03:04:05.Z");
    }).toThrow();
    expect(() => {
      ymdhis().utc("2000-01-02T03:04:05.");
    }).toThrow();
  });

  it("numbers to Date", () => {
    expect(ymdhis(2000, 1, 2, 12, 34, 56).string).toBe("2000-01-02 12:34:56");
    expect(ymdhis(0, 1, 2, 12, 34, 56).string).toBe("0000-01-02 12:34:56");
    expect(ymdhis(10, 1, 2, 12, 34, 56).string).toBe("0010-01-02 12:34:56");
    expect(ymdhis(2000, 1, 2, 12).string).toBe("2000-01-02 12:00:00");
    expect(() => ymdhis(-1, 1, 2)).toThrow();
    expect(() => ymdhis(0, 1, 2)).not.toThrow();
    expect(() => ymdhis(9999, 1, 2)).not.toThrow();
    expect(() => ymdhis(10000, 1, 2)).toThrow();
    expect(() => ymdhis(2000, 0, 2)).toThrow();
    expect(() => ymdhis(2000, 1, 2)).not.toThrow();
    expect(() => ymdhis(2000, 12, 2)).not.toThrow();
    expect(() => ymdhis(2000, 13, 2)).toThrow();
    expect(() => ymdhis(2000, 1, 0)).toThrow();
    expect(() => ymdhis(2000, 1, 30)).not.toThrow();
    expect(() => ymdhis(2000, 1, 31)).not.toThrow();
    expect(() => ymdhis(2000, 1, 32)).toThrow();
    expect(() => ymdhis(2000, 1, 2, -1, 0, 0)).toThrow();
    expect(() => ymdhis(2000, 1, 2, 0, 0, 0)).not.toThrow();
    expect(() => ymdhis(2000, 1, 2, 23, 0, 0)).not.toThrow();
    expect(() => ymdhis(2000, 1, 2, 24, 0, 0)).toThrow();
    expect(() => ymdhis(2000, 1, 2, 0, -1, 0)).toThrow();
    expect(() => ymdhis(2000, 1, 2, 0, 59, 0)).not.toThrow();
    expect(() => ymdhis(2000, 1, 2, 0, 60, 0)).toThrow();
    expect(() => ymdhis(2000, 1, 2, 0, 0, -1)).toThrow();
    expect(() => ymdhis(2000, 1, 2, 0, 0, 59)).not.toThrow();
    expect(() => ymdhis(2000, 1, 2, 0, 0, 60)).toThrow();
    expect(() => ymdhis(2000, 1, 2, 0, 0, 0, 0)).not.toThrow();
    expect(() => ymdhis(2000, 1, 2, 0, 0, 0, -1)).toThrow();
    expect(() => ymdhis(2000, 1, 2, 0, 0, 0, 999)).not.toThrow();
    expect(() => ymdhis(2000, 1, 2, 0, 0, 0, 1000)).toThrow();
    expect(() => ymdhis().utc(260000000000000)).toThrow();
    expect(() => ymdhis().utc(250000000000000)).not.toThrow();
    expect(() => ymdhis().utc(-63000000000000)).toThrow();
    expect(() => ymdhis().utc(-62000000000000)).not.toThrow();
  });
});

describe("Documentation examples", () => {
  expect(ymdhis(2000, 1, 2, 3, 4, 5).year).toBe(2000);
  expect(ymdhis(2000, 1, 2, 3, 4, 5).month).toBe(1);
  expect(ymdhis(2000, 1, 2, 3, 4, 5).day).toBe(2);
  expect(ymdhis(2000, 1, 1, 3, 4, 5).dow).toBe(6);
  expect(ymdhis(2000, 1, 2, 3, 4, 5).hour).toBe(3);
  expect(ymdhis(2000, 1, 2, 3, 4, 5).minute).toBe(4);
  expect(ymdhis(2000, 1, 2, 3, 4, 5).second).toBe(5);
  expect(ymdhis(2000, 1, 2, 3, 4, 5, 6).ms).toBe(6);
  expect(ymdhis(2000, 1, 2, 20, 4, 5).ampmHour).toBe(8);
  expect(ymdhis(2000, 1, 2, 3, 4, 5).y).toBe("2000");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).m).toBe("01");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).d).toBe("02");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).h).toBe("03");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).i).toBe("04");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).s).toBe("05");
  expect(ymdhis(2000, 1, 1, 3, 4, 5).w).toBe("Saturday");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).a).toBe("AM");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).ym).toBe("2000-01");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).ymd).toBe("2000-01-02");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).ymdhi).toBe("2000-01-02 03:04");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).ymdhis).toBe("2000-01-02 03:04:05");
  expect(ymdhis(2000, 1, 1, 3, 4, 5).ymdw).toBe("2000-01-01 Saturday");
  expect(ymdhis(2000, 1, 1, 3, 4, 5).wymd).toBe("Saturday 2000-01-01");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).dmy).toBe("02-01-2000");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).dm).toBe("02-01");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).mdy).toBe("01-02-2000");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).md).toBe("01-02");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).hi).toBe("03:04");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).his).toBe("03:04:05");
  expect(ymdhis(2000, 1, 2, 20, 4, 5).hia).toBe("08:04 PM");
  expect(ymdhis(2000, 1, 2, 20, 4, 5).hisa).toBe("08:04:05 PM");
  expect(ymdhis(2000, 1, 2, 20, 4, 5).ahi).toBe("PM 08:04");
  expect(ymdhis(2000, 1, 2, 20, 4, 5).ahis).toBe("PM 08:04:05");
  expect(ymdhis(2018, 1, 2, 3, 4, 5).number).toBe(20180102030405);
  expect(ymdhis(2000, 1, 2, 3, 4, 5).string).toBe("2000-01-02 03:04:05");
  expect(ymdhis(2000, 1, 1, 0, 0, 0).timestamp).toBe(946684800000);
  expect(ymdhis(2000, 1, 2, 3, 4, 5).iso9075).toBe("2000-01-02 03:04:05");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).iso8601).toBe(
    "2000-01-02T03:04:05.000+08:00"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).afterYears(10).ymd).toBe("2010-01-02");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).afterMonths(2).ymd).toBe("2000-03-02");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).afterWeeks(1).ymd).toBe("2000-01-09");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).afterDays(3).ymd).toBe("2000-01-05");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).afterHours(10).string).toBe(
    "2000-01-02 13:04:05"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).afterMinutes(3).string).toBe(
    "2000-01-02 03:07:05"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).afterSeconds(5).string).toBe(
    "2000-01-02 03:04:10"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).afterMilliseconds(25).iso8601).toBe(
    "2000-01-02T03:04:05.025+08:00"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).beforeYears(10).ymd).toBe("1990-01-02");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).beforeMonths(2).ymd).toBe("1999-11-02");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).beforeWeeks(1).ymd).toBe("1999-12-26");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).beforeDays(3).ymd).toBe("1999-12-30");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).beforeHours(4).string).toBe(
    "2000-01-01 23:04:05"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).beforeMinutes(3).string).toBe(
    "2000-01-02 03:01:05"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).beforeSeconds(5).string).toBe(
    "2000-01-02 03:04:00"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).beforeMilliseconds(25).iso8601).toBe(
    "2000-01-02T03:04:04.975+08:00"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).lastOfMonth().ymd).toBe("2000-01-31");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).firstOfMonth().ymd).toBe("2000-01-01");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).setDateSeparator("/").ymd).toBe(
    "2000/01/02"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).setTimeSeparator(".").string).toBe(
    "2000-01-02 03.04.05"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).setDateTimeSeparator("_").string).toBe(
    "2000-01-02_03:04:05"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).setAmpmSeparator("_").ahi).toBe(
    "AM_03:04"
  );
  expect(ymdhis(2000, 1, 1, 3, 4, 5).setDowSeparator("_").wymd).toBe(
    "Saturday_2000-01-01"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).setSeparators("/", "_", ".").string).toBe(
    "2000/01/02_03.04.05"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).setYearSuffix("Y").y).toBe("2000Y");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).setMonthSuffix("M").m).toBe("01M");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).setDaySuffix("D").d).toBe("02D");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).setHourSuffix("H").h).toBe("03H");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).setMinuteSuffix("I").i).toBe("04I");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).setSecondSuffix("S").s).toBe("05S");
  expect(
    ymdhis(2000, 1, 2, 3, 4, 5).setSuffixes("Y", "M", "D", "H", "I", "S").string
  ).toBe("2000Y-01M-02D 03H:04I:05S");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).setAmNotation("a.m.").ahi).toBe(
    "a.m. 03:04"
  );
  expect(ymdhis(2000, 1, 2, 20, 4, 5).setPmNotation("p.m.").ahi).toBe(
    "p.m. 08:04"
  );
  expect(
    ymdhis(2000, 1, 2, 3, 4, 5).setDowNotations(["Sun.", "Mon.", "Tue."]).ymdw
  ).toBe("2000-01-02 Sun.");
  expect(
    ymdhis(2000, 1, 2, 3, 4, 5).setMonthNotations(["January", "February"]).ymd
  ).toBe("2000-January-02");
  expect(ymdhis(2000, 1, 2, 3, 4, 5).setDayNotations(["1st", "2nd"]).ymd).toBe(
    "2000-01-2nd"
  );
  expect(ymdhis(2018, 1, 2, 3, 4, 5).setYearAsTwoDigits().ymd).toBe("18-01-02");
  expect(
    ymdhis(2008, 1, 2, 3, 4, 5).clearPaddings().setYearAsTwoDigits().string
  ).toBe("8-1-2 3:4:5");
  expect(
    ymdhis(2008, 1, 2, 3, 4, 5).clearDatePaddings().setYearAsTwoDigits().string
  ).toBe("8-1-2 03:04:05");
  expect(
    ymdhis(2008, 1, 2, 3, 4, 5).clearYearPadding().setYearAsTwoDigits().ymd
  ).toBe("8-01-02");
  expect(ymdhis(2008, 1, 2, 3, 4, 5).clearMonthPadding().ymd).toBe("2008-1-02");
  expect(ymdhis(2008, 1, 2, 3, 4, 5).clearDayPadding().ymd).toBe("2008-01-2");
  expect(ymdhis(2008, 1, 2, 3, 4, 5).clearTimePaddings().string).toBe(
    "2008-01-02 3:4:5"
  );
  expect(ymdhis(2008, 1, 2, 3, 4, 5).clearHourPadding().his).toBe("3:04:05");
  expect(ymdhis(2008, 1, 2, 3, 4, 5).clearMinutePadding().his).toBe("03:4:05");
  expect(ymdhis(2008, 1, 2, 3, 4, 5).clearSecondPadding().his).toBe("03:04:5");
  expect(ymdhis(2018, 1, 2, 3, 4, 5).clearSeparators().string).toBe(
    "20180102030405"
  );
  expect(ymdhis(2000, 1, 2) > ymdhis(1999, 1, 2)).toBe(true);
  expect(ymdhis(2000, 1, 2, 10, 4, 5).utc().string).toBe("2000-01-02 02:04:05");
  expect(ymdhis().utc(2000, 1, 2, 3, 4, 5, 6).iso8601).toBe(
    "2000-01-02T03:04:05.006Z"
  );
  expect(ymdhis().utc(2000, 1, 2, 3, 4, 5).string).toBe("2000-01-02 03:04:05");
  expect(ymdhis().utc(2000, 1, 2, 3, 4).string).toBe("2000-01-02 03:04:00");
  expect(ymdhis().utc(2000, 1, 2, 3).string).toBe("2000-01-02 03:00:00");
  expect(ymdhis().utc(2000, 1, 2).string).toBe("2000-01-02 00:00:00");
  expect(ymdhis().utc(2000, 1).string).toBe("2000-01-01 00:00:00");
  expect(ymdhis().utc(0).string).toBe("1970-01-01 00:00:00");
  expect(ymdhis().utc("2000-01-02 12:34:56").string).toBe(
    "2000-01-02 12:34:56"
  );
  expect(ymdhis().utc(new Date(2000, 0, 2, 10, 4, 5)).string).toBe(
    "2000-01-02 02:04:05"
  );
  expect(ymdhis().utc(2000, 1, 2, 3, 4, 5).local().string).toBe(
    "2000-01-02 11:04:05"
  );
  expect(ymdhis().local(2000, 1, 2, 3, 4, 5, 6).iso8601).toBe(
    "2000-01-02T03:04:05.006+08:00"
  );
  expect(ymdhis().local(2000, 1, 2, 3, 4, 5).string).toBe(
    "2000-01-02 03:04:05"
  );
  expect(ymdhis().local(2000, 1, 2, 3, 4).string).toBe("2000-01-02 03:04:00");
  expect(ymdhis().local(2000, 1, 2, 3).string).toBe("2000-01-02 03:00:00");
  expect(ymdhis().local(2000, 1, 2).string).toBe("2000-01-02 00:00:00");
  expect(ymdhis().local(2000, 1).string).toBe("2000-01-01 00:00:00");
  expect(ymdhis().local("2000-01-02 03:04:05").string).toBe(
    "2000-01-02 03:04:05"
  );
  expect(ymdhis().local(new Date(2000, 0, 2, 3, 4, 5)).string).toBe(
    "2000-01-02 03:04:05"
  );
  expect(ymdhis(1999, 9, 9).now() > ymdhis(2000, 1, 2)).toBe(true);
  expect(`${ymdhis(2000, 1, 2, 12, 34, 56)}`).toBe("2000-01-02 12:34:56");
  expect(ymdhis("2000-01-02 03:04:05").string).toBe("2000-01-02 03:04:05");
  expect(ymdhis("2000-01-02 03:04").string).toBe("2000-01-02 03:04:00");
  expect(ymdhis("2000-01-02").string).toBe("2000-01-02 00:00:00");
  expect(ymdhis("2000-01").string).toBe("2000-01-01 00:00:00");
  expect(ymdhis("999-1-2 3:4:5").string).toBe("0999-01-02 03:04:05");
  expect(ymdhis().utc("2000-01-02 03:04:05").string).toBe(
    "2000-01-02 03:04:05"
  );
  expect(ymdhis().utc("2000-01-02 03:04").string).toBe("2000-01-02 03:04:00");
  expect(ymdhis().utc("2000-01-02").string).toBe("2000-01-02 00:00:00");
  expect(ymdhis().utc("2000-01").string).toBe("2000-01-01 00:00:00");
  expect(ymdhis().utc("999-1-2 3:4:5").string).toBe("0999-01-02 03:04:05");
  expect(ymdhis().utc("2000-01-02T03:04:05Z").string).toBe(
    "2000-01-02 03:04:05"
  );
  expect(ymdhis().utc("2000-01-02T03:04:05+02:00").string).toBe(
    "2000-01-02 01:04:05"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5, 6).iso8601).toBe(
    "2000-01-02T03:04:05.006+08:00"
  );
  expect(ymdhis(2000, 1, 2, 3, 4, 5).string).toBe("2000-01-02 03:04:05");
  expect(ymdhis(2000, 1, 2, 3, 4).string).toBe("2000-01-02 03:04:00");
  expect(ymdhis(2000, 1, 2, 3).string).toBe("2000-01-02 03:00:00");
  expect(ymdhis(2000, 1, 2).string).toBe("2000-01-02 00:00:00");
  expect(ymdhis(2000, 1).string).toBe("2000-01-01 00:00:00");
  expect(ymdhis("2000-01-02 03:04:05").string).toBe("2000-01-02 03:04:05");
  expect(ymdhis(new Date(2000, 0, 2, 3, 4, 5)).string).toBe(
    "2000-01-02 03:04:05"
  );
  expect(ymdhis(2001, 8, 24).string).toBe("2001-08-24 00:00:00");
  expect(ymdhis(2001, 8, 24).ymd).toBe("2001-08-24");
  expect(ymdhis(2001, 8, 24).setDateSeparator(".").dmy).toBe("24.08.2001");
  expect(ymdhis(2001, 8, 24).setDateSeparator("/").dmy).toBe("24/08/2001");
  expect(
    ymdhis(2001, 8, 24).setYearAsTwoDigits().setDateSeparator("/").dmy
  ).toBe("24/08/01");
  expect(ymdhis(2001, 8, 24).setYearAsTwoDigits().dmy).toBe("24-08-01");
  expect(ymdhis(2001, 8, 24).setYearAsTwoDigits().mdy).toBe("08-24-01");
  const date = ymdhis().setYearAsTwoDigits();
  expect(date.local(2001, 6, 14).dmy).toBe("14-06-01");
  expect(date.local(2001, 6, 15).dmy).toBe("15-06-01");
});
