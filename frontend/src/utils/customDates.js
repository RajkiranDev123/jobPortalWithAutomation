// today
const timeElapsed = Date.now();
const tdobj = new Date(timeElapsed);
const tdstr = tdobj.toISOString().split("T")[0] + "--" + tdobj.toISOString().split("T")[0];
export let todayDate = tdstr


//yesterday
let date = new Date();
date.setDate(date.getDate() - 1)
var yes = date.toISOString().split("T")[0] + "--" + date.toISOString().split("T")[0];
export let yesterdayDate = yes

// first day of the current month
var d = new Date();
var fd = new Date(d.getFullYear(), d.getMonth(), 2).toISOString().split("T")[0] + "--" + tdobj.toISOString().split("T")[0];
export let thisMonthDate = fd


var weekStart = new Date();
weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Monday
var thisWeek = weekStart.toISOString().split("T")[0] + "--" + tdobj.toISOString().split("T")[0];
export let thisWeekDate = thisWeek;


var firstDayLastMonth = new Date(d.getFullYear(), d.getMonth() - 1, 1);
var lastDayLastMonth = new Date(d.getFullYear(), d.getMonth(), 0); // last day of previous month
var lastMonthDate = firstDayLastMonth.toISOString().split("T")[0] + "--" + lastDayLastMonth.toISOString().split("T")[0];
export let lastMonthDateRange = lastMonthDate;