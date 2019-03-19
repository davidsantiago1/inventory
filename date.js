//DATE FORMATTING
let currentDay = new Date();
let mm = (currentDay.getMonth() + 1);
let dd = currentDay.getUTCDate();

if(mm < 10){
  mm = '0' + mm;
}
if(dd < 10){
  dd = '0' + dd;
}
const date = currentDay.getFullYear()+'-'+ mm +'-'+ dd;
