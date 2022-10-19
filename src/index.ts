interface Params {
  date: Date;
  options?: Options;
}

interface Options {
  // Separators
  dateSeparator: string;
  dateTimeSeparator: string;
  timeSeparator: string;
  ampmSeparator: string;
  dowSeparator: string;

  // Suffixes
  yearSuffix: string;
  monthSuffix: string;
  daySuffix: string;
  hourSuffix: string;
  minuteSuffix: string;
  secondSuffix: string;

  // Notations
  amNotation: string;
  pmNotation: string;
  monthNotations: string[] | null;
  dayNotations: string[] | null;
  dowNotations: string[];

  // Digits
  isYearAsFourDigits: boolean;
  isEnablePaddingYear: boolean;
  isMonthAsTwoDigits: boolean;
  isDayAsTwoDigits: boolean;
  isHourAsTwoDigits: boolean;
  isMinuteAsTwoDigits: boolean;
  isSecondAsTwoDigits: boolean;

  // Timezone
  isUtc: boolean;
}

interface DateInputValues {
  year: number;
  month: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
}

class Ymdhis {
  readonly date: Date;

  private readonly options: Options = {
    // Separators
    dateSeparator: "-",
    dateTimeSeparator: " ",
    timeSeparator: ":",
    ampmSeparator: " ",
    dowSeparator: " ",

    // Suffixes
    yearSuffix: "",
    monthSuffix: "",
    daySuffix: "",
    hourSuffix: "",
    minuteSuffix: "",
    secondSuffix: "",

    // Notations
    amNotation: "AM",
    pmNotation: "PM",
    monthNotations: null,
    dayNotations: null,
    dowNotations: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],

    // Digits
    isYearAsFourDigits: true,
    isEnablePaddingYear: true,
    isMonthAsTwoDigits: true,
    isDayAsTwoDigits: true,
    isHourAsTwoDigits: true,
    isMinuteAsTwoDigits: true,
    isSecondAsTwoDigits: true,

