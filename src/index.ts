interface Props {
    date: Date
    options?: Options
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
        dowNotations: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

        // Digits
        isYearAsFourDigits: true,
        isEnablePaddingYear: true,
        isMonthAsTwoDigits: true,
        isDayAsTwoDigits: true,
        isHourAsTwoDigits: true,
        isMinuteAsTwoDigits: true,
        isSecondAsTwoDigits: true,
    }

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

    get dow() {
        return this.date.getDay();
    }

    get hour() {
        return this.date.getHours();
    }

    get minute() {
        return this.date.getMinutes();
    }

    get second() {
        return this.date.getSeconds();
    }

    get ampm() { return; }
    get y() { return; }
    get m() { return; }
    get d() { return; }
    get h() { return; }
    get i() { return; }
    get s() { return; }
    get w() { return; }
    get a() { return; }
    get ymd() { return; }
    get ymdhi() { return; }
    get ymdw() { return; }
    get wymd() { return; }
    get dmy() { return; }
    get dm() { return; }
    get mdy() { return; }
    get md() { return; }
    get hi() { return; }
    get his() { return; }
    get hia() { return; }
    get hisa() { return; }
    get ahi() { return; }
    get ahis() { return; }
    get number() { return; }
    get iso9075() { return; }
    get iso8601() { return; }
    get rfc3339() { return; }

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
    noPaddingYear() {}
    noPaddingDate() {}
    noPaddingMonth() {}
    noPaddingDay() {}
    noPaddingTime() {}
    noPaddingHours() {}
    noPaddingMinutes() {}
    noPaddingSeconds() {}
    ampmAs() {}

    dowAs(dowList: string[]): Ymdhis {
        return this.cloneWithOptions({dowNotations: dowList})
    }

    monthsAs() {}
    datesAs() {}
    yearAsTwoDigits() {}
    toString() {}

    initDate(date: Date) {
        return new Ymdhis({
            date: date,
            options: this.options
        })
    }

    private cloneWithOptions(options: Partial<Options>): Ymdhis {
        return new Ymdhis({
            date: this.date,
            options: Object.assign(this.options, options)
        })
    }
}

function ymdhis(date: Date = new Date()): Ymdhis {
    return new Ymdhis({date: date});
}

export default ymdhis;
