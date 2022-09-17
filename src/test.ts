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
    expect(ymdhis(new Date(2000, 0, 1, 0, 0, 0)).ampm).toBe(12);
    expect(ymdhis(new Date(2000, 0, 1, 1, 0, 0)).ampm).toBe(1);
    expect(ymdhis(new Date(2000, 0, 1, 11, 0, 0)).ampm).toBe(11);
    expect(ymdhis(new Date(2000, 0, 1, 12, 0, 0)).ampm).toBe(12);
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
    expect(ymdhis(new Date(2000, 0, 1, 1, 0, 0)).disableHourPadding().h).toBe(
      "1"
    );
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
    expect(
      ymdhis(new Date(2000, 0, 1, 1, 20, 0)).disableMinutePadding().i
    ).toBe("20");
  });
  it("s: enable padding", () => {
    expect(ymdhis(new Date(2000, 0, 1, 1, 1, 1)).s).toBe("01");
    expect(ymdhis(new Date(2000, 0, 1, 1, 1, 20)).s).toBe("20");
  });
  it("s: disable padding", () => {
    expect(ymdhis(new Date(2000, 0, 1, 1, 1, 1)).disableSecondPadding().s).toBe(
      "1"
    );
    expect(
      ymdhis(new Date(2000, 0, 1, 1, 1, 20)).disableSecondPadding().s
    ).toBe("20");
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
    expect(ymdhis(new Date(2000, 0, 1, 11, 0)).a).toBe("AM");
    expect(ymdhis(new Date(2000, 0, 1, 12, 0)).a).toBe("PM");
    expect(ymdhis(new Date(2000, 0, 1, 23, 0)).a).toBe("PM");
  });
});

