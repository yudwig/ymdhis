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
  monthNotations: string[];
  dateNotations: string[];
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
    monthNotations: [],
    dateNotations: [],
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
    return (
      (this.options.isMonthAsTwoDigits
        ? this.month.toString().padStart(2, "0")
        : this.month.toString()) + this.options.monthSuffix
    );
  }

  get d(): string {
    return (
      (this.options.isDayAsTwoDigits
        ? this.day.toString().padStart(2, "0")
        : this.day.toString()) + this.options.daySuffix
    );
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

  get iso9075() {
    return;
  }
  get iso8601() {
    return;
  }
  get rfc3339() {
    return;
  }

  afterYears() {}
  afterMonths() {}
  afterWeeks() {}
  afterDays() {}
  afterHours() {}
  afterMinutes() {}
  afterSeconds() {}
  beforeYears() {}
  beforeMonths() {}
  beforeWeeks() {}
  beforeDays() {}
  beforeHours() {}
  beforeMinutes() {}
  beforeSeconds() {}

  setDateSeparator(separator: string): Ymdhis {
    return this.cloneWithOptions({
      dateSeparator: separator,
    });
  }

  setTimeSeparator(separator: string): Ymdhis {
    return this.cloneWithOptions({
      timeSeparator: separator,
    });
  }

  setDateTimeSeparator(separator: string): Ymdhis {
    return this.cloneWithOptions({
      dateTimeSeparator: separator,
    });
  }

  setAmpmSeparator(separator: string): Ymdhis {
    return this.cloneWithOptions({
      ampmSeparator: separator,
    });
  }

  setDowSeparator(separator: string): Ymdhis {
    return this.cloneWithOptions({
      dowSeparator: separator,
    });
  }

  setYearSuffix() {}
  setMonthSuffix() {}
  setDaySuffix() {}
  setHourSuffix() {}
  setMinuteSuffix() {}
  setSecondSuffix() {}
  setAmNotation() {}
  setPmNotation() {}

  setDowNotations(dowList: string[]): Ymdhis {
    return this.cloneWithOptions({ dowNotations: dowList });
  }

  setMonthNotations() {}
  setDateNotations() {}

  setYearAsTwoDigits(): Ymdhis {
    return this.cloneWithOptions({ isYearAsFourDigits: false });
  }

  disableDatePadding() {
    return this.cloneWithOptions({
      isEnablePaddingYear: false,
      isMonthAsTwoDigits: false,
      isDayAsTwoDigits: false,
    });
  }

  disableYearPadding() {
    return this.cloneWithOptions({ isEnablePaddingYear: false });
  }
  disableMonthPadding() {
    return this.cloneWithOptions({ isMonthAsTwoDigits: false });
  }
  disableDayPadding() {
    return this.cloneWithOptions({ isDayAsTwoDigits: false });
  }

  disableTimePadding() {
    return this.cloneWithOptions({
      isHourAsTwoDigits: false,
      isMinuteAsTwoDigits: false,
      isSecondAsTwoDigits: false,
    });
  }

  disableHourPadding() {
    return this.cloneWithOptions({ isHourAsTwoDigits: false });
  }
  disableMinutePadding() {
    return this.cloneWithOptions({ isMinuteAsTwoDigits: false });
  }
  disableSecondPadding() {
    return this.cloneWithOptions({ isSecondAsTwoDigits: false });
  }

  toString(): string {
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

  initDate(date: Date) {
    return new Ymdhis({
      date: date,
      options: this.options,
    });
  }

  private cloneWithOptions(options: Partial<Options>): Ymdhis {
    return new Ymdhis({
      date: this.date,
      options: Object.assign(this.options, options),
    });
  }
}

export function ymdhis(date: Date = new Date()): Ymdhis {
  return new Ymdhis({ date: date });
}
