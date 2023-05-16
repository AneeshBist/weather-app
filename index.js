const http = require("http");
const fs = require("fs");
const requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
  let temp = tempVal.replace(
    "{%tempval%}",
    (orgVal.main.temp - 273.15).toFixed(2)
  );
  temp = temp.replace(
    "{%tempmin%}",
    (orgVal.main.temp_min - 273.15).toFixed(2)
  );
  temp = temp.replace(
    "{%tempmax%}",
    (orgVal.main.temp_max - 273.15).toFixed(2)
  );
  temp = temp.replace("{%city%}", orgVal.name);
  temp = temp.replace("{%country%}", orgVal.sys.country);
  temp = temp.replace("{%tempstatus%}", orgVal.weather[0]);
  return temp;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      "https://api.openweathermap.org/data/2.5/weather?q=Dehradun,in&appid=219e680aeb5a2cab7cf3cccec33e903e"
    )
      .on("data", (chunk) => {
        const jsonData = JSON.parse(chunk);
        const arrData = [jsonData];
        const realTimeData = arrData
          .map((val) => replaceVal(homeFile, val))
          .join("");
        res.write(realTimeData);
        //console.log(realTimeData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
        //console.log("end");
      });
  }
});

server.listen(8000, "127.0.0.1");
