interface Props {
  date: Date;
  options?: Options;
}

interface Options {
  // Separators
  yearSeparator: string;
  monthSeparator: string;
  daySeparator: string;
  dateTimeSeparator: string;
  hourSeparator: string;
  minuteSeparator: string;
  secondSeparator: string;
  dowSeparators: [string, string];

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
    yearSeparator: "-",
    monthSeparator: "-",
    daySeparator: "-",
    dateTimeSeparator: " ",
    hourSeparator: ":",
    minuteSeparator: ":",
    secondSeparator: ":",
    dowSeparators: [" (", ")"],

    // Notations
    amNotation: "AM",
    pmNotation: "PM",
    monthNotations: [],
    dateNotations: [],
    dowNotations: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
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
    return this.date.getHours() % 12;
  }

  get y(): string {
    if (this.options.isYearAsFourDigits) {
      return this.date.getFullYear().toString();
    } else {
      return this.options.isEnablePaddingYear
        ? this.date.getFullYear().toString().slice(-2).padStart(2, "0")
        : parseInt(this.date.getFullYear().toString().slice(-2), 10).toString();
    }
  }

  get m() {
    return this.options.isMonthAsTwoDigits
      ? this.month.toString().padStart(2, "0")
      : this.month.toString();
  }

  get d() {
    return this.options.isDayAsTwoDigits
      ? this.day.toString().padStart(2, "0")
      : this.day.toString();
  }

  get h() {
    return this.options.isHourAsTwoDigits
      ? this.hour.toString().padStart(2, "0")
      : this.hour.toString();
  }

  get i() {
    return this.options.isMinuteAsTwoDigits
      ? this.minute.toString().padStart(2, "0")
      : this.minute.toString();
  }

  get s() {
    return this.options.isSecondAsTwoDigits
      ? this.second.toString().padStart(2, "0")
      : this.second.toString();
  }

  get w() {
    return;
  }
  get a() {
    return;
  }
  get ymd() {
    return;
  }
  get ymdhi() {
    return;
  }
  get ymdw() {
    return;
  }
  get wymd() {
    return;
  }
  get dmy() {
    return;
  }
  get dm() {
    return;
  }
  get mdy() {
    return;
  }
  get md() {
    return;
  }
  get hi() {
    return;
  }
  get his() {
    return;
  }
  get hia() {
    return;
  }
  get hisa() {
    return;
  }
  get ahi() {
    return;
  }
  get ahis() {
    return;
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
  separateDateBy() {}
  separateTimeBy() {}
  separateDateTimeBy() {}
  separateItemsBy() {}
  encloseDowIn() {}
  ampmAs() {}

  dowAs(dowList: string[]): Ymdhis {
    return this.cloneWithOptions({ dowNotations: dowList });
  }

  monthsAs() {}
  datesAs() {}
  noPaddingDate() {
    return this.cloneWithOptions({
      isEnablePaddingYear: false,
      isMonthAsTwoDigits: false,
      isDayAsTwoDigits: false,
    });
  }
  yearAsTwoDigits(): Ymdhis {
    return this.cloneWithOptions({ isYearAsFourDigits: false });
  }
  noPaddingYear() {
    return this.cloneWithOptions({ isEnablePaddingYear: false });
  }
  noPaddingMonth() {
    return this.cloneWithOptions({ isMonthAsTwoDigits: false });
  }
  noPaddingDay() {
    return this.cloneWithOptions({ isDayAsTwoDigits: false });
  }
  noPaddingTime() {
    return this.cloneWithOptions({
      isHourAsTwoDigits: false,
      isMinuteAsTwoDigits: false,
      isSecondAsTwoDigits: false,
    });
  }
  noPaddingHours() {
    return this.cloneWithOptions({ isHourAsTwoDigits: false });
  }
  noPaddingMinutes() {
    return this.cloneWithOptions({ isMinuteAsTwoDigits: false });
  }
  noPaddingSeconds() {
    return this.cloneWithOptions({ isSecondAsTwoDigits: false });
  }

  toString(): string {
    return (
      this.y +
      this.options.yearSeparator +
      this.m +
      this.options.monthSeparator +
      this.d +
      this.options.daySeparator +
      this.options.dateTimeSeparator +
      this.h +
      this.options.hourSeparator +
      this.i +
      this.options.minuteSeparator +
      this.s +
      this.options.secondSeparator
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
