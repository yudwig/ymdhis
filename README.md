# ymdhis

A date time library for TypeScript / JavaScript.

## Features

* Immutable and chainable modern design.
* Short name accessors instead of format function.
* Easy to convert between UTC and local time.
* Simple and editor-friendly functions.

## Usage

```js
ymdhis(2000, 1, 3, 7, 30).afterYears(10).beforeHours(12).ymd

// 2010-01-02
```

## Installation

* yarn
```bash
yarn add ymdhis
```

* npm
```bash
npm i ymdhis
```

* CDN
```js
<script src='https://cdn.jsdelivr.net/npm/ymdhis/lib/index.min.js'></script>
```

## API

### Accessors

```typescript
// (Timezone offset +08:00)
ymdhis(2000,  1,  2,  3,  4,  5).year        // 2000
ymdhis(2000,  1,  2,  3,  4,  5).month       // 1
ymdhis(2000,  1,  2,  3,  4,  5).day         // 2
ymdhis(2000,  1,  1,  3,  4,  5).dow         // 6
ymdhis(2000,  1,  2,  3,  4,  5).hour        // 3
ymdhis(2000,  1,  2,  3,  4,  5).minute      // 4
ymdhis(2000,  1,  2,  3,  4,  5).second      // 5
ymdhis(2000,  1,  2,  3,  4,  5,  6).ms      // 6
ymdhis(2000,  1,  2, 20,  4,  5).ampmHour    // 8
ymdhis(2000,  1,  2,  3,  4,  5).y           // '2000'
ymdhis(2000,  1,  2,  3,  4,  5).m           // '01'
ymdhis(2000,  1,  2,  3,  4,  5).d           // '02'
ymdhis(2000,  1,  2,  3,  4,  5).h           // '03'
ymdhis(2000,  1,  2,  3,  4,  5).i           // '04'
ymdhis(2000,  1,  2,  3,  4,  5).s           // '05'
ymdhis(2000,  1,  1,  3,  4,  5).w           // 'Saturday'
ymdhis(2000,  1,  2,  3,  4,  5).a           // 'AM'
ymdhis(2000,  1,  2,  3,  4,  5).ym          // '2000-01'
ymdhis(2000,  1,  2,  3,  4,  5).ymd         // '2000-01-02'
ymdhis(2000,  1,  2,  3,  4,  5).ymdhi       // '2000-01-02 03:04'
ymdhis(2000,  1,  2,  3,  4,  5).ymdhis      // '2000-01-02 03:04:05'
ymdhis(2000,  1,  1,  3,  4,  5).ymdw        // '2000-01-01 Saturday'
ymdhis(2000,  1,  1,  3,  4,  5).wymd        // 'Saturday 2000-01-01'
ymdhis(2000,  1,  2,  3,  4,  5).dmy         // '02-01-2000'
ymdhis(2000,  1,  2,  3,  4,  5).dm          // '02-01'
ymdhis(2000,  1,  2,  3,  4,  5).mdy         // '01-02-2000'
ymdhis(2000,  1,  2,  3,  4,  5).md          // '01-02'
ymdhis(2000,  1,  2,  3,  4,  5).hi          // '03:04'
ymdhis(2000,  1,  2,  3,  4,  5).his         // '03:04:05'
ymdhis(2000,  1,  2, 20,  4,  5).hia         // '08:04 PM'
ymdhis(2000,  1,  2, 20,  4,  5).hisa        // '08:04:05 PM'
ymdhis(2000,  1,  2, 20,  4,  5).ahi         // 'PM 08:04'
ymdhis(2000,  1,  2, 20,  4,  5).ahis        // 'PM 08:04:05'
ymdhis(2018,  1,  2,  3,  4,  5).number      // 20180102030405
ymdhis(2000,  1,  2,  3,  4,  5).string      // '2000-01-02 03:04:05'
ymdhis(2000,  1,  1,  0,  0,  0).timestamp   // 946684800000
ymdhis(2000,  1,  2,  3,  4,  5).iso9075     // '2000-01-02 03:04:05'
ymdhis(2000,  1,  2,  3,  4,  5).iso8601     // '2000-01-02T03:04:05.000+08:00'
```


### Time Calculation

