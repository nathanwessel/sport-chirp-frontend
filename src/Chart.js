// new way based on new example (lots of cleanup happened too)

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

import { Component } from 'react';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

async function getTwitterData() {
  let twitterResponse = await fetch('http://localhost:30500/recenttweets/count/minute/clemson');
  twitterResponse = twitterResponse.json();
  console.log('HERE WE ARE: ');
  console.log(twitterResponse);

  const json = JSON.stringify(twitterResponse);
  console.log('The json: ');
  console.log(json);

  return twitterResponse;
}

let outsideVar;

// let tweetDataList = await populateGraphValues().slice();
let tweetDataList = [];


// please delete this:
const someData = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400)
];

const moreData = [];
moreData.push(createData(0, 1500));
moreData.push(createData(1, 1500));
moreData.push(createData(2, 1500));
moreData.push(createData(3, 1500));
moreData.push(createData(4, 1500));
moreData.push(createData(5, 1500));
moreData.push(createData(6, 1500));
moreData.push(createData(7, 1500));

console.log('printing out the data up top: ');
for (let k = 0; k < 8; k++) {
  console.log('row: ' + k);
  console.log(moreData[k]);
}


// START BACK HERE: YOU NEED TO MAKE IT LIKE let twitterDataList = []; twitterDataList = await populateGraphValues();

// let token, user_id;
async function populateGraphValues() {
  if (typeof window !== 'undefined') { 
    outsideVar = await getTwitterData(); 
    console.log('outsideVar.data: ');
    console.log(outsideVar.data[0]);
    console.log(outsideVar.data[0]['start']);
    console.log(outsideVar.data[0]['end']);
    console.log(outsideVar.data[0]['tweet_count']);

    // for the length of the outsideVar
    console.log('outsideVar.data.length: ');
    console.log(outsideVar.data.length);
    let twitterDataList = [];

    for (let i = 0; i < outsideVar.data.length; i++) {
      console.log('tempObj: ');
      console.log(outsideVar.data[0]);

      // var mylist = [];
      // var obj = {};
      // obj["01"] = mylist.label;
      // obj["02"] = mylist.value;
      // mylist.push(obj);

      // create an object to add to the list
      let tempObj = {};
      // tempObj[0] = outsideVar.data[i]['start'];
      // tempObj[1] = outsideVar.data[i]['tweet_count'];

      // var unixtime = Date.parse("24-Nov-2009 17:57:35").getTime()/1000
      // tempObj[outsideVar.data[i]['start']] = outsideVar.data[i]['tweet_count'];
      // Date.parse(outsideVar.data[i]['start']).getTime()/1000
      // START BACK HERE: CONVERT THIS TO UNIX TIME!!!!!!!!!!!!!!!
      console.log('converted time: ');
      let tempVar = 1000;
      // let seconds = outsideVar.data[i]['start'].getTime()/tempVar
      // console.log(seconds);

      console.log('type of time: ');
      let startTimeUnix = new Date(outsideVar.data[i]['start']);
      console.log(typeof(startTimeUnix));

      console.log('nasty datetime: ');
      console.log(startTimeUnix);

      
      let shortDate = outsideVar.data[i]['start'].substring(5,10);
      console.log('nasty datetime truncated: ');
      console.log(shortDate);
      console.log('type of shortDate: ');
      console.log(typeof(shortDate));


      console.log('print it again: ');
      console.log(startTimeUnix.getTime()/1000);

      // tempObj[Date.parse(outsideVar.data[i]['start']).getTime()/1000] = outsideVar.data[i]['tweet_count'];
      // 754,736,700
      // 54,736,820
      let timeKey = startTimeUnix.getTime()/1000 - 1654000000;


      // just trying something: convert i to a time looking thing
      let tempTimeStr = i.toString() + ':00';

      // tempObj[i.toString()] = outsideVar.data[i]['tweet_count'];
      tempObj[tempTimeStr] = outsideVar.data[i]['tweet_count'];

      console.log('the tempObj here: ');
      console.log(tempObj);

      twitterDataList.push(createData(shortDate,outsideVar.data[i]['tweet_count']));

      // add the element to the data list
      // twitterDataList.push(outsideVar.data[i]['start']);
      // IT WAS HERE: twitterDataList.push(tempObj);

      //console.log('twitterDataList after push: ');
      //console.log(twitterDataList[i]);
    }

    return twitterDataList;


  }
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  //createData('21:00', 2400),
  //createData('24:00', undefined),
  //createData(myVar.data[0].end, myVar.data[0].tweet_count),
];
console.log('some data: ');
console.log(data['18:00']);


class LineChartComponent extends Component {
  state = {
    chartData: []
  };

  formatData = (data) =>
    data.map(({ dt_txt, main }) => ({
      // date -> Can be used as dataKey for XAxis
      //Further you can format the date as per your need
      date: dt_txt,
      // temp -> Can be used as dataKey for Line
      temp: main.temp
    }));

  componentDidMount() {
    const fetchData = async () => {
      // // Commenting as getting error while fetching
      // // But here you can have logic of fetching the data and
      // //add listeners etc
      // // let res = await fetch(
      // //   "http://api.openweathermap.org/data/2.5/forecast?q=plovdiv&units=metric&appid=ca148f5dc67f12aafaa56d1878bb6db2#"
      // // );
      // // res = await res.json();

      // //Here i'm using dummy promise to simulate the API call
      // const promise = new Promise((res) => {
      //   setTimeout(() => {
      //     res(weatherData);
      //   }, 500);
      // });
      // const res = await promise;

      // CALL THE API HERE
      let graphValues = await populateGraphValues();


      //After getting the data from the backend,
      //format it as per how the LineChart is expecting
      this.setState({
        chartData: graphValues.slice()
      });
    };
    fetchData();
  }

  render() {
    const { chartData } = this.state;

    // from the thing before
    // const theme = useTheme();
    
    return (
        <React.Fragment>
        <Title>Recent Fan Engagement</Title>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis
              dataKey="time"
              // stroke={theme.palette.text.secondary}
              stroke="#8884d8"
              // style={theme.typography.body2}
            />
            <YAxis
              // stroke={theme.palette.text.secondary}
              stroke="#8884d8"
              // style={theme.typography.body2}
            >
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: 'middle'
                }}
              >
                # of Tweets
              </Label>
            </YAxis>
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="amount"
              // stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}




export default function Chart() {
  const theme = useTheme();

  let aVariable = 'This is a test!';

  console.log('Is this real?');

  console.log('some data: ');
  console.log(data['18:00']);

  return (
    <LineChartComponent theme={theme} />
  );
}