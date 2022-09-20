interface Props {
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
  dateNotations: string[] | null;
  dowNotations: string[];

  // Digits
  isYearAsFourDigits: boolean;
  isEnablePaddingYear: boolean;
  isMonthAsTwoDigits: boolean;
  isDayAsTwoDigits: boolean;
  isHourAsTwoDigits: boolean;
  isMinuteAsTwoDigits: boolean;
  isSecondAsTwoDigits: boolean;
}

class Ymdhis {
  readonly date: Date;

  private options: Options = {
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
    dateNotations: null,
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
  };

  constructor(props: Props) {
    this.date = new Date(props.date.getTime());
    if (typeof props.options !== "undefined") {
      this.options = Object.assign({}, props.options);
    }
  }

  get year(): number {
    return this.date.getFullYear();
  }

  get month(): number {
    return this.date.getMonth() + 1;
  }

  get day(): number {
    return this.date.getDate();
  }

  get dow(): number {
    return this.date.getDay();
  }

  get hour(): number {
    return this.date.getHours();
  }

  get minute(): number {
    return this.date.getMinutes();
  }

  get second(): number {
    return this.date.getSeconds();
  }

  get ampm(): number {
    return this.date.getHours() % 12 > 0 ? this.date.getHours() % 12 : 12;
  }

