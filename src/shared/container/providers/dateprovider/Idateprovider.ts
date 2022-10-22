

interface Idateprovider{
    compareInHours(start_date:Date, end_date:Date):number
    convertToUtc(date:Date):string
    dateNow():Date
    compareInDays(start_date:Date,end_date:Date):number
    addDays(days:number):Date
    addHours(hours:number):Date
    compareInBefore(start_date:Date, end_date:Date):boolean
}
export{Idateprovider}