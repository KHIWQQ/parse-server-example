import axios from 'axios';

axios.post('http://localhost:1337/parse/functions/addPortfolio', {
  portfolioId: 'portfolio_id_1'
}, {
  headers: {
    'X-Parse-Application-Id': 'WF_Tracker',
    'X-Parse-Master-Key': '1337',
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error);
});