  get y(): string {
    if (this.options.isYearAsFourDigits) {
      return this.date.getFullYear().toString() + this.options.yearSuffix;
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

  get d(): string {
    if (this.options.dateNotations !== null) {
      return this.options.dateNotations.length > this.date.getDate() - 1
        ? this.options.dateNotations[this.date.getDate() - 1]
        : "";
    } else {
      return (
        (this.options.isDayAsTwoDigits
          ? this.day.toString().padStart(2, "0")
          : this.day.toString()) + this.options.daySuffix
      );
    }
  }

  get h(): string {
    return (
      (this.options.isHourAsTwoDigits
        ? this.hour.toString().padStart(2, "0")
        : this.hour.toString()) + this.options.hourSuffix
    );
  }

  get i(): string {
    return (
      (this.options.isMinuteAsTwoDigits
        ? this.minute.toString().padStart(2, "0")
        : this.minute.toString()) + this.options.minuteSuffix
    );
  }

  get s(): string {
    return (
      (this.options.isSecondAsTwoDigits
        ? this.second.toString().padStart(2, "0")
        : this.second.toString()) + this.options.secondSuffix
    );
  }

  get w(): string {
    return this.options.dowNotations.length > this.date.getDay()
      ? this.options.dowNotations[this.date.getDay()]
      : "";
  }

  get a(): string {
    return this.date.getHours() > 11
      ? this.options.pmNotation
      : this.options.amNotation;
  }

  private get g(): string {
    return (
      (this.options.isHourAsTwoDigits
        ? this.ampm.toString().padStart(2, "0")
        : this.ampm.toString()) + this.options.hourSuffix
    );
  }

  get ym(): string {
    return this.y + this.options.dateSeparator + this.m;
  }

  get ymd(): string {
    return (
      this.y +
      this.options.dateSeparator +
      this.m +
      this.options.dateSeparator +
      this.d
    );
  }

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

  get dmy(): string {
    return (
      this.d +
      this.options.dateSeparator +
      this.m +
      this.options.dateSeparator +
      this.y
    );
  }

  get dm(): string {
    return this.d + this.options.dateSeparator + this.m;
  }

  get mdy(): string {
    return (
      this.m +
      this.options.dateSeparator +
      this.d +
      this.options.dateSeparator +
      this.y
    );
  }

  get md(): string {
    return this.m + this.options.dateSeparator + this.d;
  }

  get hi(): string {
    return this.h + this.options.timeSeparator + this.i;
  }

  get his(): string {
    return (
      this.h +
      this.options.timeSeparator +
      this.i +
      this.options.timeSeparator +
      this.s
    );
  }

  get hia(): string {
    return (
      this.g +
      this.options.timeSeparator +
      this.i +
      this.options.ampmSeparator +
      this.a
    );
  }

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

  get ahi(): string {
    return (
      this.a +
      this.options.ampmSeparator +
      this.g +
      this.options.timeSeparator +
      this.i
    );
  }

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

  get number() {
    return (
      this.date.getFullYear() * 10000000000 +
      (this.date.getMonth() + 1) * 100000000 +
      this.date.getDate() * 1000000 +
      this.date.getHours() * 10000 +
      this.date.getMinutes() * 100 +
      this.date.getSeconds()
    );
  }

  get string() {
    return this.toString();
  }

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

  get iso8601(): string {
    return this.date.toISOString();
  }

  afterYears(years: number): Ymdhis {
    this.date.setFullYear(this.date.getFullYear() + years);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  afterMonths(months: number): Ymdhis {
    this.date.setMonth(this.date.getMonth() + months);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  afterWeeks(weeks: number): Ymdhis {
    this.date.setDate(this.date.getDate() + weeks * 7);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  afterDays(days: number): Ymdhis {
    this.date.setDate(this.date.getDate() + days);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  afterHours(hours: number): Ymdhis {
    this.date.setHours(this.date.getHours() + hours);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  afterMinutes(minutes: number): Ymdhis {
    this.date.setMinutes(this.date.getMinutes() + minutes);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  afterSeconds(seconds: number): Ymdhis {
    this.date.setSeconds(this.date.getSeconds() + seconds);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

  beforeYears(years: number): Ymdhis {
    return this.afterYears(-years);
  }

  beforeMonths(months: number): Ymdhis {
    return this.afterMonths(-months);
  }

  beforeWeeks(weeks: number): Ymdhis {
    return this.afterWeeks(-weeks);
  }

  beforeDays(days: number): Ymdhis {
    return this.afterDays(-days);
  }

  beforeHours(hours: number): Ymdhis {
    return this.afterHours(-hours);
  }

  beforeMinutes(minutes: number): Ymdhis {
    return this.afterMinutes(-minutes);
  }

  beforeSeconds(seconds: number): Ymdhis {
    return this.afterSeconds(-seconds);
  }

  setSeparators(
    dateSeparator: string,
    dateTimeSeparator: string,
    timeSeparator: string
  ) {
    return this.cloneWithUpdateOptions({
      dateSeparator: dateSeparator,
      dateTimeSeparator: dateTimeSeparator,
      timeSeparator: timeSeparator,
    });
  }

  setDateSeparator(separator: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      dateSeparator: separator,
    });
  }

  setTimeSeparator(separator: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      timeSeparator: separator,
    });
  }

  setDateTimeSeparator(separator: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      dateTimeSeparator: separator,
    });
  }

  setAmpmSeparator(separator: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      ampmSeparator: separator,
    });
  }

  setDowSeparator(separator: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      dowSeparator: separator,
    });
  }

  setSuffixes(
    y: string,
    m: string,
    d: string,
    h: string,
    i: string,
    s: string
  ) {
    return this.cloneWithUpdateOptions({
      yearSuffix: y,
      monthSuffix: m,
      daySuffix: d,
      hourSuffix: h,
      minuteSuffix: i,
      secondSuffix: s,
    });
  }

  setYearSuffix(suffix: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      yearSuffix: suffix,
    });
  }

  setMonthSuffix(suffix: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      monthSuffix: suffix,
    });
  }

  setDaySuffix(suffix: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      daySuffix: suffix,
    });
  }

  setHourSuffix(suffix: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      hourSuffix: suffix,
    });
  }

  setMinuteSuffix(suffix: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      minuteSuffix: suffix,
    });
  }

  setSecondSuffix(suffix: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      secondSuffix: suffix,
    });
  }

  setAmNotation(am: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      amNotation: am,
    });
  }

  setPmNotation(pm: string): Ymdhis {
    return this.cloneWithUpdateOptions({
      pmNotation: pm,
    });
  }

  setDowNotations(dowList: string[]): Ymdhis {
    return this.cloneWithUpdateOptions({
      dowNotations: dowList.slice(0, 7),
    });
  }

  setMonthNotations(monthList: string[]): Ymdhis {
    return this.cloneWithUpdateOptions({
      monthNotations: monthList.slice(0, 12),
    });
  }

  setDateNotations(dateList: string[]) {
    return this.cloneWithUpdateOptions({
      dateNotations: dateList.slice(0, 31),
    });
  }

  setYearAsTwoDigits(): Ymdhis {
    return this.cloneWithUpdateOptions({ isYearAsFourDigits: false });
  }

  clearPads() {
    return this.cloneWithUpdateOptions({
      isEnablePaddingYear: false,
      isMonthAsTwoDigits: false,
      isDayAsTwoDigits: false,
      isHourAsTwoDigits: false,
      isMinuteAsTwoDigits: false,
      isSecondAsTwoDigits: false,
    });
  }

  clearDatePad() {
    return this.cloneWithUpdateOptions({
      isEnablePaddingYear: false,
      isMonthAsTwoDigits: false,
      isDayAsTwoDigits: false,
    });
  }

  clearYearPad() {
    return this.cloneWithUpdateOptions({ isEnablePaddingYear: false });
  }
  clearMonthPad() {
    return this.cloneWithUpdateOptions({ isMonthAsTwoDigits: false });
  }
  clearDayPad() {
    return this.cloneWithUpdateOptions({ isDayAsTwoDigits: false });
  }

  clearTimePad() {
    return this.cloneWithUpdateOptions({
      isHourAsTwoDigits: false,
      isMinuteAsTwoDigits: false,
      isSecondAsTwoDigits: false,
    });
  }

  clearHourPad() {
    return this.cloneWithUpdateOptions({ isHourAsTwoDigits: false });
  }
  clearMinutePad() {
    return this.cloneWithUpdateOptions({ isMinuteAsTwoDigits: false });
  }
  clearSecondPad() {
    return this.cloneWithUpdateOptions({ isSecondAsTwoDigits: false });
  }

  clearSeparators() {
    return this.cloneWithUpdateOptions({
      dateSeparator: "",
      dateTimeSeparator: "",
      timeSeparator: "",
      dowSeparator: "",
      ampmSeparator: "",
    });
  }

  clearOptions() {
    return this.cloneWithUpdateOptions({
      dateSeparator: "",
      dateTimeSeparator: "",
      timeSeparator: "",
      dowSeparator: "",
      ampmSeparator: "",
      yearSuffix: "",
      monthSuffix: "",
      daySuffix: "",
      hourSuffix: "",
      minuteSuffix: "",
      secondSuffix: "",
      amNotation: "",
      pmNotation: "",
      monthNotations: null,
      dateNotations: null,
      dowNotations: [],
      isEnablePaddingYear: false,
      isMonthAsTwoDigits: false,
      isDayAsTwoDigits: false,
      isHourAsTwoDigits: false,
      isMinuteAsTwoDigits: false,
      isSecondAsTwoDigits: false,
    });
  }

  toString(): string {
    return this.ymdhis;
  }

  utc(): Ymdhis;

  utc(
    arg1?: number | string | Date,
    m?: number,
    d?: number,
    h?: number,
    i?: number,
    s?: number
  ): Ymdhis;

  utc(): Ymdhis {
    return this.afterMinutes(this.date.getTimezoneOffset());
  }

  initDate(
    y: number,
    m: number,
    d: number,
    h: number,
    i: number,
    s: number
  ): Ymdhis;

  initDate(y: number, m: number, d: number, h: number, i: number): Ymdhis;

  initDate(y: number, m: number, d: number, h: number): Ymdhis;

  initDate(y: number, m: number, d: number): Ymdhis;

  initDate(y: number, m: number): Ymdhis;

  initDate(unixTime: number): Ymdhis;

  initDate(str: string): Ymdhis;

  initDate(date: Date): Ymdhis;

  initDate(): Ymdhis;

  initDate(
    arg1?: number | string | Date,
    m?: number,
    d?: number,
    h?: number,
    i?: number,
    s?: number
  ): Ymdhis {
    return this.cloneWithNewDate(Ymdhis.createDate(arg1, m, d, h, i, s));
  }

  static iso9075toDate(str: string): Date {
    const msg = `Invalid date format: ${str}`;
    if (str.match(/[^\d\s:\-]/)) {
      throw new Error(msg);
    }
    const dt = str.trim().split(" ");
    if (dt.length === 0) {
      throw new Error(msg);
    }
    const d = dt[0].split("-").map((n) => parseInt(n, 10));
    const t =
      dt.length === 1 ? [] : dt[1].split(":").map((n) => parseInt(n, 10));

    d.concat(t).forEach((item) => {
      if (isNaN(item)) {
        throw new Error(msg);
      }
    });
    switch (d.length) {
      case 0:
      case 1:
        throw new Error(msg);
      case 2:
        return new Date(d[0], d[1] - 1);
      case 3:
        switch (t.length) {
          case 0:
            return new Date(d[0], d[1] - 1, d[2]);
          case 1:
            throw new Error(msg);
          case 2:
            return new Date(d[0], d[1] - 1, d[2], t[0], t[1]);
          case 3:
            return new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2]);
          default:
            throw new Error(msg);
        }
      default:
        throw new Error(msg);
    }
  }

  static createDate(
    arg1?: number | string | Date,
    m?: number,
    d?: number,
    h?: number,
    i?: number,
    s?: number
  ): Date {
    switch (typeof arg1) {
      case "undefined":
        return new Date();
      case "string":
        return Ymdhis.iso9075toDate(arg1)
      case "object":
        return new Date(arg1);
      case "number":
        if (typeof m === "undefined") {
          return new Date(arg1);
        } else if (typeof d === "undefined") {
          return new Date(arg1, m - 1);
        } else if (typeof h === "undefined") {
          return new Date(arg1, m - 1, d);
        } else if (typeof i === "undefined") {
          return new Date(arg1, m - 1, d, h);
        } else if (typeof s === "undefined") {
          return new Date(arg1, m - 1, d, h, i);
        } else {
          return new Date(arg1, m - 1, d, h, i, s);
        }
    }
  }

  private cloneWithNewDate(date: Date): Ymdhis {
    return new Ymdhis({
      date: date,
      options: this.options,
    });
  }

  private cloneWithUpdateOptions(options: Partial<Options>): Ymdhis {
    return new Ymdhis({
      date: this.date,
      options: Object.assign(this.options, options),
    });
  }
}

export function ymdhis(
  arg1?: number | string | Date,
  m?: number,
  d?: number,
  h?: number,
  i?: number,
  s?: number
): Ymdhis {
  return new Ymdhis({
    date: Ymdhis.createDate(arg1, m, d, h, i, s),
  });
}
