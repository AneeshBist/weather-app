$(document).ready(function () {
  $("#date").html(getCurrentValues());
  console.log(getCurrentValues());
});

const currDate = document.getAnimations("date");
let weathercon = document.getElementById("weather-ico");

const tempStatus = "Clouds";
let currentTime = new Date();

const getCurrentDay = () => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[currentTime.getDay()];
};

const getCurrentTime = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  var month = months[currentTime.getMonth() + 1];
  var date = currentTime.getDate();
  var year = currentTime.getFullYear();

  var hours = currentTime.getHours();
  var mins = currentTime.getMinutes();

  let periods = "AM";
  if (hours > 11) {
    periods = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }
  if (mins < 10) {
    mins = `0${mins}`;
  }

  return `${month} ${date} | ${hours}:${mins} ${periods}`;
};

const getCurrentValues = () => {
  return getCurrentDay() + " | " + getCurrentTime();
};
