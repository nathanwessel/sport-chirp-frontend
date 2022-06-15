import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

async function getTwitterData() {
  let twitterResponse = await fetch('http://localhost:9000/recenttweets/count/yesterday/clemson');
  twitterResponse = twitterResponse.json();
  console.log('HERE WE ARE IN Deposits: ');
  console.log(twitterResponse);

  const json = JSON.stringify(twitterResponse);
  console.log('The json: ');
  console.log(json);

  return twitterResponse;
}


async function populateTweetTotal() {
  let tweetResponse = await getTwitterData();

  // get just the number
}





class DepositsComponent extends Component {
  state = {
    tweetTotal: null
  };

  componentDidMount() {
    const fetchData = async () => {
      

      // CALL THE API HERE
      let retVal = await populateTweetTotal();


      //After getting the data from the backend,
      //format it as per how the LineChart is expecting
      this.setState({
        chartData: retVal
      });
    };
    fetchData();
  }

  render() {
    const { yesterdayTweetTotal } = this.state;

    // from the thing before
    // const theme = useTheme();
    
    return (
        // the return stuff
        <React.Fragment>
          <Title>Recent Tweets</Title>
          <Typography component="p" variant="h4">
            $3,024.00
            NUMBER GOES HERE
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {/*There used to be text here: On July 24, 2019*/}
            Yesterday
          </Typography>
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              {/*There used to be text here: Link*/}
            </Link>
          </div>
        </React.Fragment>
    );
  }
}










export default function Deposits() {

  return (
    <DepositsComponent theme={theme} />
  );





  return (
    <React.Fragment>
      <Title>Recent Tweets</Title>
      <Typography component="p" variant="h4">
        $3,024.00
        NUMBER GOES HERE
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {/*There used to be text here: On July 24, 2019*/}
        Yesterday
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {/*There used to be text here: Link*/}
        </Link>
      </div>
    </React.Fragment>
  );
}