    // Timezone
    isUtc: false,
  };

  constructor(params: Params) {
    this.date = CreateDate.create(params.date);
    if (typeof params.options !== "undefined") {
      this.options = Object.assign({}, params.options);
    }
  }

  /**
   * @name year
   * @description Get the year as a number.
   * @example
   * ymdhis(2000, 1, 2).year
   * // 2000
   */
  get year(): number {
    return this.date.getFullYear();
  }

  /**
   * @name month
   * @description Get the month as a number.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).month
   * // 1
   */
  get month(): number {
    return this.date.getMonth() + 1;
  }

  /**
   * @name day
   * @description Get the day as a number.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).day
   * // 2
   */
  get day(): number {
    return this.date.getDate();
  }

  /**
   * @name dow
   * @description Get the day of the week as a number. (Sunday: 0, Monday: 1)
   * @example
   * ymdhis(2000, 1, 1, 3, 4, 5).dow
   * // 6
   */
  get dow(): number {
    return this.date.getDay();
  }

  /**
   * @name hour
   * @description Get the hour as a number.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).hour
   * // 3
   */
  get hour(): number {
    return this.date.getHours();
  }

  /**
   * @name minute
   * @description Get the minute as a number.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).minute
   * // 4
   */
  get minute(): number {
    return this.date.getMinutes();
  }

  /**
   * @name second
   * @description Get the second as a number.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).second
   * // 5
   */
  get second(): number {
    return this.date.getSeconds();
  }

  /**
   * @name ms
   * @description Get the millisecond as a number.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5, 6).ms
   * // 6
   */
  get ms(): number {
    return this.date.getMilliseconds();
  }

  /**
   * @name ampmHour
   * @description Get the hour as a number. (on 12-hour clock)
   * @example
   * ymdhis(2000, 1, 2, 20, 4, 5).ampmHour
   * // 8
   */
  get ampmHour(): number {
    return this.date.getHours() % 12 > 0 ? this.date.getHours() % 12 : 12;
  }

  /**
   * @name y
   * @description Get the formatted year.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).y
   * // "2000"
   */
  get y(): string {
    if (this.options.isYearAsFourDigits) {
      return (
        this.date.getFullYear().toString().padStart(4, "0") +
        this.options.yearSuffix
      );
    } else {
      return (
        (this.options.isEnablePaddingYear
          ? this.date.getFullYear().toString().slice(-2).padStart(2, "0")
          : parseInt(
              this.date.getFullYear().toString().slice(-2),
              10
            ).toString()) + this.options.yearSuffix
      );
    }
  }

  /**
   * @name m
   * @description Get the formatted month.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).m
   * // "01"
   */
  get m(): string {
    if (this.options.monthNotations !== null) {
      return this.options.monthNotations.length > this.date.getMonth()
        ? this.options.monthNotations[this.date.getMonth()]
        : "";
    } else {
      return (
        (this.options.isMonthAsTwoDigits
          ? this.month.toString().padStart(2, "0")
          : this.month.toString()) + this.options.monthSuffix
      );
    }
  }

  /**
   * @name d
   * @description Get the formatted day.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).d
   * // "02"
   */
  get d(): string {
    if (this.options.dayNotations !== null) {
      return this.options.dayNotations.length > this.date.getDate() - 1
        ? this.options.dayNotations[this.date.getDate() - 1]
        : "";
    } else {
      return (
        (this.options.isDayAsTwoDigits
          ? this.day.toString().padStart(2, "0")
          : this.day.toString()) + this.options.daySuffix
      );
    }
  }

  /**
   * @name h
   * @description Get the formatted hour.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).h
   * // "03"
   */
  get h(): string {
    return (
      (this.options.isHourAsTwoDigits
        ? this.hour.toString().padStart(2, "0")
        : this.hour.toString()) + this.options.hourSuffix
    );
  }

  /**
   * @name i
   * @description Get the formatted minute.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).i
   * // "04"
   */
  get i(): string {
    return (
      (this.options.isMinuteAsTwoDigits
        ? this.minute.toString().padStart(2, "0")
        : this.minute.toString()) + this.options.minuteSuffix
    );
  }

  /**
   * @name s
   * @description Get the formatted second.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).s
   * // "05"
   */
  get s(): string {
    return (
      (this.options.isSecondAsTwoDigits
        ? this.second.toString().padStart(2, "0")
        : this.second.toString()) + this.options.secondSuffix
    );
  }

  /**
   * @name w
   * @description Get the formatted day of the week.
   * @example
   * ymdhis(2000, 1, 1, 3, 4, 5).w
   * // "Saturday"
   */
  get w(): string {
    return this.options.dowNotations.length > this.date.getDay()
      ? this.options.dowNotations[this.date.getDay()]
      : "";
  }

  /**
   * @name a
   * @description Returns AM/PM notation depending on the time.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).a
   * // "AM"
   */
  get a(): string {
    return this.date.getHours() > 11
      ? this.options.pmNotation
      : this.options.amNotation;
  }

  /**
   * @name g
   * @description Get the formatted hour. (on 12-hour clock)
   * @private
   */
  private get g(): string {
    return (
      (this.options.isHourAsTwoDigits
        ? this.ampmHour.toString().padStart(2, "0")
        : this.ampmHour.toString()) + this.options.hourSuffix
    );
  }

  /**
   * @name ym
   * @description Get the formatted year and month.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).ym
   * // "2000-01"
   */
  get ym(): string {
    return this.y + this.options.dateSeparator + this.m;
  }

  /**
   * @name ymd
   * @description Get the formatted year, month and day.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).ymd
   * // "2000-01-02"
   */
  get ymd(): string {
    return (
      this.y +
      this.options.dateSeparator +
      this.m +
      this.options.dateSeparator +
      this.d
    );
  }

  /**
   * @name ymdhi
   * @description Get the formatted year, month, day, hour and minute.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).ymdhi
   * // "2000-01-02 03:04"
   */
  get ymdhi(): string {
    return (
      this.y +
      this.options.dateSeparator +
      this.m +
      this.options.dateSeparator +
      this.d +
      this.options.dateTimeSeparator +
      this.h +
      this.options.timeSeparator +
      this.i
    );
  }

  /**
   * @name ymdhis
   * @description Get the formatted year, month, day, hour, minute and second.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).ymdhis
   * // "2000-01-02 03:04:05"
   */
  get ymdhis(): string {
    return (
      this.y +
      this.options.dateSeparator +
      this.m +
      this.options.dateSeparator +
      this.d +
      this.options.dateTimeSeparator +
      this.h +
      this.options.timeSeparator +
      this.i +
      this.options.timeSeparator +
      this.s
    );
  }

  /**
   * @name ymdw
   * @description Get the formatted year, month, day and day of the week.
   * @example
   * ymdhis(2000, 1, 1, 3, 4, 5).ymdw
   * // "2000-01-01 Saturday"
   */
  get ymdw(): string {
    return (
      this.y +
      this.options.dateSeparator +
      this.m +
      this.options.dateSeparator +
      this.d +
      this.options.dowSeparator +
      this.w
    );
  }

  /**
   * @name wymd
   * @description Get the formatted day of the week, year, month and day.
   * @example
   * ymdhis(2000, 1, 1, 3, 4, 5).wymd
   * // "Saturday 2000-01-01"
   */
  get wymd(): string {
    return (
      this.w +
      this.options.dowSeparator +
      this.y +
      this.options.dateSeparator +
      this.m +
      this.options.dateSeparator +
      this.d
    );
  }

  /**
   * @name dmy
   * @description Get the formatted day, month and year.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).dmy
   * // "02-01-2000"
   */
  get dmy(): string {
    return (
      this.d +
      this.options.dateSeparator +
      this.m +
      this.options.dateSeparator +
      this.y
    );
  }

  /**
   * @name dm
   * @description Get the formatted day and month.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).dm
   * // "02-01"
   */
  get dm(): string {
    return this.d + this.options.dateSeparator + this.m;
  }

  /**
   * @name mdy
   * @description Get the formatted month, day and year.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).mdy
   * // "01-02-2000"
   */
  get mdy(): string {
    return (
      this.m +
      this.options.dateSeparator +
      this.d +
      this.options.dateSeparator +
      this.y
    );
  }

  /**
   * @name md
   * @description Get the formatted month and day.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).md
   * // "01-02"
   */
  get md(): string {
    return this.m + this.options.dateSeparator + this.d;
  }

  /**
   * @name hi
   * @description Get the formatted hour and minute.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).hi
   * // "03:04"
   */
  get hi(): string {
    return this.h + this.options.timeSeparator + this.i;
  }

  /**
   * @name his
   * @description Get the formatted hour, minute and second.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).his
   * // "03:04:05"
   */
  get his(): string {
    return (
      this.h +
      this.options.timeSeparator +
      this.i +
      this.options.timeSeparator +
      this.s
    );
  }

  /**
   * @name hia
   * @description Get the formatted hour (12-hour clock), minute and AM/PM notation.
   * @example
   * ymdhis(2000, 1, 2, 20, 4, 5).hia
   * // "08:04 PM"
   */
  get hia(): string {
    return (
      this.g +
      this.options.timeSeparator +
      this.i +
      this.options.ampmSeparator +
      this.a
    );
  }

  /**
   * @name hisa
   * @description Get the formatted hour (12-hour clock), minute, second and AM/PM notation.
   * @example
   * ymdhis(2000, 1, 2, 20, 4, 5).hisa
   * // "08:04:05 PM"
   */
  get hisa(): string {
    return (
      this.g +
      this.options.timeSeparator +
      this.i +
      this.options.timeSeparator +
      this.s +
      this.options.ampmSeparator +
      this.a
    );
  }

  /**
   * @name ahi
   * @description Get the formatted AM/PM notation, hour (12-hour clock) and minute.
   * @example
   * ymdhis(2000, 1, 2, 20, 4, 5).ahi
   * // "PM 08:04"
   */
  get ahi(): string {
    return (
      this.a +
      this.options.ampmSeparator +
      this.g +
      this.options.timeSeparator +
      this.i
    );
  }

  /**
   * @name ahis
   * @description Get the formatted AM/PM notation, hour (12-hour clock), minute and second.
   * @example
   * ymdhis(2000, 1, 2, 20, 4, 5).ahis
   * // "PM 08:04:05"
   */
  get ahis(): string {
    return (
      this.a +
      this.options.ampmSeparator +
      this.g +
      this.options.timeSeparator +
      this.i +
      this.options.timeSeparator +
      this.s
    );
  }

  /**
   * @name number
   * @description Get the number of month, date, minute, and second in a row.
   * @example
   * ymdhis(2018, 1, 2, 3, 4, 5).number
   * // 20180102030405
   */
  get number(): number {
    return (
      this.date.getFullYear() * 10000000000 +
      (this.date.getMonth() + 1) * 100000000 +
      this.date.getDate() * 1000000 +
      this.date.getHours() * 10000 +
      this.date.getMinutes() * 100 +
      this.date.getSeconds()
    );
  }

  /**
   * @name string
   * @description Get the formatted year, month, day, hour, minute and second.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).string
   * // "2000-01-02 03:04:05"
   */
  get string(): string {
    return this.toString();
  }

  /**
   * @name timestamp
   * @description Get the timestamp.
   * @example
   * ymdhis(2000, 1, 1, 0, 0, 0).timestamp
   * // 946684800000
   */
  get timestamp(): number {
    return this.date.getTime() - this.date.getTimezoneOffset() * 60 * 1000;
  }

  /**
   * @name iso9075
   * @description Get the ISO9075 format string. (Not affected by formatting options)
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).iso9075
   * // "2000-01-02 03:04:05"
   */
  get iso9075(): string {
    return (
      this.year.toString().padStart(4, "0") +
      "-" +
      this.month.toString().padStart(2, "0") +
      "-" +
      this.day.toString().padStart(2, "0") +
      " " +
      this.hour.toString().padStart(2, "0") +
      ":" +
      this.minute.toString().padStart(2, "0") +
      ":" +
      this.second.toString().padStart(2, "0")
    );
  }

  /**
   * @name iso8601
   * @description Get the ISO8601 format string. (Not affected by formatting options)
   * @example
   * // Timezone offset +08:00
   * ymdhis(2000, 1, 2, 3, 4, 5).iso8601
   * // "2000-01-02T03:04:05.000+08:00"
   */
  get iso8601(): string {
    // istanbul ignore next
    const sign = this.date.getTimezoneOffset() > 0 ? "-" : "+";
    const tzd =
      sign +
      Math.floor(Math.abs(this.date.getTimezoneOffset()) / 60)
        .toString()
        .padStart(2, "0") +
      ":" +
      (Math.abs(this.date.getTimezoneOffset()) % 60)
        .toString()
        .padStart(2, "0");

    return (
      this.year.toString().padStart(4, "0") +
      "-" +
      this.month.toString().padStart(2, "0") +
      "-" +
      this.day.toString().padStart(2, "0") +
      "T" +
      this.hour.toString().padStart(2, "0") +
      ":" +
      this.minute.toString().padStart(2, "0") +
      ":" +
      this.second.toString().padStart(2, "0") +
      "." +
      this.ms.toString().padStart(3, "0") +
      (this.options.isUtc ? "Z" : tzd)
    );
  }

  /**
   * @name afterYears
   * @description Return a new Ymdhis object with the date after the number of years given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).iso8601
   * // "2000-01-02T03:04:05.000+08:00"
   * @param years
   */
  afterYears(years: number): Ymdhis {
    this.date.setFullYear(this.date.getFullYear() + years);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  /**
   * @name afterMonths
   * @description Return a new Ymdhis object with the date after the number of months given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).afterMonths(2).ymd
   * // "2000-03-02"
   * @param months
   */
  afterMonths(months: number): Ymdhis {
    this.date.setMonth(this.date.getMonth() + months);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  /**
   * @name afterWeeks
   * @description Return a new Ymdhis object with the date after the number of weeks given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).afterWeeks(1).ymd
   * // "2000-01-09"
   * @param weeks
   */
  afterWeeks(weeks: number): Ymdhis {
    this.date.setDate(this.date.getDate() + weeks * 7);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  /**
   * @name afterDays
   * @description Return a new Ymdhis object with the date after the number of days given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).afterDays(3).ymd
   * // "2000-01-05"
   * @param days
   */
  afterDays(days: number): Ymdhis {
    this.date.setDate(this.date.getDate() + days);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  /**
   * @name afterHours
   * @description Return a new Ymdhis object with the date after the number of hours given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).afterHours(10).string
   * // "2000-01-02 13:04:05"
   * @param hours
   */
  afterHours(hours: number): Ymdhis {
    this.date.setHours(this.date.getHours() + hours);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  /**
   * @name afterMinutes
   * @description Return a new Ymdhis object with the date after the number of minutes given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).afterMinutes(3).string
   * // "2000-01-02 03:07:05"
   * @param minutes
   */
  afterMinutes(minutes: number): Ymdhis {
    this.date.setMinutes(this.date.getMinutes() + minutes);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  /**
   * @name afterSeconds
   * @description Return a new Ymdhis object with the date after the number of seconds given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).afterSeconds(5).string
   * // "2000-01-02 03:04:10"
   * @param seconds
   */
  afterSeconds(seconds: number): Ymdhis {
    this.date.setSeconds(this.date.getSeconds() + seconds);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  /**
   * @name afterMilliseconds
   * @description Return a new Ymdhis object with the date after the number of milliseconds given.
   * @example
   * // Timezone offset +08:00
   * ymdhis(2000, 1, 2, 3, 4, 5).afterMilliseconds(25).iso8601
   * // "2000-01-02T03:04:05.025+08:00"
   * @param ms
   */
  afterMilliseconds(ms: number): Ymdhis {
    this.date.setMilliseconds(this.date.getMilliseconds() + ms);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  /**
   * @name beforeYears
   * @description Return a new Ymdhis object with the date before the number of years given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).beforeYears(10).ymd
   * // "1990-01-02"
   * @param years
   */
  beforeYears(years: number): Ymdhis {
    return this.afterYears(-years);
  }

  /**
   * @name beforeMonths
   * @description Return a new Ymdhis object with the date before the number of months given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).beforeMonths(2).ymd
   * // "1999-11-02"
   * @param months
   */
  beforeMonths(months: number): Ymdhis {
    return this.afterMonths(-months);
  }

  /**
   * @name beforeWeeks
   * @description Return a new Ymdhis object with the date before the number of weeks given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).beforeWeeks(1).ymd
   * // "1999-12-26"
   * @param weeks
   */
  beforeWeeks(weeks: number): Ymdhis {
    return this.afterWeeks(-weeks);
  }

  /**
   * @name beforeDays
   * @description Return a new Ymdhis object with the date before the number of days given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).beforeDays(3).ymd
   * // "1999-12-30"
   * @param days
   */
  beforeDays(days: number): Ymdhis {
    return this.afterDays(-days);
  }

  /**
   * @name beforeHours
   * @description Return a new Ymdhis object with the date before the number of hours given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).beforeHours(4).string
   * // "2000-01-01 23:04:05"
   * @param hours
   */
  beforeHours(hours: number): Ymdhis {
    return this.afterHours(-hours);
  }

  /**
   * @name beforeMinutes
   * @description Return a new Ymdhis object with the date before the number of minutes given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).beforeMinutes(3).string
   * // "2000-01-02 03:01:05"
   * @param minutes
   */
  beforeMinutes(minutes: number): Ymdhis {
    return this.afterMinutes(-minutes);
  }

  /**
   * @name beforeSeconds
   * @description Return a new Ymdhis object with the date before the number of seconds given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).beforeSeconds(5).string
   * // "2000-01-02 03:04:00"
   * @param seconds
   */
  beforeSeconds(seconds: number): Ymdhis {
    return this.afterSeconds(-seconds);
  }

  /**
   * @name beforeMilliseconds
   * @description Return a new Ymdhis object with the date before the number of milliseconds given.
   * @example
   * // Timezone offset +08:00
   * ymdhis(2000, 1, 2, 3, 4, 5).beforeMilliseconds(25).iso8601
   * // "2000-01-02T03:04:04.975+08:00"
   * @param ms
   */
  beforeMilliseconds(ms: number): Ymdhis {
    return this.afterMilliseconds(-ms);
  }

  /**
   * @name lastOfMonth
   * @description Returns a new object with the end of month date of the current date.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).lastOfMonth().ymd
   * // "2000-01-31"
   */
  lastOfMonth(): Ymdhis {
    return this.afterMonths(1).firstOfMonth().beforeDays(1);
  }

  /**
   * @name firstOfMonth
   * @description Returns a new object with the first of month date of the current date.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).firstOfMonth().ymd
   * // "2000-01-01"
   */
  firstOfMonth(): Ymdhis {
    this.date.setDate(1);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  /**
   * @name setSeparators
   * @description Return a new Ymdhis object with separators given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setDateSeparator("/").ymd
   * // "2000/01/02"
   * @param dateSeparator
   * @param dateTimeSeparator
   * @param timeSeparator
   */
  setSeparators(
    dateSeparator: string,
    dateTimeSeparator: string,
    timeSeparator: string
  ): Ymdhis {
    return this.cloneWithUpdateOptions({
      dateSeparator: dateSeparator,
      dateTimeSeparator: dateTimeSeparator,
      timeSeparator: timeSeparator,
    });
  }

  /**
   * @name setDateSeparator
   * @description Return a new Ymdhis object with the date separator given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setDateSeparator("/").ymd
   * // "2000/01/02"
   * @param separator
   */
  setDateSeparator(separator: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      dateSeparator: separator,
    });
  }

  /**
   * @name setTimeSeparator
   * @description Return a new Ymdhis object with the time separator given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setTimeSeparator(".").string
   * // "2000-01-02 03.04.05"
   * @param separator
   */
  setTimeSeparator(separator: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      timeSeparator: separator,
    });
  }

  /**
   * @name setDateTimeSeparator
   * @description Return a new Ymdhis object with the separator between date and time given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setDateTimeSeparator("_").string
   * // "2000-01-02_03:04:05"
   * @param separator
   */
  setDateTimeSeparator(separator: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      dateTimeSeparator: separator,
    });
  }

  /**
   * @name setAmpmSeparator
   * @description Return a new Ymdhis object with the separator between date-time and AM/PM notation given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setAmpmSeparator("_").ahi
   * // "AM_03:04"
   * @param separator
   */
  setAmpmSeparator(separator: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      ampmSeparator: separator,
    });
  }

  /**
   * @name setDowSeparator
   * @description Return a new Ymdhis object with the separator between date-time and day of the week notation given.
   * @example
   * ymdhis(2000, 1, 1, 3, 4, 5).setDowSeparator("_").wymd
   * // "Saturday_2000-01-01"
   * @param separator
   */
  setDowSeparator(separator: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      dowSeparator: separator,
    });
  }

  /**
   * @name setSuffixes
   * @description Return a new Ymdhis object with the suffixes given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setSuffixes("Y", "M", "D", "H", "I", "S").string
   * // "2000Y-01M-02D 03H:04I:05S"
   * @param y
   * @param m
   * @param d
   * @param h
   * @param i
   * @param s
   */
  setSuffixes(
    y: string,
    m: string,
    d: string,
    h: string,
    i: string,
    s: string
  ): Ymdhis {
    return this.cloneWithUpdateOptions({
      yearSuffix: y,
      monthSuffix: m,
      daySuffix: d,
      hourSuffix: h,
      minuteSuffix: i,
      secondSuffix: s,
    });
  }

  /**
   * @name setYearSuffix
   * @description Return a new Ymdhis object with the suffix of year given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setYearSuffix("Y").y
   * // "2000Y"
   * @param suffix
   */
  setYearSuffix(suffix: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      yearSuffix: suffix,
    });
  }

  /**
   * @name setMonthSuffix
   * @description Return a new Ymdhis object with the suffix of month given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setMonthSuffix("M").m
   * // "01M"
   * @param suffix
   */
  setMonthSuffix(suffix: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      monthSuffix: suffix,
    });
  }

  /**
   * @name setDaySuffix
   * @description Return a new Ymdhis object with the suffix of day given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setDaySuffix("D").d
   * // "02D"
   * @param suffix
   */
  setDaySuffix(suffix: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      daySuffix: suffix,
    });
  }

  /**
   * @name setHourSuffix
   * @description Return a new Ymdhis object with the suffix of hour given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setHourSuffix("H").h
   * // "03H"
   * @param suffix
   */
  setHourSuffix(suffix: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      hourSuffix: suffix,
    });
  }

  /**
   * @name setMinuteSuffix
   * @description Return a new Ymdhis object with the suffix of minute given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setMinuteSuffix("I").i
   * // "04I"
   * @param suffix
   */
  setMinuteSuffix(suffix: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      minuteSuffix: suffix,
    });
  }

  /**
   * @name setSecondSuffix
   * @description Return a new Ymdhis object with the suffix of second given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setSecondSuffix("S").s
   * // "05S"
   * @param suffix
   */
  setSecondSuffix(suffix: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      secondSuffix: suffix,
    });
  }

  /**
   * @name setAmNotation
   * @description Return a new Ymdhis object with the notation of AM given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setAmNotation("a.m.").ahi
   * // "a.m. 03:04"
   * @param am
   */
  setAmNotation(am: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      amNotation: am,
    });
  }

  /**
   * @name setPmNotation
   * @description Return a new Ymdhis object with the notation of PM given.
   * @example
   * ymdhis(2000, 1, 2, 20, 4, 5).setPmNotation("p.m.").ahi
   * // "p.m. 08:04"
   * @param pm
   */
  setPmNotation(pm: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      pmNotation: pm,
    });
  }

  /**
   * @name setDowNotations
   * @description Return a new Ymdhis object with the notation array of day of the week given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setDowNotations(["Sun.", "Mon.", "Tue."]).ymdw
   * // "2000-01-02 Sun."
   * @param dowList
   */
  setDowNotations(dowList: string[]): Ymdhis {
    return this.cloneWithUpdateOptions({
      dowNotations: dowList.slice(0, 7),
    });
  }

  /**
   * @name setMonthNotations
   * @description Return a new Ymdhis object with the notation array of months given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setMonthNotations(["January", "February"]).ymd
   * // "2000-January-02"
   * @param monthList
   */
  setMonthNotations(monthList: string[]): Ymdhis {
    return this.cloneWithUpdateOptions({
      monthNotations: monthList.slice(0, 12),
    });
  }

  /**
   * @name setDayNotations
   * @description Return a new Ymdhis object with the notation array of days given.
   * @example
   * ymdhis(2000, 1, 2, 3, 4, 5).setDayNotations(["1st", "2nd"]).ymd
   * // "2000-01-2nd"
   * @param dayList
   */
  setDayNotations(dayList: string[]): Ymdhis {
    return this.cloneWithUpdateOptions({
      dayNotations: dayList.slice(0, 31),
    });
  }

  /**
   * @name setYearAsTwoDigits
   * @description Return a new Ymdhis object with the year in two digits.
   * @example
   * ymdhis(2018, 1, 2, 3, 4, 5).setYearAsTwoDigits().ymd
   * // "18-01-02"
   */
  setYearAsTwoDigits(): Ymdhis {
    return this.cloneWithUpdateOptions({ isYearAsFourDigits: false });
  }

  /**
   * @name clearPaddings
   * @description Return a new Ymdhis object without all padding.
   * @example
   * ymdhis(2008, 1, 2, 3, 4, 5).clearPaddings().setYearAsTwoDigits().string
   * // "8-1-2 3:4:5"
   */
  clearPaddings(): Ymdhis {
    return this.cloneWithUpdateOptions({
      isEnablePaddingYear: false,
      isMonthAsTwoDigits: false,
      isDayAsTwoDigits: false,
      isHourAsTwoDigits: false,
      isMinuteAsTwoDigits: false,
      isSecondAsTwoDigits: false,
    });
  }

  /**
   * @name clearDatePaddings
   * @description Return a new Ymdhis object without year, month and day padding.
   * @example
   * ymdhis(2008, 1, 2, 3, 4, 5).clearDatePaddings().setYearAsTwoDigits().string
   * // "8-1-2 03:04:05"
   */
  clearDatePaddings(): Ymdhis {
    return this.cloneWithUpdateOptions({
      isEnablePaddingYear: false,
      isMonthAsTwoDigits: false,
      isDayAsTwoDigits: false,
    });
  }

  /**
   * @name clearYearPadding
   * @description Return a new Ymdhis object without year padding.
   * @example
   * ymdhis(2008, 1, 2, 3, 4, 5).clearYearPadding().setYearAsTwoDigits().ymd
   * // "8-01-02"
   */
  clearYearPadding(): Ymdhis {
    return this.cloneWithUpdateOptions({ isEnablePaddingYear: false });
  }

  /**
   * @name clearMonthPadding
   * @description Return a new Ymdhis object without month padding.
   * @example
   * ymdhis(2008, 1, 2, 3, 4, 5).clearMonthPadding().ymd
   * // "2008-1-02"
   */
  clearMonthPadding(): Ymdhis {
    return this.cloneWithUpdateOptions({ isMonthAsTwoDigits: false });
  }

  /**
   * @name clearDayPadding
   * @description Return a new Ymdhis object without day padding.
   * @example
   * ymdhis(2008, 1, 2, 3, 4, 5).clearDayPadding().ymd
   * // "2008-01-2"
   */
  clearDayPadding(): Ymdhis {
    return this.cloneWithUpdateOptions({ isDayAsTwoDigits: false });
  }

  /**
   * @name clearTimePaddings
   * @description Return a new Ymdhis object without hour, minute, second padding.
   * @example
   * ymdhis(2008, 1, 2, 3, 4, 5).clearTimePaddings().string
   * // "2008-01-02 3:4:5"
   */
  clearTimePaddings(): Ymdhis {
    return this.cloneWithUpdateOptions({
      isHourAsTwoDigits: false,
      isMinuteAsTwoDigits: false,
      isSecondAsTwoDigits: false,
    });
  }

  /**
   * @name clearHourPadding
   * @description Return a new Ymdhis object without hour padding.
   * @example
   * ymdhis(2008, 1, 2, 3, 4, 5).clearHourPadding().his
   * // "3:04:05"
   */
  clearHourPadding(): Ymdhis {
    return this.cloneWithUpdateOptions({ isHourAsTwoDigits: false });
  }

  /**
   * @name clearMinutePadding
   * @description Return a new Ymdhis object without minute padding.
   * @example
   * ymdhis(2008, 1, 2, 3, 4, 5).clearMinutePadding().his
   * // "03:4:05"
   */
  clearMinutePadding(): Ymdhis {
    return this.cloneWithUpdateOptions({ isMinuteAsTwoDigits: false });
  }

  /**
   * @name clearSecondPadding
   * @description Return a new Ymdhis object without second padding.
   * @example
   * ymdhis(2008, 1, 2, 3, 4, 5).clearSecondPadding().his
   * // "03:04:5"
   */
  clearSecondPadding(): Ymdhis {
    return this.cloneWithUpdateOptions({ isSecondAsTwoDigits: false });
  }

  /**
   * @name clearSeparators
   * @description Return a new Ymdhis object without all separators.
   * @example
   * ymdhis(2018, 1, 2, 3, 4, 5).clearSeparators().string
   * // "20180102030405"
   */
  clearSeparators(): Ymdhis {
    return this.cloneWithUpdateOptions({
      dateSeparator: "",
      dateTimeSeparator: "",
      timeSeparator: "",
      dowSeparator: "",
      ampmSeparator: "",
    });
  }

  /**
   * @name toString
   * @description Get the formatted year, month, day, hour, minute and second.
   * @example
   * `${ymdhis(2000, 1, 2, 12, 34, 56)}`
   * // "2000-01-02 12:34:56"
   */
  toString(): string {
    return this.ymdhis;
  }

  /**
   * @name valueOf
   * @description Get the timestamp.
   * @example
   * ymdhis(1999, 9, 9).now() > ymdhis(2000, 1, 2)
   * // true
   */
  valueOf(): number {
    return this.timestamp;
  }

  /**
   * @name utc
   * @description Return a new Ymdhis object initialized with the year, month, day, hour, minute, second
   *              and millisecond given and treat it as UTC time.
   * @example
   * // Timezone offset +08:00
   * ymdhis().utc(2000, 1, 2, 3, 4, 5, 6).iso8601
   * // "2000-01-02T03:04:05.006Z"
   * @param y
   * @param m
   * @param d
   * @param h
   * @param i
   * @param s
   * @param ms
   */
  utc(
    y: number,
    m: number,
    d: number,
    h: number,
    i: number,
    s: number,
    ms: number
  ): Ymdhis;

  /**
   * @name utc
   * @description Return a new Ymdhis object initialized with the year, month, day, hour, minute and second given
   *              and treat it as UTC time.
   * @example
   * ymdhis().utc(2000, 1, 2, 3, 4, 5).string
   * // "2000-01-02 03:04:05"
   * @param y
   * @param m
   * @param d
   * @param h
   * @param i
   * @param s
   */
  utc(y: number, m: number, d: number, h: number, i: number, s: number): Ymdhis;

  /**
   * @name utc
   * @description Return a new Ymdhis object initialized with the year, month, day, hour and minute given
   *              and treat it as UTC time.
   * @example
   * ymdhis().utc(2000, 1, 2, 3, 4).string
   * // "2000-01-02 03:04:00"
   * @param y
   * @param m
   * @param d
   * @param h
   * @param i
   */
  utc(y: number, m: number, d: number, h: number, i: number): Ymdhis;

  /**
   * @name utc
   * @description Return a new Ymdhis object initialized with the year, month, day and hour given
   *              and treat it as UTC time.
   * @example
   * ymdhis().utc(2000, 1, 2, 3).string
   * // "2000-01-02 03:00:00"
   * @param y
   * @param m
   * @param d
   * @param h
   */
  utc(y: number, m: number, d: number, h: number): Ymdhis;

  /**
   * @name utc
   * @description Return a new Ymdhis object initialized with the year, month and day given and treat it as UTC time.
   * @example
   * ymdhis().utc(2000, 1, 2).string
   * // "2000-01-02 00:00:00"
   * @param y
   * @param m
   * @param d
   */
  utc(y: number, m: number, d: number): Ymdhis;

  /**
   * @name utc
   * @description Return a new Ymdhis object initialized with the year and month given and treat it as UTC time.
   * @example
   * ymdhis().utc(2000, 1).string
   * // "2000-01-01 00:00:00"
   * @param y
   * @param m
   */
  utc(y: number, m: number): Ymdhis;

  /**
   * @name utc
   * @description Return a new Ymdhis object initialized in UTC Unix timestamp.
   * @example
   * // Timezone offset +08:00
   * ymdhis().utc(0).string
   * // "1970-01-01 00:00:00"
   * @param timestamp
   */
  utc(timestamp: number): Ymdhis;

  /**
   * @name utc
   * @description Return a new Ymdhis object initialized with the ISO9075-based string given
   *              and treat it as UTC time.
   * @example
   * ymdhis().utc("2000-01-02 12:34:56").string
   * // "2000-01-02 12:34:56"
   * @param str
   */
  utc(str: string): Ymdhis;

  /**
   * @name utc
   * @description Return a new Ymdhis object initialized with the Date object given
   *              and treat it as UTC time.
   * @example
   * ymdhis().utc(new Date(2000, 0, 2, 10, 4, 5)).string
   * // "2000-01-02 02:04:05"
   * @param date
   */
  utc(date: Date): Ymdhis;

  /**
   * @name utc
   * @description Return a new Ymdhis object converted from local time to UTC time.
   * @example
   * ymdhis(2000, 1, 2, 10, 4, 5).utc().string
   * // "2000-01-02 02:04:05"
   */
  utc(): Ymdhis;

  /**
   * @name utc
   * @description Return a new Ymdhis object initialized with the numbers or string or Date object given
   *              and treat it as UTC time.
   * @param arg1 year or string or Date
   * @param m
   * @param d
   * @param h
   * @param i
   * @param s
   * @param ms
   */
  utc(
    arg1?: number | string | Date,
    m?: number,
    d?: number,
    h?: number,
    i?: number,
    s?: number,
    ms?: number
  ): Ymdhis {
    switch (typeof arg1) {
      // to UTC time
      case "undefined":
        if (this.options.isUtc) {
          return this.cloneWithNewDate(this.date);
        }
        this.options.isUtc = true;
        return this.afterMinutes(this.date.getTimezoneOffset());
      case "string":
        this.options.isUtc = true;
        return this.cloneWithNewDate(CreateDate.create(arg1));
      case "object":
        this.options.isUtc = false;
        return this.cloneWithNewDate(CreateDate.create(arg1)).utc();
      case "number":
        // create from timestamp
        if (typeof m === "undefined") {
          this.options.isUtc = false;
          return this.cloneWithNewDate(CreateDate.create(arg1)).utc();
        }
        this.options.isUtc = true;
        return this.cloneWithNewDate(
          CreateDate.create(arg1, m, d, h, i, s, ms)
        );
    }
  }

  /**
   * @name local
   * @description Return a new Ymdhis object initialized with the year, month, day, hour, minute, second
   *              and millisecond given.
   * @example
   * // Timezone offset +08:00
   * ymdhis().local(2000, 1, 2, 3, 4, 5, 6).iso8601
   * // "2000-01-02T03:04:05.006+08:00"
   * @param y
   * @param m
   * @param d
   * @param h
   * @param i
   * @param s
   * @param ms
   */
  local(
    y: number,
    m: number,
    d: number,
    h: number,
    i: number,
    s: number,
    ms: number
  ): Ymdhis;

  /**
   * @name local
   * @description Return a new Ymdhis object initialized with the year, month, day, hour, minute and second given.
   * @example
   * ymdhis().local(2000, 1, 2, 3, 4, 5).string
   * // "2000-01-02 03:04:05"
   * @param y
   * @param m
   * @param d
   * @param h
   * @param i
   * @param s
   */
  local(
    y: number,
    m: number,
    d: number,
    h: number,
    i: number,
    s: number
  ): Ymdhis;

  /**
   * @name local
   * @description Return a new Ymdhis object initialized with the year, month, day, hour and minute given.
   * @example
   * ymdhis().local(2000, 1, 2, 3, 4).string
   * // "2000-01-02 03:04:00"
   * @param y
   * @param m
   * @param d
   * @param h
   * @param i
   */
  local(y: number, m: number, d: number, h: number, i: number): Ymdhis;

  /**
   * @name local
   * @description Return a new Ymdhis object initialized with the year, month, day and hour given.
   * @example
   * ymdhis().local(2000, 1, 2, 3).string
   * // "2000-01-02 03:00:00"
   * @param y
   * @param m
   * @param d
   * @param h
   */
  local(y: number, m: number, d: number, h: number): Ymdhis;

  /**
   * @name local
   * @description Return a new Ymdhis object initialized with the year, month and day given.
   * @example
   * ymdhis().local(2000, 1, 2).string
   * // "2000-01-02 00:00:00"
   * @param y
   * @param m
   * @param d
   */
  local(y: number, m: number, d: number): Ymdhis;

  /**
   * @name local
   * @description Return a new Ymdhis object initialized with the year and month given.
   * @example
   * ymdhis().local(2000, 1).string
   * // "2000-01-01 00:00:00"
   * @param y
   * @param m
   */
  local(y: number, m: number): Ymdhis;

  /**
   * @name local
   * @description Return a new Ymdhis object initialized with the ISO9075-based string given.
   * @example
   * ymdhis().local("2000-01-02 03:04:05").string
   * // "2000-01-02 03:04:05"
   * @param str
   */
  local(str: string): Ymdhis;

  /**
   * @name local
   * @description Return a new Ymdhis object initialized with the Date object given.
   * @example
   * ymdhis().local(new Date(2000,  0,  2,  3,  4,  5)).string
   * // "2000-01-02 03:04:05"
   * @param date
   */
  local(date: Date): Ymdhis;

  /**
   * @name local
   * @description Return a new Ymdhis object converted from UTC time to local time.
   * @example
   * // Timezone offset +08:00
   * ymdhis().utc(2000, 1, 2, 3, 4, 5).local().string
   * // "2000-01-02 11:04:05"
   */
  local(): Ymdhis;

  /**
   * @name local
   * @description Return a new Ymdhis object initialized with the numbers or string or Date object given.
   * @param arg1
   * @param m
   * @param d
   * @param h
   * @param i
   * @param s
   * @param ms
   */
  local(
    arg1?: number | string | Date,
    m?: number,
    d?: number,
    h?: number,
    i?: number,
    s?: number,
    ms?: number
  ): Ymdhis {
    // to local time
    if (typeof arg1 === "undefined") {
      if (this.options.isUtc) {
        this.options.isUtc = false;
        return this.beforeMinutes(this.date.getTimezoneOffset());
      }
      return this.cloneWithNewDate(this.date);
    }
    this.options.isUtc = false;
    CreateDate.validateLocalDateCreateArgs(arg1, m);
    return this.cloneWithNewDate(CreateDate.create(arg1, m, d, h, i, s, ms));
  }

  /**
   * @name now
   * @description Return a new Ymdhis object initialized with now date time.
   * @example
   * ymdhis(1999, 9, 9).now() > ymdhis(2000, 1, 2)
   * // true
   */
  now(): Ymdhis {
    return this.cloneWithNewDate(CreateDate.create());
  }

  /**
   * @name cloneWithNewDate
   * @description Return a new Ymdhis object with updated date.
   * @param date
   * @private
   */
  private cloneWithNewDate(date: Date): Ymdhis {
    return new Ymdhis({
      date: date,
      options: this.options,
    });
  }

  /**
   * @name cloneWithUpdateOptions
   * @description Return a new Ymdhis object with partially updated options.
   * @param options
   * @private
   */
  private cloneWithUpdateOptions(options: Partial<Options>): Ymdhis {
    return new Ymdhis({
      date: this.date,
      options: Object.assign(this.options, options),
    });
  }
}