```typescript
// (Timezone offset +08:00)
ymdhis(2000,  1,  2,  3,  4,  5).afterYears(10).ymd               // '2010-01-02'
ymdhis(2000,  1,  2,  3,  4,  5).afterMonths(2).ymd               // '2000-03-02'
ymdhis(2000,  1,  2,  3,  4,  5).afterWeeks(1).ymd                // '2000-01-09'
ymdhis(2000,  1,  2,  3,  4,  5).afterDays(3).ymd                 // '2000-01-05'
ymdhis(2000,  1,  2,  3,  4,  5).afterHours(10).string            // '2000-01-02 13:04:05'
ymdhis(2000,  1,  2,  3,  4,  5).afterMinutes(3).string           // '2000-01-02 03:07:05'
ymdhis(2000,  1,  2,  3,  4,  5).afterSeconds(5).string           // '2000-01-02 03:04:10'
ymdhis(2000,  1,  2,  3,  4,  5).afterMilliseconds(25).iso8601    // '2000-01-02T03:04:05.025+08:00'
ymdhis(2000,  1,  2,  3,  4,  5).beforeYears(10).ymd              // '1990-01-02'
ymdhis(2000,  1,  2,  3,  4,  5).beforeMonths(2).ymd              // '1999-11-02'
ymdhis(2000,  1,  2,  3,  4,  5).beforeWeeks(1).ymd               // '1999-12-26'
ymdhis(2000,  1,  2,  3,  4,  5).beforeDays(3).ymd                // '1999-12-30'
ymdhis(2000,  1,  2,  3,  4,  5).beforeHours(4).string            // '2000-01-01 23:04:05'
ymdhis(2000,  1,  2,  3,  4,  5).beforeMinutes(3).string          // '2000-01-02 03:01:05'
ymdhis(2000,  1,  2,  3,  4,  5).beforeSeconds(5).string          // '2000-01-02 03:04:00'
ymdhis(2000,  1,  2,  3,  4,  5).beforeMilliseconds(25).iso8601   // '2000-01-02T03:04:04.975+08:00'
ymdhis(2000,  1,  2,  3,  4,  5).lastOfMonth().ymd                // '2000-01-31'
ymdhis(2000,  1,  2,  3,  4,  5).firstOfMonth().ymd               // '2000-01-01'
```

### Format Change

```typescript
ymdhis(2000,  1,  2,  3,  4,  5).setDateSeparator('/').ymd                          // '2000/01/02'
ymdhis(2000,  1,  2,  3,  4,  5).setTimeSeparator('.').string                       // '2000-01-02 03.04.05'
ymdhis(2000,  1,  2,  3,  4,  5).setDateTimeSeparator('_').string                   // '2000-01-02_03:04:05'
ymdhis(2000,  1,  2,  3,  4,  5).setAmpmSeparator('_').ahi                          // 'AM_03:04'
ymdhis(2000,  1,  1,  3,  4,  5).setDowSeparator('_').wymd                          // 'Saturday_2000-01-01'
ymdhis(2000,  1,  2,  3,  4,  5).setSeparators('/', '_', '.').string                // '2000/01/02_03.04.05'
ymdhis(2000,  1,  2,  3,  4,  5).setYearSuffix('Y').y                               // '2000Y'
ymdhis(2000,  1,  2,  3,  4,  5).setMonthSuffix('M').m                              // '01M'
ymdhis(2000,  1,  2,  3,  4,  5).setDaySuffix('D').d                                // '02D'
ymdhis(2000,  1,  2,  3,  4,  5).setHourSuffix('H').h                               // '03H'
ymdhis(2000,  1,  2,  3,  4,  5).setMinuteSuffix('I').i                             // '04I'
ymdhis(2000,  1,  2,  3,  4,  5).setSecondSuffix('S').s                             // '05S'
ymdhis(2000,  1,  2,  3,  4,  5).setSuffixes('Y', 'M', 'D', 'H', 'I', 'S').string   // '2000Y-01M-02D 03H:04I:05S'
ymdhis(2000,  1,  2,  3,  4,  5).setAmNotation('a.m.').ahi                          // 'a.m. 03:04'
ymdhis(2000,  1,  2, 20,  4,  5).setPmNotation('p.m.').ahi                          // 'p.m. 08:04'
ymdhis(2000,  1,  2,  3,  4,  5).setDowNotations(['Sun.', 'Mon.', 'Tue.']).ymdw     // '2000-01-02 Sun.'
ymdhis(2000,  1,  2,  3,  4,  5).setMonthNotations(['January', 'February']).ymd     // '2000-January-02'
ymdhis(2000,  1,  2,  3,  4,  5).setDayNotations(['1st', '2nd']).ymd                // '2000-01-2nd'
ymdhis(2018,  1,  2,  3,  4,  5).setYearAsTwoDigits().ymd                           // '18-01-02'
ymdhis(2008,  1,  2,  3,  4,  5).clearPaddings().setYearAsTwoDigits().string        // '8-1-2 3:4:5'
ymdhis(2008,  1,  2,  3,  4,  5).clearDatePaddings().setYearAsTwoDigits().string    // '8-1-2 03:04:05'
ymdhis(2008,  1,  2,  3,  4,  5).clearYearPadding().setYearAsTwoDigits().ymd        // '8-01-02'
ymdhis(2008,  1,  2,  3,  4,  5).clearMonthPadding().ymd                            // '2008-1-02'
ymdhis(2008,  1,  2,  3,  4,  5).clearDayPadding().ymd                              // '2008-01-2'
ymdhis(2008,  1,  2,  3,  4,  5).clearTimePaddings().string                         // '2008-01-02 3:4:5'
ymdhis(2008,  1,  2,  3,  4,  5).clearHourPadding().his                             // '3:04:05'
ymdhis(2008,  1,  2,  3,  4,  5).clearMinutePadding().his                           // '03:4:05'
ymdhis(2008,  1,  2,  3,  4,  5).clearSecondPadding().his                           // '03:04:5'
ymdhis(2018,  1,  2,  3,  4,  5).clearSeparators().string                           // '20180102030405'
```

