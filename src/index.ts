interface Props {
    date: Date
    separators?: Separators
    notations?: Notations
    digits?: Digits
}

interface Separators {
    year: string,
    month: string,
    day: string,
    dateTime: string,
    hour: string,
    minute: string,
    second: string
    dow: [string, string]
}

interface Notations {
    am: string,
    pm: string,
    months: string[],
    dates: string[],
    dow: string[],
}

interface Digits {
    isYearAsFourDigits: boolean
    isMonthAsTwoDigits: boolean
    isDayAsTwoDigits: boolean
    isHourAsTwoDigits: boolean
    isMinuteAsTwoDigits: boolean
    isSecondAsTwoDigits: boolean
}

class Ymdhis {

    readonly date: Date;

    private separators: Separators = {
        year: "-",
        month: "-",
        day: "-",
        dateTime: " ",
        hour: ":",
        minute: ":",
        second: ":",
        dow: [" (", ")"],
    }

    private notations: Notations = {
        am: "AM",
        pm: "PM",
        months: [],
        dates: [],
        dow: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    }

    private digits: Digits = {
        isYearAsFourDigits: true,
        isMonthAsTwoDigits: true,
        isDayAsTwoDigits: true,
        isHourAsTwoDigits: true,
        isMinuteAsTwoDigits: true,
        isSecondAsTwoDigits: true,
    }

    constructor(props: Props) {
        this.date = new Date(props.date.getTime());
        if (typeof props.notations !== "undefined") {
            this.notations = Object.assign({}, props.notations);
        }
        if (typeof props.separators !== "undefined") {
            this.separators = Object.assign({}, props.separators);
        }
        if (typeof props.digits !== "undefined") {
            this.digits = Object.assign({}, props.digits);
        }
    }

    get year() { return; }
    get month() { return; }
    get day() { return; }
    get dow() { return; }
    get hour() { return; }
    get minute() { return; }
    get second() { return; }
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
    noPaddingDate() {}
    noPaddingMonth() {}
    noPaddingDay() {}
    noPaddingTime() {}
    noPaddingHours() {}
    noPaddingMinutes() {}
    noPaddingSeconds() {}
    ampmAs() {}

    dowAs(dow: string[]): Ymdhis {
        return this.cloneWithUpdateNotations({dow: dow})
    }

    monthsAs() {}
    datesAs() {}
    yearAsTwoDigits() {}
    setDateReference() {}
    toString() {}

    initDate(date: Date) {
        return new Ymdhis({
            date: date,
            notations: this.notations,
            separators: this.separators,
            digits: this.digits
        })
    }

    private cloneWithUpdateNotations(notations: Partial<Notations>): Ymdhis {
        return new Ymdhis({
            date: this.date,
            notations: Object.assign(this.notations, notations),
            separators: this.separators,
            digits: this.digits
        })
    }

    private cloneWithUpdateSeparators(separators: Partial<Separators>): Ymdhis {
        return new Ymdhis({
            date: this.date,
            notations: this.notations,
            separators: Object.assign(this.separators, separators),
            digits: this.digits
        })
    }

    private cloneWithUpdateDigits(separators: Partial<Digits>): Ymdhis {
        return new Ymdhis({
            date: this.date,
            notations: this.notations,
            separators: Object.assign(this.separators, separators),
            digits: this.digits
        })
    }
}

function ymdhis(date: Date = new Date()): Ymdhis {
    return new Ymdhis({date: date});
}

export default ymdhis;