/**
 * Private helper class for Date object creation
 */
class CreateDate {
  static readonly exDateTime =
    /^(\d{1,4})(-(\d{1,2}))(-(\d{1,2})(\s(\d{1,2}):(\d{1,2})(:(\d{1,2})(\.(\d{1,3}))?)?)?)?$/;

  static readonly exIso8601 =
    /^(\d{4})-(\d{2})-(\d{2})[Tt](\d{2}):(\d{2}):(\d{2})(\.(\d{3}))?([Zz+-])((\d{2}):(\d{2}))?$/;

  static create(
    arg1?: number | string | Date,
    m?: number,
    d?: number,
    h?: number,
    i?: number,
    s?: number,
    ms?: number
  ): Date {
    const date = ((): Date => {
      switch (typeof arg1) {
        case "undefined":
          return new Date();
        case "string":
          return this.parse(arg1);
        case "object":
          return new Date(arg1.getTime());
        case "number":
          if (typeof m === "undefined") {
            return new Date(arg1);
          } else {
            return this.valuesToDate({
              year: arg1,
              month: m,
              day: d,
              hour: h,
              minute: i,
              second: s,
              millisecond: ms,
            });
          }
      }
    })();
    this.validateDateRange(date);
    return date;
  }

  static validateLocalDateCreateArgs(
    arg1?: number | string | Date,
    m?: number
  ) {
    switch (typeof arg1) {
      case "string":
        if (arg1.match(this.exIso8601)) {
          throw new Error(
            "Not support ISO8601 format string. Use utc() method instead."
          );
        }
        break;
      case "number":
        // istanbul ignore next
        if (typeof m === "undefined") {
          throw new Error("Invalid arguments. Input month.");
        }
        break;
      case "object":
        return;
    }
  }