describe("Suffix and Notations", () => {
  it("setYearSuffix", () => {
    expect(ymdhis(new Date(2000, 0, 1)).y).toBe("2000");
    expect(ymdhis(new Date(2000, 0, 1)).setYearSuffix("Y").y).toBe("2000Y");
  });
  it("setMonthSuffix", () => {
    expect(ymdhis(new Date(2000, 0, 1)).m).toBe("01");
    expect(ymdhis(new Date(2000, 0, 1)).setMonthSuffix("M").m).toBe("01M");
  });
  it("setDaySuffix", () => {
    expect(ymdhis(new Date(2000, 0, 1)).d).toBe("01");
    expect(ymdhis(new Date(2000, 0, 1)).setDaySuffix("D").d).toBe("01D");
  });
  it("setHourSuffix", () => {
    expect(ymdhis(new Date(2000, 0, 1, 12, 34, 56)).h).toBe("12");
    expect(ymdhis(new Date(2000, 0, 1, 12, 34, 56)).setHourSuffix("H").h).toBe(
      "12H"
    );
  });
  it("setMinuteSuffix", () => {
    expect(ymdhis(new Date(2000, 0, 1, 12, 34, 56)).i).toBe("34");
    expect(
      ymdhis(new Date(2000, 0, 1, 12, 34, 56)).setMinuteSuffix("I").i
    ).toBe("34I");
  });
  it("setSecondSuffix", () => {
    expect(ymdhis(new Date(2000, 0, 1, 12, 34, 56)).s).toBe("56");
    expect(
      ymdhis(new Date(2000, 0, 1, 12, 34, 56)).setSecondSuffix("S").s
    ).toBe("56S");
  });
  it("setAmNotation", () => {
    expect(ymdhis(new Date(2000, 0, 1, 0, 0)).a).toBe("AM");
    expect(ymdhis(new Date(2000, 0, 1, 0, 0)).setAmNotation("a.m.").a).toBe(
      "a.m."
    );
  });
  it("setPmNotation", () => {
    expect(ymdhis(new Date(2000, 0, 1, 12, 0)).a).toBe("PM");
    expect(ymdhis(new Date(2000, 0, 1, 12, 0)).setPmNotation("p.m.").a).toBe(
      "p.m."
    );
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
    expect(ymdhis(new Date(2000, 0, 1)).m).toBe("01");
    expect(ymdhis(new Date(2000, 0, 1)).setMonthNotations(months).m).toBe(
      "January"
    );
    expect(ymdhis(new Date(2000, 1, 1)).setMonthNotations(months).m).toBe(
      "February"
    );
    expect(ymdhis(new Date(2000, 2, 1)).setMonthNotations(months).m).toBe(
      "March"
    );
    expect(ymdhis(new Date(2000, 3, 1)).setMonthNotations(months).m).toBe(
      "April"
    );
    expect(ymdhis(new Date(2000, 4, 1)).setMonthNotations(months).m).toBe(
      "May"
    );
    expect(ymdhis(new Date(2000, 5, 1)).setMonthNotations(months).m).toBe(
      "June"
    );
    expect(ymdhis(new Date(2000, 6, 1)).setMonthNotations(months).m).toBe(
      "July"
    );
    expect(ymdhis(new Date(2000, 7, 1)).setMonthNotations(months).m).toBe(
      "August"
    );
    expect(ymdhis(new Date(2000, 8, 1)).setMonthNotations(months).m).toBe(
      "September"
    );
    expect(ymdhis(new Date(2000, 9, 1)).setMonthNotations(months).m).toBe(
      "October"
    );
    expect(ymdhis(new Date(2000, 10, 1)).setMonthNotations(months).m).toBe(
      "November"
    );
    expect(ymdhis(new Date(2000, 11, 1)).setMonthNotations(months).m).toBe(
      "December"
    );
    expect(ymdhis(new Date(2000, 12, 1)).setMonthNotations(months).m).toBe(
      "January"
    );
    expect(ymdhis(new Date(2000, 0, 1)).setMonthNotations([]).m).toBe("");
    expect(ymdhis(new Date(2000, 0, 1)).setMonthNotations(["J"]).m).toBe("J");
    expect(ymdhis(new Date(2000, 1, 1)).setMonthNotations(["J"]).m).toBe("");
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
    expect(ymdhis(new Date(2000, 0, 1)).d).toBe("01");
    expect(ymdhis(new Date(2000, 0, 1)).setDateNotations(arr).d).toBe("1st");
    expect(ymdhis(new Date(2000, 0, 2)).setDateNotations(arr).d).toBe("2nd");
    expect(ymdhis(new Date(2000, 0, 3)).setDateNotations(arr).d).toBe("3rd");
    expect(ymdhis(new Date(2000, 0, 4)).setDateNotations(arr).d).toBe("4th");
    expect(ymdhis(new Date(2000, 0, 5)).setDateNotations(arr).d).toBe("5th");
    expect(ymdhis(new Date(2000, 0, 6)).setDateNotations(arr).d).toBe("6th");
    expect(ymdhis(new Date(2000, 0, 7)).setDateNotations(arr).d).toBe("7th");
    expect(ymdhis(new Date(2000, 0, 8)).setDateNotations(arr).d).toBe("8th");
    expect(ymdhis(new Date(2000, 0, 9)).setDateNotations(arr).d).toBe("9th");
    expect(ymdhis(new Date(2000, 0, 10)).setDateNotations(arr).d).toBe("10th");
    expect(ymdhis(new Date(2000, 0, 11)).setDateNotations(arr).d).toBe("11th");
    expect(ymdhis(new Date(2000, 0, 12)).setDateNotations(arr).d).toBe("12th");
    expect(ymdhis(new Date(2000, 0, 13)).setDateNotations(arr).d).toBe("13th");
    expect(ymdhis(new Date(2000, 0, 14)).setDateNotations(arr).d).toBe("14th");
    expect(ymdhis(new Date(2000, 0, 15)).setDateNotations(arr).d).toBe("15th");
    expect(ymdhis(new Date(2000, 0, 16)).setDateNotations(arr).d).toBe("16th");
    expect(ymdhis(new Date(2000, 0, 17)).setDateNotations(arr).d).toBe("17th");
    expect(ymdhis(new Date(2000, 0, 18)).setDateNotations(arr).d).toBe("18th");
    expect(ymdhis(new Date(2000, 0, 19)).setDateNotations(arr).d).toBe("19th");
    expect(ymdhis(new Date(2000, 0, 20)).setDateNotations(arr).d).toBe("20th");
    expect(ymdhis(new Date(2000, 0, 21)).setDateNotations(arr).d).toBe("21st");
    expect(ymdhis(new Date(2000, 0, 22)).setDateNotations(arr).d).toBe("22nd");
    expect(ymdhis(new Date(2000, 0, 23)).setDateNotations(arr).d).toBe("23rd");
    expect(ymdhis(new Date(2000, 0, 24)).setDateNotations(arr).d).toBe("24th");
    expect(ymdhis(new Date(2000, 0, 25)).setDateNotations(arr).d).toBe("25th");
    expect(ymdhis(new Date(2000, 0, 26)).setDateNotations(arr).d).toBe("26th");
    expect(ymdhis(new Date(2000, 0, 27)).setDateNotations(arr).d).toBe("27th");
    expect(ymdhis(new Date(2000, 0, 28)).setDateNotations(arr).d).toBe("28th");
    expect(ymdhis(new Date(2000, 0, 29)).setDateNotations(arr).d).toBe("29th");
    expect(ymdhis(new Date(2000, 0, 30)).setDateNotations(arr).d).toBe("30th");
    expect(ymdhis(new Date(2000, 0, 31)).setDateNotations(arr).d).toBe("31st");
    expect(ymdhis(new Date(2000, 1, 1)).setDateNotations(arr).d).toBe("1st");
    expect(ymdhis(new Date(2000, 0, 1)).setDateNotations([]).d).toBe("");
    expect(ymdhis(new Date(2000, 0, 1)).setDateNotations(["a", "b"]).d).toBe(
      "a"
    );
    expect(ymdhis(new Date(2000, 0, 2)).setDateNotations(["a", "b"]).d).toBe(
      "b"
    );
    expect(ymdhis(new Date(2000, 0, 3)).setDateNotations(["a", "b"]).d).toBe(
      ""
    );
  });
});

