interface Props {

    date: Date

    separators?: Separators

    notations?: Notations
}

interface Separators {
    year: string,
    month: string,
    day: string,
    dateTime: string,
    hour: string,
    minute: string,
    second: string
}

interface Notations {
    am: string,
    pm: string,
    dow: string[],
    months: string[],
    dates: string[],
    isYearAsTwoDigits: boolean
}

class Ymdhis {

    readonly date: Date;

    private separators: Separators = {
        dateTime: "",
        day: "",
        hour: "",
        minute: "",
        month: "",
        second: "",
        year: ""
    }

    private notations: Notations = {
        am: "AM",
        pm: "PM",
        dow: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        months: [],
        dates: [],
        isYearAsTwoDigits: false
    }

    constructor(props: Props) {
        this.date = new Date(props.date.getTime());
        if (typeof props.notations !== "undefined") {
            this.notations = Object.assign({}, props.notations);
        }
        if (typeof props.separators !== "undefined") {
            this.separators = Object.assign({}, props.separators);
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
    toString() {}

    initDate(date: Date) {
        return new Ymdhis({
            date: date,
            notations: this.notations,
            separators: this.separators
        })
    }

    private cloneWithUpdateNotations(notations: Partial<Notations>): Ymdhis {
        return new Ymdhis({
            date: this.date,
            notations: Object.assign(this.notations, notations),
            separators: this.separators
        })
    }

    private cloneWithUpdateSeparators(separators: Partial<Separators>): Ymdhis {
        return new Ymdhis({
            date: this.date,
            notations: this.notations,
            separators: Object.assign(this.separators, separators)
        })
    }
}

function ymdhis(date: Date = new Date()): Ymdhis {
    return new Ymdhis({date: date});
}

export default ymdhis;