  private static validateDateRange(date: Date) {
    this.validateValuesRange({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    });
  }

  private static validateValuesRange(values: DateInputValues) {
    this.checkRange(values.year, "year", 0, 9999);
    if (typeof values.month !== "undefined") {
      this.checkRange(values.month, "month", 1, 12);
    }
    if (typeof values.day !== "undefined") {
      this.checkRange(values.day, "day", 1, 31);
    }
    if (typeof values.hour !== "undefined") {
      this.checkRange(values.hour, "hour", 0, 23);
    }
    if (typeof values.minute !== "undefined") {
      this.checkRange(values.minute, "minute", 0, 59);
    }
    if (typeof values.second !== "undefined") {
      this.checkRange(values.second, "second", 0, 59);
    }
    if (typeof values.millisecond !== "undefined") {
      this.checkRange(values.millisecond, "millisecond", 0, 999);
    }
  }

  private static checkRange(
    value: number,
    name: string,
    min: number,
    max: number
  ) {
    if (value < min || value > max) {
      throw new Error(`Date range error. Invalid ${name}: ${value}`);
    }
  }

  private static toInt(str: string): number {
    return parseInt(str, 10);
  }

  private static valuesToDate(values: DateInputValues): Date {
    this.validateValuesRange(values);
    const date = new Date(0, 1, 1, 0, 0, 0, 0);
    // avoid: new Date(99,0) -> "1999-01-01"
    date.setFullYear(values.year);
    if (typeof values.day === "undefined") {
      date.setMonth(values.month - 1);
    } else if (typeof values.hour === "undefined") {
      date.setMonth(values.month - 1);
      date.setDate(values.day);
    } else if (typeof values.minute === "undefined") {
      date.setMonth(values.month - 1);
      date.setDate(values.day);
      date.setHours(values.hour);
    } else if (typeof values.second === "undefined") {
      date.setMonth(values.month - 1);
      date.setDate(values.day);
      date.setHours(values.hour);
      date.setMinutes(values.minute);
    } else if (typeof values.millisecond === "undefined") {
      date.setMonth(values.month - 1);
      date.setDate(values.day);
      date.setHours(values.hour);
      date.setMinutes(values.minute);
      date.setSeconds(values.second);
    } else {
      date.setMonth(values.month - 1);
      date.setDate(values.day);
      date.setHours(values.hour);
      date.setMinutes(values.minute);
      date.setSeconds(values.second);
      date.setMilliseconds(values.millisecond);
    }
    return date;
  }