describe("Combined format date properties", () => {
  it("ym", () => {
    expect(ymdhis(new Date(2000, 0, 2)).ym).toBe("2000-01");
    expect(ymdhis(new Date(2000, 0, 2)).setDateSeparator("/").ym).toBe(
      "2000/01"
    );
  });
  it("ymd", () => {
    expect(ymdhis(new Date(2000, 0, 2)).ymd).toBe("2000-01-02");
    expect(ymdhis(new Date(2000, 0, 2)).setDateSeparator("/").ymd).toBe(
      "2000/01/02"
    );
  });
  it("ymdhi", () => {
    expect(ymdhis(new Date(2000, 0, 2, 12, 34)).ymdhi).toBe("2000-01-02 12:34");
    expect(
      ymdhis(new Date(2000, 0, 2, 12, 34))
        .setDateSeparator("/")
        .setDateTimeSeparator("-")
        .setTimeSeparator(".").ymdhi
    ).toBe("2000/01/02-12.34");
  });
  it("ymdw", () => {
    // 2000-01-02 (Sunday)
    expect(ymdhis(new Date(2000, 0, 2)).ymdw).toBe("2000-01-02 Sunday");
    expect(
      ymdhis(new Date(2000, 0, 2)).setDateSeparator("/").setDowSeparator("_")
        .ymdw
    ).toBe("2000/01/02_Sunday");
  });
  it("wymd", () => {
    // 2000-01-02 (Sunday)
    expect(ymdhis(new Date(2000, 0, 2)).wymd).toBe("Sunday 2000-01-02");
    expect(
      ymdhis(new Date(2000, 0, 2)).setDateSeparator("/").setDowSeparator("_")
        .wymd
    ).toBe("Sunday_2000/01/02");
  });
  it("dmy", () => {
    expect(ymdhis(new Date(2000, 0, 2)).dmy).toBe("02-01-2000");
    expect(ymdhis(new Date(2000, 0, 2)).setDateSeparator("/").dmy).toBe(
      "02/01/2000"
    );
  });
  it("dm", () => {
    expect(ymdhis(new Date(2000, 0, 2)).dm).toBe("02-01");
    expect(ymdhis(new Date(2000, 0, 2)).setDateSeparator("/").dm).toBe("02/01");
  });
  it("mdy", () => {
    expect(ymdhis(new Date(2000, 0, 2)).mdy).toBe("01-02-2000");
    expect(ymdhis(new Date(2000, 0, 2)).setDateSeparator("/").mdy).toBe(
      "01/02/2000"
    );
  });
  it("md", () => {
    expect(ymdhis(new Date(2000, 0, 2)).md).toBe("01-02");
    expect(ymdhis(new Date(2000, 0, 2)).setDateSeparator("/").md).toBe("01/02");
  });
  it("hi", () => {
    expect(ymdhis(new Date(2000, 0, 2, 12, 34)).hi).toBe("12:34");
    expect(ymdhis(new Date(2000, 0, 2, 12, 34)).setTimeSeparator(".").hi).toBe(
      "12.34"
    );
  });
  it("his", () => {
    expect(ymdhis(new Date(2000, 0, 2, 12, 34, 56)).his).toBe("12:34:56");
    expect(
      ymdhis(new Date(2000, 0, 2, 12, 34, 56)).setTimeSeparator(".").his
    ).toBe("12.34.56");
  });
  it("hia", () => {
    expect(ymdhis(new Date(2000, 0, 2, 0, 0)).hia).toBe("12:00 AM");
    expect(ymdhis(new Date(2000, 0, 2, 11, 59)).hia).toBe("11:59 AM");
    expect(ymdhis(new Date(2000, 0, 2, 12, 0)).hia).toBe("12:00 PM");
    expect(ymdhis(new Date(2000, 0, 2, 23, 59)).hia).toBe("11:59 PM");
    expect(
      ymdhis(new Date(2000, 0, 2, 12, 34))
        .setTimeSeparator(".")
        .setAmpmSeparator("_").hia
    ).toBe("12.34_PM");
  });
  it("hisa", () => {
    expect(ymdhis(new Date(2000, 0, 2, 0, 0)).hisa).toBe("12:00:00 AM");
    expect(ymdhis(new Date(2000, 0, 2, 11, 59)).hisa).toBe("11:59:00 AM");
    expect(ymdhis(new Date(2000, 0, 2, 12, 0)).hisa).toBe("12:00:00 PM");
    expect(ymdhis(new Date(2000, 0, 2, 23, 59)).hisa).toBe("11:59:00 PM");
    expect(
      ymdhis(new Date(2000, 0, 2, 12, 34, 56))
        .setTimeSeparator(".")
        .setAmpmSeparator("_").hisa
    ).toBe("12.34.56_PM");
  });
  it("ahi", () => {
    expect(ymdhis(new Date(2000, 0, 2, 0, 0)).ahi).toBe("AM 12:00");
    expect(ymdhis(new Date(2000, 0, 2, 11, 59)).ahi).toBe("AM 11:59");
    expect(ymdhis(new Date(2000, 0, 2, 12, 0)).ahi).toBe("PM 12:00");
    expect(ymdhis(new Date(2000, 0, 2, 23, 59)).ahi).toBe("PM 11:59");
    expect(
      ymdhis(new Date(2000, 0, 2, 12, 34))
        .setTimeSeparator(".")
        .setAmpmSeparator("_").ahi
    ).toBe("PM_12.34");
  });
  it("ahis", () => {
    expect(ymdhis(new Date(2000, 0, 2, 0, 0)).ahis).toBe("AM 12:00:00");
    expect(ymdhis(new Date(2000, 0, 2, 11, 59)).ahis).toBe("AM 11:59:00");
    expect(ymdhis(new Date(2000, 0, 2, 12, 0)).ahis).toBe("PM 12:00:00");
    expect(ymdhis(new Date(2000, 0, 2, 23, 59)).ahis).toBe("PM 11:59:00");
    expect(
      ymdhis(new Date(2000, 0, 2, 12, 34, 56))
        .setTimeSeparator(".")
        .setAmpmSeparator("_").ahis
    ).toBe("PM_12.34.56");
  });
});

