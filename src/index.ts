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

    init() {
    }

    get year() {
        return;
    }
    get month() {
        return;
    }
    get day() {
        return;
    }
    get dow() {
        return;
    }
    get hour() {
        return;
    }
    get minute() {
        return;
    }
    get second() {
        return;
    }
    get ymd() {
        return;
    }
    get ymdhi() {
        return;
    }
    get hi() {
        return;
    }
    get his() {
        return;
    }
    get number() {
        return;
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

    separateDate() {
    }

    separateTime() {
    }

    separateDateTime() {
    }

    noPaddingDate() {
    }

    toString() {
    }

    afterYears() {
    }

    afterMonths() {
    }

    afterDays() {
    }

    afterWeeks() {
    }

    afterHours() {
    }

    afterMinutes() {
    }

    afterSeconds() {
    }

    beforeYears() {
    }

    beforeMonths() {
    }

    beforeDays() {
    }

    beforeWeeks() {
    }

    beforeHours() {
    }

    beforeMinutes() {
    }

    beforeSeconds() {
    }

}

function ymdhis(date: Date = new Date()): Ymdhis {
    return new Ymdhis({date: date});
}

export default ymdhis;