  private static parse(str: string): Date {
    return str.indexOf("t") >= 0 || str.indexOf("T") >= 0
      ? this.iso8601StringToUtcDate(str)
      : this.dateTimeStringToDate(str);
  }

  private static iso8601StringToUtcDate(str: string): Date {
    const m = str.match(this.exIso8601);
    if (m === null) {
      throw new Error(`Invalid date format: ${str}`);
    }
    const date = this.valuesToDate({
      year: this.toInt(m[1]),
      month: this.toInt(m[2]),
      day: this.toInt(m[3]),
      hour: this.toInt(m[4]),
      minute: this.toInt(m[5]),
      second: this.toInt(m[6]),
      millisecond: m[8] === undefined ? undefined : this.toInt(m[8]),
    });
    const offset =
      m[9] === "Z" || m[9] === "z"
        ? 0
        : (this.toInt(m[11]) * 60 + this.toInt(m[12])) *
          (m[9] === "+" ? 1 : -1);
    this.checkRange(offset, "TZD [min]", -23 * 60 + 59, 23 * 60 + 59);
    date.setMinutes(date.getMinutes() - offset);
    return date;
  }

  private static dateTimeStringToDate(str: string): Date {
    const m = str.match(this.exDateTime);
    if (m === null) {
      throw new Error(`Invalid date format: ${str}`);
    }
    return this.valuesToDate({
      year: this.toInt(m[1]),
      month: this.toInt(m[3]),
      day: m[5] === undefined ? undefined : this.toInt(m[5]),
      hour: m[7] === undefined ? undefined : this.toInt(m[7]),
      minute: m[8] === undefined ? undefined : this.toInt(m[8]),
      second: m[10] === undefined ? undefined : this.toInt(m[10]),
      millisecond: m[12] === undefined ? undefined : this.toInt(m[12]),
    });
  }
}

