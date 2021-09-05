interface CalendarDateType
{
  date : string;
  type : DayType;
};
enum DayType
{
  Normal,
  Summer,
  Weekend,
  EC12,
  EC5,
  TeacherReadiness,
  FederalHoliday,
  DistrictClosed
}
function DayTypeStringToEnum(input : string) : DayType
{
  switch(input)
  {
    case "Normal":
      return DayType.Normal;
    case "Summer":
        return DayType.Summer;
    case "Weekend":
        return DayType.Weekend;
    case "EC12":
        return DayType.EC12;
    case "EC5":
        return DayType.EC5;
    case "TeacherReadiness":
        return DayType.TeacherReadiness;
    case "FederalHoliday":
        return DayType.FederalHoliday;
    case "DistrictClosed":
        return DayType.DistrictClosed;
    default:
        return null;
  }
}
function entry(input : any[], date : any, isEC5 : boolean) : string
{
  var out = Go60Forward(ReadCalendar(input), String(date), isEC5);
  return out;
}
function ReadCalendar(calendar : any[]) : Array<CalendarDateType>
{
  let output_calendar : Array<CalendarDateType> = [];
  for(let i=0; i<calendar.length; i++)
  {
    output_calendar.push({date:calendar[i]["date"],type:DayTypeStringToEnum(calendar[i]["type"])});
  }
  return output_calendar;
}
function PrintCalendar(calendar : Array<CalendarDateType>) : string
{
  let ret : string = "";
  calendar.forEach(element => {
    ret += element.date;
    ret += element.type;
    ret += "\n";
  });
  return ret;
}
function DoWeCountThisDay(day : DayType, isEC5 : boolean)
{    
  switch(day)
  {
    case DayType.Normal:
      return true;
    case DayType.EC5:
      return !isEC5;
    default:
      return false;
  }
}
function Go60Forward(calendar : Array<CalendarDateType>, inputDate : string, isEC5 : boolean) : string
{
  let todayIndex : number = 0;
  for(let i=0; i<calendar.length; i++)
  {
    if(calendar[i].date == inputDate)
    {
      todayIndex = i;
      break;
    }
  }
  let iterator : number = todayIndex+1;
  let fuel : number = 60;
  while(0 < fuel)
  {
    if(DoWeCountThisDay(calendar[iterator].type, isEC5))
    {
      fuel--;
    }
    iterator++;
  }
  return(calendar[iterator].date);
}