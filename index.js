//any string reverse function 
function reverseStr(str) {
    var listOfChar = str.split('');
    var reverseListOfChar = listOfChar.reverse();
    var ReversedStr = reverseListOfChar.join('');
    return ReversedStr;
}
// console.log(reverseStr('24-2-20000'));
// console.log(isPalindrome('24-2-20000'));
// console.log(isPalindrome('lol'));

function isPalindrome(str) {
    var reverseString = reverseStr(str);
    // if(str===reverseString)
    // {
    //     return true;
    // }
    // else{
    //     return false;
    // }
    return str === reverseString;
}

//date reverse function 
function convertDateToStr(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };
    if (date.day < 10) {
        dateStr.day = '0' + date.day; //append 0 to day for having 2 digit number 
    } else {
        dateStr.day = date.day.toString(); //to convert string
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month; //append 0 to day for having 2 digit number 
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}
var date = {
    day: 31,
    month: 12,
    year: 2021,

}
// console.log(getAllDataFormToString(date));

function getAllDataFormToString(date) {
    var dateStr = convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    //slice will return the last two digits of year
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormat(date) {
    var listofPalindrome = getAllDataFormToString(date);
    var flag = false;
    for (var i = 0; i < listofPalindrome.length; i++) {
        if (isPalindrome(listofPalindrome[i])) {
            flag = true;
            break;
        }
    }
    return flag;
};
// console.log(checkPalindromeForAllDateFormat(date));

function leapyear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}
// console.log(leapyear(2020));
//how to acheieve the next date . this function increment the date by one 
//nothing to do with main code
function getNextDate(date) {
    var day = date.day + 1;  //date in increased
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
   if(month===2)//if month is feb check leapyear or not
   {
       if(leapyear(year))
       {
           if(day>29)
           {
               day=1;
               month++;
           }
       }
       else{
           if(day>28)
           {
               day=1;
               month++;
           }
       }
   }
else {  //for other month increament if the day >month array
    if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;

    }
}
if(month>12) //if dec then it may go to 13 14 for that we increment the year and set month to 1
{
    month=1;
    year++;
}
return { // return the increment date
    day:day,
    month:month,
    year:year,
}
}
// console.log(getNextDate(date));

function getNextPalindromeDte(date) {
var count=0; //counter to keep track by how many days the persom missed
var nextDate=getNextDate(date); // to get next date
while(1)
{
    count++;   
    var isPalindrome=checkPalindromeForAllDateFormat(nextDate); //check if nextdate is palindrome or not 
    if(isPalindrome){
        break;            //if yes break the loop
    }
    nextDate=getNextDate(nextDate);   //if not set ser nextdate to new date we got by increment and check again 
}
return [count,nextDate];
}
// console.log(getNextPalindromeDte(date));

var input=document.getElementById("bday-input");
var btn=document.getElementById("show-btn");
var result=document.getElementById("output");
function clickHandler(e)
{
    
     var bdayStr=input.value;
     if(bdayStr!=='')
     {
         var listOfDate=(bdayStr.split('-'));
         var date={
             day:Number(listOfDate[2]),
             month:Number(listOfDate[1]),
             year:Number(listOfDate[0]),
         }
        
       var isPalindrome=checkPalindromeForAllDateFormat(date);
      if(isPalindrome)
      {
          result.innerHTML="Yes ! Your birthday is  Palindrome";
      }
      else{
          var [count , nextdate]=getNextPalindromeDte(date);
          result.innerHTML="Your birthday is not Palindrome "+"<br> The next palindrome date is "+nextdate.day+"-"+nextdate.month+"-"+nextdate.year+" you missed by "+count+"days";
      }
     }
}
btn.addEventListener('click',clickHandler);