/**
 * @name ymdhis
 * @description Return a new Ymdhis object initialized with the year, month, day, hour, minute, second
 *              and millisecond given.
 * @param y
 * @param m
 * @param d
 * @param h
 * @param i
 * @param s
 * @param ms
 */
export function ymdhis(
  y: number,
  m: number,
  d: number,
  h: number,
  i: number,
  s: number,
  ms: number
): Ymdhis;

/**
 * @name ymdhis
 * @description Return a new Ymdhis object initialized with the year, month, day, hour, minute and second given.
 * @param y
 * @param m
 * @param d
 * @param h
 * @param i
 * @param s
 */
export function ymdhis(
  y: number,
  m: number,
  d: number,
  h: number,
  i: number,
  s: number
): Ymdhis;

/**
 * @name ymdhis
 * @description Return a new Ymdhis object initialized with the year, month, day, hour and minute given.
 * @param y
 * @param m
 * @param d
 * @param h
 * @param i
 */
export function ymdhis(
  y: number,
  m: number,
  d: number,
  h: number,
  i: number
): Ymdhis;

/**
 * @name ymdhis
 * @description Return a new Ymdhis object initialized with the year, month, day and hour given.
 * @param y
 * @param m
 * @param d
 * @param h
 */
export function ymdhis(y: number, m: number, d: number, h: number): Ymdhis;

