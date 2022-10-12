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

  constructor(props: Props) {
    this.date = newDateWithValidate(props.date.getTime());
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

  get ms(): number {
    return this.date.getMilliseconds();
  }

  get ampmHour(): number {
    return this.date.getHours() % 12 > 0 ? this.date.getHours() % 12 : 12;
  }

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
        ? this.ampmHour.toString().padStart(2, "0")
        : this.ampmHour.toString()) + this.options.hourSuffix
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

  get string(): string {
    return this.toString();
  }

  get timestamp(): number {
    return this.date.getTime() - this.date.getTimezoneOffset() * 60 * 1000;
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
      (this.options.isUtc
        ? "Z"
        : offsetMinutesToTzd(-this.date.getTimezoneOffset()))
    );
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

  afterMilliseconds(ms: number): Ymdhis {
    this.date.setMilliseconds(this.date.getMilliseconds() + ms);
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

  beforeMillisecond(ms: number): Ymdhis {
    return this.afterMilliseconds(-ms);
  }

  lastOfMonth(): Ymdhis {
    return this.afterMonths(1).firstOfMonth().beforeDays(1);
  }

  firstOfMonth(): Ymdhis {
    this.date.setDate(1);
    return new Ymdhis({
      date: this.date,
      options: this.options,
    });
  }

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

  setDayNotations(dayList: string[]): Ymdhis {
    return this.cloneWithUpdateOptions({
      dayNotations: dayList.slice(0, 31),
    });
  }

  setYearAsTwoDigits(): Ymdhis {
    return this.cloneWithUpdateOptions({ isYearAsFourDigits: false });
  }

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

  clearDatePaddings(): Ymdhis {
    return this.cloneWithUpdateOptions({
      isEnablePaddingYear: false,
      isMonthAsTwoDigits: false,
      isDayAsTwoDigits: false,
    });
  }

  clearYearPadding(): Ymdhis {
    return this.cloneWithUpdateOptions({ isEnablePaddingYear: false });
  }
  clearMonthPadding(): Ymdhis {
    return this.cloneWithUpdateOptions({ isMonthAsTwoDigits: false });
  }
  clearDayPadding(): Ymdhis {
    return this.cloneWithUpdateOptions({ isDayAsTwoDigits: false });
  }

  clearTimePaddings(): Ymdhis {
    return this.cloneWithUpdateOptions({
      isHourAsTwoDigits: false,
      isMinuteAsTwoDigits: false,
      isSecondAsTwoDigits: false,
    });
  }

  clearHourPadding(): Ymdhis {
    return this.cloneWithUpdateOptions({ isHourAsTwoDigits: false });
  }

  clearMinutePadding(): Ymdhis {
    return this.cloneWithUpdateOptions({ isMinuteAsTwoDigits: false });
  }

  clearSecondPadding(): Ymdhis {
    return this.cloneWithUpdateOptions({ isSecondAsTwoDigits: false });
  }

  clearSeparators(): Ymdhis {
    return this.cloneWithUpdateOptions({
      dateSeparator: "",
      dateTimeSeparator: "",
      timeSeparator: "",
      dowSeparator: "",
      ampmSeparator: "",
    });
  }

  toString(): string {
    return this.ymdhis;
  }

  valueOf(): number {
    return this.timestamp;
  }

  utc(
    y: number,
    m: number,
    d: number,
    h: number,
    i: number,
    s: number,
    ms: number
  ): Ymdhis;

  utc(y: number, m: number, d: number, h: number, i: number, s: number): Ymdhis;

  utc(y: number, m: number, d: number, h: number, i: number): Ymdhis;

  utc(y: number, m: number, d: number, h: number): Ymdhis;

  utc(y: number, m: number, d: number): Ymdhis;

  utc(y: number, m: number): Ymdhis;

  utc(timestamp: number): Ymdhis;

  utc(str: string): Ymdhis;

  utc(date: Date): Ymdhis;

  utc(): Ymdhis;

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
        return this.cloneWithNewDate(iso9075toDate(arg1));
      case "object":
        this.options.isUtc = false;
        return this.cloneWithNewDate(newDateWithValidate(arg1.getTime())).utc();
      case "number":
        // create from timestamp
        if (typeof m === "undefined") {
          this.options.isUtc = false;
          return this.cloneWithNewDate(newDateWithValidate(arg1)).utc();
        }
        this.options.isUtc = true;
        return this.cloneWithNewDate(numbersToDate(arg1, m, d, h, i, s, ms));
    }
  }

  local(
    y: number,
    m: number,
    d: number,
    h: number,
    i: number,
    s: number,
    ms: number
  ): Ymdhis;

  local(
    y: number,
    m: number,
    d: number,
    h: number,
    i: number,
    s: number
  ): Ymdhis;

  local(y: number, m: number, d: number, h: number, i: number): Ymdhis;

  local(y: number, m: number, d: number, h: number): Ymdhis;

  local(y: number, m: number, d: number): Ymdhis;

  local(y: number, m: number): Ymdhis;

  local(str: string): Ymdhis;

  local(date: Date): Ymdhis;

  local(): Ymdhis;

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
    return this.cloneWithNewDate(createLocalDate(arg1, m, d, h, i, s, ms));
  }

  now(): Ymdhis {
    return this.cloneWithNewDate(newDateWithValidate());
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

function extractIso9075(str: string): string[] {
  const msg = `Invalid date format: ${str}`;
  if (str.match(/[^\d\s.:-]/)) {
    throw new Error(msg);
  }
  const dt = str.trim().split(" ");
  if (dt.length > 2) {
    throw new Error(msg);
  }
  const res: string[] = [];

  // extract y-m-d
  const ymd = dt[0].match(/^(\d{1,4})-(\d{1,2})(-(\d{1,2}))?$/);
  if (!ymd) {
    throw new Error(msg);
  }
  res.push(ymd[1], ymd[2]);
  if (ymd[4] !== undefined) {
    res.push(ymd[4]);
  }
  if (dt.length === 1) {
    return res;
  }
  // extract ms
  const tm = dt[1].split(".");
  if (tm.length > 2) {
    throw new Error(msg);
  }
  // extract h:i:s
  const his = tm[0].match(/^(\d{1,2}):(\d{1,2})(:(\d{1,2}))?$/);
  if (!his) {
    throw new Error(msg);
  }
  res.push(his[1], his[2]);
  if (his[4] !== undefined) {
    res.push(his[4]);
  }
  if (tm.length === 1) {
    return res;
  }
  // check ms
  if (tm[1].match(/^\d{1,3}$/)) {
    res.push(tm[1]);
    return res;
  } else {
    throw new Error(msg);
  }
}

function iso9075toDate(str: string): Date {
  const msg = `Invalid date format: ${str}`;
  const nums = extractIso9075(str).map((s) => parseInt(s, 10));
  if (nums.some((n) => isNaN(n))) {
    // istanbul ignore next
    throw new Error(msg);
  }
  switch (nums.length) {
    case 2:
      return numbersToDate(nums[0], nums[1]);
    case 3:
      return numbersToDate(nums[0], nums[1], nums[2]);
    case 5:
      return numbersToDate(nums[0], nums[1], nums[2], nums[3], nums[4]);
    case 6:
      return numbersToDate(
        nums[0],
        nums[1],
        nums[2],
        nums[3],
        nums[4],
        nums[5]
      );
    case 7:
      return numbersToDate(
        nums[0],
        nums[1],
        nums[2],
        nums[3],
        nums[4],
        nums[5],
        nums[6]
      );
    default:
      // istanbul ignore next
      throw new Error(msg);
  }
}

function validateDateRange(dt: Date): void {
  if (dt.getFullYear() < 0 || dt.getFullYear() > 9999) {
    throw new Error(`Out of range. date: ${dt.toString()}`);
  }
}

function validateDateItems(
  y: number,
  m?: number,
  d?: number,
  h?: number,
  i?: number,
  s?: number,
  ms?: number
): void {
  if (y < 0 || y > 9999) {
    throw new Error(`Invalid year: ${y}`);
  }
  if (typeof m !== "undefined") {
    if (m < 1 || m > 12) {
      throw new Error(`Invalid month: ${m}`);
    }
  }
  if (typeof d !== "undefined") {
    if (d < 1 || d > 31) {
      throw new Error(`Invalid day: ${d}`);
    }
  }
  if (typeof h !== "undefined") {
    if (h < 0 || h > 23) {
      throw new Error(`Invalid hour: ${h}`);
    }
  }
  if (typeof i !== "undefined") {
    if (i < 0 || i > 59) {
      throw new Error(`Invalid minute: ${h}`);
    }
  }
  if (typeof s !== "undefined") {
    if (s < 0 || s > 59) {
      throw new Error(`Invalid second: ${s}`);
    }
  }
  if (typeof ms !== "undefined") {
    if (ms < 0 || ms > 999) {
      throw new Error(`Invalid Millisecond: ${ms}`);
    }
  }
}

function numbersToDate(
  arg1: number,
  m: number,
  d?: number,
  h?: number,
  i?: number,
  s?: number,
  ms?: number
): Date {
  validateDateItems(arg1, m, d, h, i, s, ms);
  const date = new Date(0, 1, 1, 0, 0, 0, 0);
  date.setFullYear(arg1);
  if (typeof d === "undefined") {
    date.setMonth(m - 1);
  } else if (typeof h === "undefined") {
    date.setMonth(m - 1);
    date.setDate(d);
  } else if (typeof i === "undefined") {
    date.setMonth(m - 1);
    date.setDate(d);
    date.setHours(h);
  } else if (typeof s === "undefined") {
    date.setMonth(m - 1);
    date.setDate(d);
    date.setHours(h);
    date.setMinutes(i);
  } else if (typeof ms === "undefined") {
    date.setMonth(m - 1);
    date.setDate(d);
    date.setHours(h);
    date.setMinutes(i);
    date.setSeconds(s);
  } else {
    date.setMonth(m - 1);
    date.setDate(d);
    date.setHours(h);
    date.setMinutes(i);
    date.setSeconds(s);
    date.setMilliseconds(ms);
  }
  validateDateRange(date);
  return date;
}

function newDateWithValidate(): Date;

function newDateWithValidate(timestamp: number): Date;

function newDateWithValidate(timestamp?: number): Date {
  let date: Date;
  if (typeof timestamp === "undefined") {
    date = new Date();
  } else {
    date = new Date(timestamp);
  }
  validateDateRange(date);
  return date;
}

function createLocalDate(
  arg1?: number | string | Date,
  m?: number,
  d?: number,
  h?: number,
  i?: number,
  s?: number,
  ms?: number
): Date {
  switch (typeof arg1) {
    case "undefined":
      return newDateWithValidate();
    case "string":
      return iso9075toDate(arg1);
    case "object":
      return newDateWithValidate(arg1.getTime());
    case "number":
      // istanbul ignore next
      if (typeof m === "undefined") {
        throw new Error("Invalid arguments. Input month.");
      }
      return numbersToDate(arg1, m, d, h, i, s, ms);
  }
}

function offsetMinutesToTzd(i: number): string {
  return (
    (i < 0 ? "-" : "+") +
    Math.floor(Math.abs(i) / 60)
      .toString()
      .padStart(2, "0") +
    ":" +
    (Math.abs(i) % 60).toString().padStart(2, "0")
  );
}

export function ymdhis(
  y: number,
  m: number,
  d: number,
  h: number,
  i: number,
  s: number,
  ms: number
): Ymdhis;

export function ymdhis(
  y: number,
  m: number,
  d: number,
  h: number,
  i: number,
  s: number
): Ymdhis;

export function ymdhis(
  y: number,
  m: number,
  d: number,
  h: number,
  i: number
): Ymdhis;

export function ymdhis(y: number, m: number, d: number, h: number): Ymdhis;

export function ymdhis(y: number, m: number, d: number): Ymdhis;

export function ymdhis(y: number, m: number): Ymdhis;

export function ymdhis(str: string): Ymdhis;

export function ymdhis(date: Date): Ymdhis;

export function ymdhis(): Ymdhis;

export function ymdhis(
  arg1?: number | string | Date,
  m?: number,
  d?: number,
  h?: number,
  i?: number,
  s?: number,
  ms?: number
): Ymdhis {
  return new Ymdhis({
    date: createLocalDate(arg1, m, d, h, i, s, ms),
  });
}
