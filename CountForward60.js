const DayType = 
{
  Normal: "Normal",
  Summer: "Summer",
  Weekend: "Weekend",
  EC12: "EC12",
  EC5: "EC5",
  TeacherReadiness: "TeacherReadiness",
  FederalHoliday: "FederalHoliday",
  DistrictClosed: "DistrictClosed"
}

function Go60Forward(input, isEC5)
{
    // The value of `month` must be incremented,
    // because it ranges in (0,11)
    let month = input.getUTCMonth() + 1;
    let myday = input.getUTCDate();
    let year = input.getUTCFullYear();

    let myDate = month + "/" + myday + "/" + year;

    let startIndex = FindStartDay(myDate);
    if(startIndex == "not found")
    {
      return "Date Not Found (possibly formatted incorrectly)";
    }
    let iterator = startIndex + 1;

    let fuel = 60;
    while(0 < fuel)
    {
      if(iterator == 0)
      {
        iterator = 365;
      }
      let thisDayType = GetDayType(iterator);
      if(ShouldWeSkipThisDay(iterator, isEC5))
      {
        iterator++;
        continue;
      }
      else
      {
        iterator++;
        fuel--;
      }
    }
    return GetDateString(iterator);
}

function GetDayType(index)
{
  return Object.values(calendar[index])[0];
}
function GetDateString(index)
{
  return Object.keys(calendar[index])[0];
}

function FindStartDay(dateString)
{
  for(let i=1; i<=365; i++)
  {
    let dateObject = calendar[i];
    let dayType = dateObject[dateString];
    if(dayType != null)
    {
      return i;
    }
  }
  return "not found";
}

function ShouldWeSkipThisDay(index, isEC5)
{    
  switch(GetDayType(index))
  {
    case DayType.Normal:
      return false;
    case DayType.Weekend:
      return true;
    case DayType.EC12:
      return true;
    case DayType.EC5:
      return isEC5;
    case DayType.TeacherReadiness:
      return true;
    case DayType.FederalHoliday:
      return true;
    case DayType.DistrictClosed:
      return true;
  }
}