/**
 * @name ymdhis
 * @description Return a new Ymdhis object initialized with the year, month and day given.
 * @param y
 * @param m
 * @param d
 */
export function ymdhis(y: number, m: number, d: number): Ymdhis;

/**
 * @name ymdhis
 * @description Return a new Ymdhis object initialized with the year and month given.
 * @param y
 * @param m
 */
export function ymdhis(y: number, m: number): Ymdhis;

/**
 * @name ymdhis
 * @description Return a new Ymdhis object initialized with the ISO9075-based string given.
 * @param str
 */
export function ymdhis(str: string): Ymdhis;

/**
 * @name ymdhis
 * @description Return a new Ymdhis object initialized with the Date object given.
 * @param date
 */
export function ymdhis(date: Date): Ymdhis;

/**
 * @name ymdhis
 * @description Return a new Ymdhis object initialized with now date time.
 */
export function ymdhis(): Ymdhis;

/**
 * @name ymdhis
 * @description Return a new Ymdhis object initialized with numbers or string or Date object given.
 * @param arg1
 * @param m
 * @param d
 * @param h
 * @param i
 * @param s
 * @param ms
 */
export function ymdhis(
  arg1?: number | string | Date,
  m?: number,
  d?: number,
  h?: number,
  i?: number,
  s?: number,
  ms?: number
): Ymdhis {
  CreateDate.validateLocalDateCreateArgs(arg1, m);
  return new Ymdhis({ date: CreateDate.create(arg1, m, d, h, i, s, ms) });
}