### Initializer

```typescript
// (Timezone offset +08:00)
ymdhis().utc(2000,  1,  2,  3,  4,  5,  6).iso8601          // '2000-01-02T03:04:05.006Z'
ymdhis().utc(2000,  1,  2,  3,  4,  5).string               // '2000-01-02 03:04:05'
ymdhis().utc(2000,  1,  2,  3,  4).string                   // '2000-01-02 03:04:00'
ymdhis().utc(2000,  1,  2,  3).string                       // '2000-01-02 03:00:00'
ymdhis().utc(2000,  1,  2).string                           // '2000-01-02 00:00:00'
ymdhis().utc(2000,  1).string                               // '2000-01-01 00:00:00'
ymdhis().utc(0).string                                      // '1970-01-01 00:00:00'
ymdhis().utc('2000-01-02 12:34:56').string                  // '2000-01-02 12:34:56'
ymdhis().utc(new Date(2000, 0, 2, 10, 4, 5)).string         // '2000-01-02 02:04:05'
ymdhis(2000,  1,  2, 10,  4,  5).utc().string               // '2000-01-02 02:04:05'
ymdhis().local(2000,  1,  2,  3,  4,  5,  6).iso8601        // '2000-01-02T03:04:05.006+08:00'
ymdhis().local(2000,  1,  2,  3,  4,  5).string             // '2000-01-02 03:04:05'
ymdhis().local(2000,  1,  2,  3,  4).string                 // '2000-01-02 03:04:00'
ymdhis().local(2000,  1,  2,  3).string                     // '2000-01-02 03:00:00'
ymdhis().local(2000,  1,  2).string                         // '2000-01-02 00:00:00'
ymdhis().local(2000,  1).string                             // '2000-01-01 00:00:00'
ymdhis().local('2000-01-02 03:04:05').string                // '2000-01-02 03:04:05'
ymdhis().local(new Date(2000,  0,  2,  3,  4,  5)).string   // '2000-01-02 03:04:05'
ymdhis().utc(2000,  1,  2,  3,  4,  5).local().string       // '2000-01-02 11:04:05'
ymdhis(1999,  9,  9).now() > ymdhis(2000,  1,  2)           // true

// From string
ymdhis('2000-01-02 03:04:05').string                        // '2000-01-02 03:04:05'
ymdhis('2000-01-02 03:04').string                           // '2000-01-02 03:04:00'
ymdhis('2000-01-02').string                                 // '2000-01-02 00:00:00'
ymdhis('2000-01').string                                    // '2000-01-01 00:00:00'
ymdhis('999-1-2 3:4:5').string                              // '0999-01-02 03:04:05'
ymdhis().utc('2000-01-02T03:04:05Z').string                 // '2000-01-02 03:04:05'
ymdhis().utc('2000-01-02T03:04:05+02:00').string            // '2000-01-02 01:04:05'
```

## Examples

### Reuse
```typescript
const date = ymdhis().setYearAsTwoDigits();
date.local(2001, 6, 14).dmy                                 // '14-06-01'
date.local(2001, 6, 15).dmy                                 // '15-06-01'
```

### Date format
```typescript
ymdhis(2001, 8, 24).string                                                   // '2001-08-24 00:00:00'
ymdhis(2001, 8, 24).ymd                                                      // '2001-08-24'
ymdhis(2001, 8, 24).setDateSeparator('.').dmy                                // '24.08.2001'
ymdhis(2001, 8, 24).setDateSeparator('/').dmy                                // '24/08/2001'
ymdhis(2001, 8, 24).setYearAsTwoDigits().setDateSeparator('/').dmy           // '24/08/01'
ymdhis(2001, 8, 24).setYearAsTwoDigits().setDateSeparator('-').dmy           // '24-08-01'
ymdhis(2001, 8, 24).setYearAsTwoDigits().mdy                                 // '08-24-01'
ymdhis(2001, 8, 24).clearSeparators().setDateSuffixes('年', '月', '日').ymd   // '2001年08月24日'
```