var calendar =
{
  1:{"7/1/2021":DayType.Normal},
  2:{"7/2/2021":DayType.Normal},
  3:{"7/3/2021":DayType.Weekend},
  4:{"7/4/2021":DayType.Weekend},
  5:{"7/5/2021":DayType.DistrictClosed},
  6:{"7/6/2021":DayType.Normal},
  7:{"7/7/2021":DayType.Normal},
  8:{"7/8/2021":DayType.Normal},
  9:{"7/9/2021":DayType.Normal},
  10:{"7/10/2021":DayType.Weekend},
  11:{"7/11/2021":DayType.Weekend},
  12:{"7/12/2021":DayType.Normal},
  13:{"7/13/2021":DayType.Normal},
  14:{"7/14/2021":DayType.Normal},
  15:{"7/15/2021":DayType.Normal},
  16:{"7/16/2021":DayType.Normal},
  17:{"7/17/2021":DayType.Weekend},
  18:{"7/18/2021":DayType.Weekend},
  19:{"7/19/2021":DayType.Normal},
  20:{"7/20/2021":DayType.Normal},
  21:{"7/21/2021":DayType.Normal},
  22:{"7/22/2021":DayType.Normal},
  23:{"7/23/2021":DayType.Normal},
  24:{"7/24/2021":DayType.Weekend},
  25:{"7/25/2021":DayType.Weekend},
  26:{"7/26/2021":DayType.Normal},
  27:{"7/27/2021":DayType.Normal},
  28:{"7/28/2021":DayType.Normal},
  29:{"7/29/2021":DayType.Normal},
  30:{"7/30/2021":DayType.Normal},
  31:{"7/31/2021":DayType.Weekend},
  32:{"8/1/2021":DayType.Weekend},
  33:{"8/2/2021":DayType.TeacherReadiness},
  34:{"8/3/2021":DayType.TeacherReadiness},
  35:{"8/4/2021":DayType.TeacherReadiness},
  36:{"8/5/2021":DayType.TeacherReadiness},
  37:{"8/6/2021":DayType.Normal},
  38:{"8/7/2021":DayType.Weekend},
  39:{"8/8/2021":DayType.Weekend},
  40:{"8/9/2021":DayType.Normal},
  41:{"8/10/2021":DayType.Normal},
  42:{"8/11/2021":DayType.TeacherReadiness},
  43:{"8/12/2021":DayType.TeacherReadiness},
  44:{"8/13/2021":DayType.TeacherReadiness},
  45:{"8/14/2021":DayType.Weekend},
  46:{"8/15/2021":DayType.Weekend},
  47:{"8/16/2021":DayType.TeacherReadiness},
  48:{"8/17/2021":DayType.TeacherReadiness},
  49:{"8/18/2021":DayType.Normal},
  50:{"8/19/2021":DayType.Normal},
  51:{"8/20/2021":DayType.Normal},
  52:{"8/21/2021":DayType.Weekend},
  53:{"8/22/2021":DayType.Weekend},
  54:{"8/23/2021":DayType.Normal},
  55:{"8/24/2021":DayType.Normal},
  56:{"8/25/2021":DayType.Normal},
  57:{"8/26/2021":DayType.Normal},
  58:{"8/27/2021":DayType.Normal},
  59:{"8/28/2021":DayType.Weekend},
  60:{"8/29/2021":DayType.Weekend},
  61:{"8/30/2021":DayType.Normal},
  62:{"8/31/2021":DayType.Normal},
  63:{"9/1/2021":DayType.Normal},
  64:{"9/2/2021":DayType.Normal},
  65:{"9/3/2021":DayType.Normal},
  66:{"9/4/2021":DayType.Weekend},
  67:{"9/5/2021":DayType.Weekend},
  68:{"9/6/2021":DayType.DistrictClosed},
  69:{"9/7/2021":DayType.Normal},
  70:{"9/8/2021":DayType.Normal},
  71:{"9/9/2021":DayType.Normal},
  72:{"9/10/2021":DayType.Normal},
  73:{"9/11/2021":DayType.Weekend},
  74:{"9/12/2021":DayType.Weekend},
  75:{"9/13/2021":DayType.Normal},
  76:{"9/14/2021":DayType.Normal},
  77:{"9/15/2021":DayType.Normal},
  78:{"9/16/2021":DayType.Normal},
  79:{"9/17/2021":DayType.Normal},
  80:{"9/18/2021":DayType.Weekend},
  81:{"9/19/2021":DayType.Weekend},
  82:{"9/20/2021":DayType.Normal},
  83:{"9/21/2021":DayType.Normal},
  84:{"9/22/2021":DayType.Normal},
  85:{"9/23/2021":DayType.Normal},
  86:{"9/24/2021":DayType.Normal},
  87:{"9/25/2021":DayType.Weekend},
  88:{"9/26/2021":DayType.Weekend},
  89:{"9/27/2021":DayType.Normal},
  90:{"9/28/2021":DayType.Normal},
  91:{"9/29/2021":DayType.Normal},
  92:{"9/30/2021":DayType.Normal},
  93:{"10/1/2021":DayType.Normal},
  94:{"10/2/2021":DayType.Weekend},
  95:{"10/3/2021":DayType.Weekend},
  96:{"10/4/2021":DayType.Normal},
  97:{"10/5/2021":DayType.Normal},
  98:{"10/6/2021":DayType.Normal},
  99:{"10/7/2021":DayType.Normal},
  100:{"10/8/2021":DayType.Normal},
  101:{"10/9/2021":DayType.Weekend},
  102:{"10/10/2021":DayType.Weekend},
  103:{"10/11/2021":DayType.Normal},
  104:{"10/12/2021":DayType.Normal},
  105:{"10/13/2021":DayType.Normal},
  106:{"10/14/2021":DayType.Normal},
  107:{"10/15/2021":DayType.EC12},
  108:{"10/16/2021":DayType.Weekend},
  109:{"10/17/2021":DayType.Weekend},
  110:{"10/18/2021":DayType.Normal},
  111:{"10/19/2021":DayType.Normal},
  112:{"10/20/2021":DayType.Normal},
  113:{"10/21/2021":DayType.EC12},
  114:{"10/22/2021":DayType.EC12},
  115:{"10/23/2021":DayType.Weekend},
  116:{"10/24/2021":DayType.Weekend},
  117:{"10/25/2021":DayType.EC12},
  118:{"10/26/2021":DayType.Normal},
  119:{"10/27/2021":DayType.Normal},
  120:{"10/28/2021":DayType.Normal},
  121:{"10/29/2021":DayType.Normal},
  122:{"10/30/2021":DayType.Weekend},
  123:{"10/31/2021":DayType.Weekend},
  124:{"11/1/2021":DayType.Normal},
  125:{"11/2/2021":DayType.Normal},
  126:{"11/3/2021":DayType.Normal},
  127:{"11/4/2021":DayType.Normal},
  128:{"11/5/2021":DayType.Normal},
  129:{"11/6/2021":DayType.Weekend},
  130:{"11/7/2021":DayType.Weekend},
  131:{"11/8/2021":DayType.Normal},
  132:{"11/9/2021":DayType.Normal},
  133:{"11/10/2021":DayType.Normal},
  134:{"11/11/2021":DayType.Normal},
  135:{"11/12/2021":DayType.Normal},
  136:{"11/13/2021":DayType.Weekend},
  137:{"11/14/2021":DayType.Weekend},
  138:{"11/15/2021":DayType.Normal},
  139:{"11/16/2021":DayType.Normal},
  140:{"11/17/2021":DayType.Normal},
  141:{"11/18/2021":DayType.Normal},
  142:{"11/19/2021":DayType.Normal},
  143:{"11/20/2021":DayType.Weekend},
  144:{"11/21/2021":DayType.Weekend},
  145:{"11/22/2021":DayType.Normal},
  146:{"11/23/2021":DayType.Normal},
  147:{"11/24/2021":DayType.EC12},
  148:{"11/25/2021":DayType.DistrictClosed},
  149:{"11/26/2021":DayType.DistrictClosed},
  150:{"11/27/2021":DayType.Weekend},
  151:{"11/28/2021":DayType.Weekend},
  152:{"11/29/2021":DayType.Normal},
  153:{"11/30/2021":DayType.Normal},
  154:{"12/1/2021":DayType.Normal},
  155:{"12/2/2021":DayType.Normal},
  156:{"12/3/2021":DayType.Normal},
  157:{"12/4/2021":DayType.Weekend},
  158:{"12/5/2021":DayType.Weekend},
  159:{"12/6/2021":DayType.Normal},
  160:{"12/7/2021":DayType.Normal},
  161:{"12/8/2021":DayType.Normal},
  162:{"12/9/2021":DayType.Normal},
  163:{"12/10/2021":DayType.Normal},
  164:{"12/11/2021":DayType.Weekend},
  165:{"12/12/2021":DayType.Weekend},
  166:{"12/13/2021":DayType.Normal},
  167:{"12/14/2021":DayType.Normal},
  168:{"12/15/2021":DayType.Normal},
  169:{"12/16/2021":DayType.Normal},
  170:{"12/17/2021":DayType.Normal},
  171:{"12/18/2021":DayType.Weekend},
  172:{"12/19/2021":DayType.Weekend},
  173:{"12/20/2021":DayType.Normal},
  174:{"12/21/2021":DayType.EC5},
  175:{"12/22/2021":DayType.EC12},
  176:{"12/23/2021":DayType.DistrictClosed},
  177:{"12/24/2021":DayType.DistrictClosed},
  178:{"12/25/2021":DayType.FederalHoliday},
  179:{"12/26/2021":DayType.Weekend},
  180:{"12/27/2021":DayType.EC12},
  181:{"12/28/2021":DayType.EC12},
  182:{"12/29/2021":DayType.EC12},
  183:{"12/30/2021":DayType.EC12},
  184:{"12/31/2021":DayType.DistrictClosed},
  185:{"1/1/2022":DayType.FederalHoliday},
  186:{"1/2/2022":DayType.Weekend},
  187:{"1/3/2022":DayType.EC12},
  188:{"1/4/2022":DayType.EC12},
  189:{"1/5/2022":DayType.EC12},
  190:{"1/6/2022":DayType.Normal},
  191:{"1/7/2022":DayType.Normal},
  192:{"1/8/2022":DayType.Weekend},
  193:{"1/9/2022":DayType.Weekend},
  194:{"1/10/2022":DayType.Normal},
  195:{"1/11/2022":DayType.Normal},
  196:{"1/12/2022":DayType.Normal},
  197:{"1/13/2022":DayType.Normal},
  198:{"1/14/2022":DayType.Normal},
  199:{"1/15/2022":DayType.Weekend},
  200:{"1/16/2022":DayType.Weekend},
  201:{"1/17/2022":DayType.DistrictClosed},
  202:{"1/18/2022":DayType.Normal},
  203:{"1/19/2022":DayType.Normal},
  204:{"1/20/2022":DayType.Normal},
  205:{"1/21/2022":DayType.Normal},
  206:{"1/22/2022":DayType.Weekend},
  207:{"1/23/2022":DayType.Weekend},
  208:{"1/24/2022":DayType.Normal},
  209:{"1/25/2022":DayType.Normal},
  210:{"1/26/2022":DayType.Normal},
  211:{"1/27/2022":DayType.Normal},
  212:{"1/28/2022":DayType.Normal},
  213:{"1/29/2022":DayType.Weekend},
  214:{"1/30/2022":DayType.Weekend},
  215:{"1/31/2022":DayType.Normal},
  216:{"2/1/2022":DayType.Normal},
  217:{"2/2/2022":DayType.Normal},
  218:{"2/3/2022":DayType.Normal},
  219:{"2/4/2022":DayType.Normal},
  220:{"2/5/2022":DayType.Weekend},
  221:{"2/6/2022":DayType.Weekend},
  222:{"2/7/2022":DayType.EC5},
  223:{"2/8/2022":DayType.Normal},
  224:{"2/9/2022":DayType.Normal},
  225:{"2/10/2022":DayType.Normal},
  226:{"2/11/2022":DayType.Normal},
  227:{"2/12/2022":DayType.Weekend},
  228:{"2/13/2022":DayType.Weekend},
  229:{"2/14/2022":DayType.Normal},
  230:{"2/15/2022":DayType.Normal},
  231:{"2/16/2022":DayType.Normal},
  232:{"2/17/2022":DayType.Normal},
  233:{"2/18/2022":DayType.Normal},
  234:{"2/19/2022":DayType.Weekend},
  235:{"2/20/2022":DayType.Weekend},
  236:{"2/21/2022":DayType.Normal},
  237:{"2/22/2022":DayType.Normal},
  238:{"2/23/2022":DayType.Normal},
  239:{"2/24/2022":DayType.Normal},
  240:{"2/25/2022":DayType.Normal},
  241:{"2/26/2022":DayType.Weekend},
  242:{"2/27/2022":DayType.Weekend},
  243:{"2/28/2022":DayType.Normal},
  244:{"3/1/2022":DayType.Normal},
  245:{"3/2/2022":DayType.Normal},
  246:{"3/3/2022":DayType.Normal},
  247:{"3/4/2022":DayType.EC12},
  248:{"3/5/2022":DayType.Weekend},
  249:{"3/6/2022":DayType.Weekend},
  250:{"3/7/2022":DayType.Normal},
  251:{"3/8/2022":DayType.Normal},
  252:{"3/9/2022":DayType.Normal},
  253:{"3/10/2022":DayType.EC5},
  254:{"3/11/2022":DayType.EC12},
  255:{"3/12/2022":DayType.Weekend},
  256:{"3/13/2022":DayType.Weekend},
  257:{"3/14/2022":DayType.EC12},
  258:{"3/15/2022":DayType.EC12},
  259:{"3/16/2022":DayType.EC12},
  260:{"3/17/2022":DayType.EC12},
  261:{"3/18/2022":DayType.DistrictClosed},
  262:{"3/19/2022":DayType.Weekend},
  263:{"3/20/2022":DayType.Weekend},
  264:{"3/21/2022":DayType.Normal},
  265:{"3/22/2022":DayType.Normal},
  266:{"3/23/2022":DayType.Normal},
  267:{"3/24/2022":DayType.Normal},
  268:{"3/25/2022":DayType.Normal},
  269:{"3/26/2022":DayType.Weekend},
  270:{"3/27/2022":DayType.Weekend},
  271:{"3/28/2022":DayType.Normal},
  272:{"3/29/2022":DayType.Normal},
  273:{"3/30/2022":DayType.Normal},
  274:{"3/31/2022":DayType.Normal},
  275:{"4/1/2022":DayType.Normal},
  276:{"4/2/2022":DayType.Weekend},
  277:{"4/3/2022":DayType.Weekend},
  278:{"4/4/2022":DayType.Normal},
  279:{"4/5/2022":DayType.Normal},
  280:{"4/6/2022":DayType.Normal},
  281:{"4/7/2022":DayType.Normal},
  282:{"4/8/2022":DayType.Normal},
  283:{"4/9/2022":DayType.Weekend},
  284:{"4/10/2022":DayType.Weekend},
  285:{"4/11/2022":DayType.Normal},
  286:{"4/12/2022":DayType.Normal},
  287:{"4/13/2022":DayType.Normal},
  288:{"4/14/2022":DayType.EC5},
  289:{"4/15/2022":DayType.EC12},
  290:{"4/16/2022":DayType.Weekend},
  291:{"4/17/2022":DayType.Weekend},
  292:{"4/18/2022":DayType.EC12},
  293:{"4/19/2022":DayType.Normal},
  294:{"4/20/2022":DayType.Normal},
  295:{"4/21/2022":DayType.Normal},
  296:{"4/22/2022":DayType.Normal},
  297:{"4/23/2022":DayType.Weekend},
  298:{"4/24/2022":DayType.Weekend},
  299:{"4/25/2022":DayType.Normal},
  300:{"4/26/2022":DayType.Normal},
  301:{"4/27/2022":DayType.Normal},
  302:{"4/28/2022":DayType.Normal},
  303:{"4/29/2022":DayType.Normal},
  304:{"4/30/2022":DayType.Weekend},
  305:{"5/1/2022":DayType.Weekend},
  306:{"5/2/2022":DayType.Normal},
  307:{"5/3/2022":DayType.Normal},
  308:{"5/4/2022":DayType.Normal},
  309:{"5/5/2022":DayType.Normal},
  310:{"5/6/2022":DayType.Normal},
  311:{"5/7/2022":DayType.Weekend},
  312:{"5/8/2022":DayType.Weekend},
  313:{"5/9/2022":DayType.Normal},
  314:{"5/10/2022":DayType.Normal},
  315:{"5/11/2022":DayType.Normal},
  316:{"5/12/2022":DayType.Normal},
  317:{"5/13/2022":DayType.Normal},
  318:{"5/14/2022":DayType.Weekend},
  319:{"5/15/2022":DayType.Weekend},
  320:{"5/16/2022":DayType.Normal},
  321:{"5/17/2022":DayType.Normal},
  322:{"5/18/2022":DayType.Normal},
  323:{"5/19/2022":DayType.Normal},
  324:{"5/20/2022":DayType.Normal},
  325:{"5/21/2022":DayType.Weekend},
  326:{"5/22/2022":DayType.Weekend},
  327:{"5/23/2022":DayType.Normal},
  328:{"5/24/2022":DayType.Normal},
  329:{"5/25/2022":DayType.Normal},
  330:{"5/26/2022":DayType.EC12},
  331:{"5/27/2022":DayType.Normal},
  332:{"5/28/2022":DayType.Weekend},
  333:{"5/29/2022":DayType.Weekend},
  334:{"5/30/2022":DayType.DistrictClosed},
  335:{"5/31/2022":DayType.Weekend},
  336:{"6/1/2022":DayType.Normal},
  337:{"6/2/2022":DayType.Normal},
  338:{"6/3/2022":DayType.Normal},
  339:{"6/4/2022":DayType.Weekend},
  340:{"6/5/2022":DayType.Weekend},
  341:{"6/6/2022":DayType.Normal},
  342:{"6/7/2022":DayType.Normal},
  343:{"6/8/2022":DayType.Normal},
  344:{"6/9/2022":DayType.Normal},
  345:{"6/10/2022":DayType.Normal},
  346:{"6/11/2022":DayType.Weekend},
  347:{"6/12/2022":DayType.Weekend},
  348:{"6/13/2022":DayType.Normal},
  349:{"6/14/2022":DayType.Normal},
  350:{"6/15/2022":DayType.Normal},
  351:{"6/16/2022":DayType.Normal},
  352:{"6/17/2022":DayType.Normal},
  353:{"6/18/2022":DayType.Weekend},
  354:{"6/19/2022":DayType.Weekend},
  355:{"6/20/2022":DayType.Normal},
  356:{"6/21/2022":DayType.Normal},
  357:{"6/22/2022":DayType.Normal},
  358:{"6/23/2022":DayType.Normal},
  359:{"6/24/2022":DayType.Normal},
  360:{"6/25/2022":DayType.Weekend},
  361:{"6/26/2022":DayType.Weekend},
  362:{"6/27/2022":DayType.Normal},
  363:{"6/28/2022":DayType.Normal},
  364:{"6/29/2022":DayType.Normal},
  365:{"6/30/2022":DayType.Normal}
};


