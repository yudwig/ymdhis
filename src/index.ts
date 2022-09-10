interface Props {

    date: Date

    dateSeparator?: string

    timeSeparator?: string

    dateTimeSeparator?: string
}

class Ymdhis {

    private date: Date;

    private dateSeparator: string;

    private timeSeparator: string;

    private dateTimeSeparator: string;

    constructor(props: Props) {
        this.date = props.date;
        this.dateSeparator = props.dateSeparator || "-";
        this.timeSeparator = props.timeSeparator || ":";
        this.dateTimeSeparator = props.dateTimeSeparator || " ";
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
    initDate() {}
    ampmAs() {}
    dowAs() {}
    monthsAs() {}
    datesAs() {}
    yearAsTwoDigits() {}
    toString() {}
}

function ymdhis(date: Date = new Date()): Ymdhis {
    return new Ymdhis({date: date});
}

export default ymdhis;