describe("Calculate date functions", () => {
  it("afterYears", () => {
    expect(ymdhis(new Date(2000, 0, 2)).afterYears(10).year).toBe(2010);
    expect(ymdhis(new Date(2000, 0, 2)).afterYears(0).year).toBe(2000);
    expect(ymdhis(new Date(2000, 0, 2)).afterYears(-10).year).toBe(1990);
  });
  it("beforeYears", () => {
    expect(ymdhis(new Date(2000, 0, 2)).beforeYears(10).year).toBe(1990);
    expect(ymdhis(new Date(2000, 0, 2)).beforeYears(0).year).toBe(2000);
    expect(ymdhis(new Date(2000, 0, 2)).beforeYears(-10).year).toBe(2010);
  });
  it("afterMonths", () => {
    expect(ymdhis(new Date(2000, 0, 2)).afterMonths(1).ym).toBe("2000-02");
    expect(ymdhis(new Date(2000, 0, 2)).afterMonths(0).ym).toBe("2000-01");
    expect(ymdhis(new Date(2000, 0, 2)).afterMonths(-1).ym).toBe("1999-12");
    expect(ymdhis(new Date(2000, 0, 2)).afterMonths(6).ym).toBe("2000-07");
    expect(ymdhis(new Date(2000, 0, 2)).afterMonths(12).ym).toBe("2001-01");
  });
  it("beforeMonths", () => {
    expect(ymdhis(new Date(2000, 0, 2)).beforeMonths(1).ym).toBe("1999-12");
    expect(ymdhis(new Date(2000, 0, 2)).beforeMonths(0).ym).toBe("2000-01");
    expect(ymdhis(new Date(2000, 0, 2)).beforeMonths(-1).ym).toBe("2000-02");
    expect(ymdhis(new Date(2000, 0, 2)).beforeMonths(6).ym).toBe("1999-07");
    expect(ymdhis(new Date(2000, 0, 2)).beforeMonths(12).ym).toBe("1999-01");
  });
  it("afterWeeks", () => {
    expect(ymdhis(new Date(2022, 0, 2)).afterWeeks(1).ymd).toBe("2022-01-09");
    expect(ymdhis(new Date(2022, 0, 2)).afterWeeks(0).ymd).toBe("2022-01-02");
    expect(ymdhis(new Date(2022, 0, 2)).afterWeeks(-1).ymd).toBe("2021-12-26");
  });
  it("beforeWeeks", () => {
    expect(ymdhis(new Date(2022, 0, 2)).beforeWeeks(1).ymd).toBe("2021-12-26");
    expect(ymdhis(new Date(2022, 0, 2)).beforeWeeks(0).ymd).toBe("2022-01-02");
    expect(ymdhis(new Date(2022, 0, 2)).beforeWeeks(-1).ymd).toBe("2022-01-09");
  });
  it("afterDays", () => {
    expect(ymdhis(new Date(2022, 0, 2)).afterDays(1).ymd).toBe("2022-01-03");
    expect(ymdhis(new Date(2022, 0, 2)).afterDays(0).ymd).toBe("2022-01-02");
    expect(ymdhis(new Date(2022, 0, 2)).afterDays(-1).ymd).toBe("2022-01-01");
    expect(ymdhis(new Date(2022, 0, 2)).afterDays(-2).ymd).toBe("2021-12-31");
  });
  it("beforeDays", () => {
    expect(ymdhis(new Date(2022, 0, 2)).beforeDays(1).ymd).toBe("2022-01-01");
    expect(ymdhis(new Date(2022, 0, 2)).beforeDays(0).ymd).toBe("2022-01-02");
    expect(ymdhis(new Date(2022, 0, 2)).beforeDays(-1).ymd).toBe("2022-01-03");
    expect(ymdhis(new Date(2022, 0, 2)).beforeDays(2).ymd).toBe("2021-12-31");
  });
  it("afterHours", () => {
    expect(ymdhis(new Date(2022, 0, 2)).afterHours(1).toString()).toBe(
      "2022-01-02 01:00:00"
    );
    expect(ymdhis(new Date(2022, 0, 2)).afterHours(0).toString()).toBe(
      "2022-01-02 00:00:00"
    );
    expect(ymdhis(new Date(2022, 0, 2)).afterHours(-1).toString()).toBe(
      "2022-01-01 23:00:00"
    );
  });
  it("beforeHours", () => {
    expect(ymdhis(new Date(2022, 0, 2)).beforeHours(1).toString()).toBe(
      "2022-01-01 23:00:00"
    );
    expect(ymdhis(new Date(2022, 0, 2)).beforeHours(0).toString()).toBe(
      "2022-01-02 00:00:00"
    );
    expect(ymdhis(new Date(2022, 0, 2)).beforeHours(-1).toString()).toBe(
      "2022-01-02 01:00:00"
    );
  });
  it("afterMinutes", () => {
    expect(ymdhis(new Date(2022, 0, 2)).afterMinutes(1).toString()).toBe(
      "2022-01-02 00:01:00"
    );
    expect(ymdhis(new Date(2022, 0, 2)).afterMinutes(0).toString()).toBe(
      "2022-01-02 00:00:00"
    );
    expect(ymdhis(new Date(2022, 0, 2)).afterMinutes(-1).toString()).toBe(
      "2022-01-01 23:59:00"
    );
  });
  it("beforeMinutes", () => {
    expect(ymdhis(new Date(2022, 0, 2)).beforeMinutes(1).toString()).toBe(
      "2022-01-01 23:59:00"
    );
    expect(ymdhis(new Date(2022, 0, 2)).beforeMinutes(0).toString()).toBe(
      "2022-01-02 00:00:00"
    );
    expect(ymdhis(new Date(2022, 0, 2)).beforeMinutes(-1).toString()).toBe(
      "2022-01-02 00:01:00"
    );
  });
  it("afterSeconds", () => {
    expect(ymdhis(new Date(2022, 0, 2)).afterSeconds(1).toString()).toBe(
      "2022-01-02 00:00:01"
    );
    expect(ymdhis(new Date(2022, 0, 2)).afterSeconds(0).toString()).toBe(
      "2022-01-02 00:00:00"
    );
    expect(ymdhis(new Date(2022, 0, 2)).afterSeconds(-1).toString()).toBe(
      "2022-01-01 23:59:59"
    );
  });
  it("beforeSeconds", () => {
    expect(ymdhis(new Date(2022, 0, 2)).beforeSeconds(1).toString()).toBe(
      "2022-01-01 23:59:59"
    );
    expect(ymdhis(new Date(2022, 0, 2)).beforeSeconds(0).toString()).toBe(
      "2022-01-02 00:00:00"
    );
    expect(ymdhis(new Date(2022, 0, 2)).beforeSeconds(-1).toString()).toBe(
      "2022-01-02 00:00:01"
    );
  });
});

describe("ISO date format functions", () => {
  it("iso9075", () => {
    expect(ymdhis(new Date(2022, 0, 2, 12, 34, 56)).iso9075).toBe(
      "2022-01-02 12:34:56"
    );
    expect(
      ymdhis(new Date(2022, 0, 2, 12, 34, 56))
        .setDateSeparator("/")
        .setDateTimeSeparator("_")
        .setTimeSeparator(":")
        .setMonthNotations([])
        .setDateNotations([])
        .setYearSuffix("Y")
        .setMonthSuffix("M")
        .setDaySuffix("D")
        .setHourSuffix("H")
        .setMinuteSuffix("I")
        .setSecondSuffix("S")
        .disableDatePadding()
        .disableTimePadding().iso9075
    ).toBe("2022-01-02 12:34:56");
  });
});
