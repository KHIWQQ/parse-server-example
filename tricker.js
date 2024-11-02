import axios from 'axios';

axios
  .post(
    'http://localhost:1337/parse/functions/addPortfolio',
    {
      portfolioId: 'portfolio_id_1',
    },
    {
      headers: {
        'X-Parse-Application-Id': 'WF_Tracker',
        'X-Parse-Master-Key': '1337',
        'Content-Type': 'application/json',
      },
    }
  )
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });



//   curl -X GET \
// -H "X-Parse-Application-Id: WF_Tracker" \
// -H "X-Parse-Master-Key: 1337" \
// -H "X-Parse-Session-Token: r:d4b669e23ffb3221e7596323e74a048c" \
// -H "Content-Type: application/json" \
// http://localhost:1337/parse/users/me


// curl -X GET \
// -H "X-Parse-Application-Id: WF_Tracker" \
// -H "X-Parse-Master-Key: 1337" \
// -H "Content-Type: application/json" \
// -d '{
//   "username": "admin",
//   "password": "admin"
// }' \
// http://localhost:1337/parse/login


// curl -X POST \
// -H "X-Parse-Application-Id: WF_Tracker" \
// -H "X-Parse-Master-Key: 1337" \
// -H "X-Parse-Session-Token: r:d4b669e23ffb3221e7596323e74a048c" \
// -H "Content-Type: application/json" \
// -d '{"name":"My Authenticated Portfolio"}' \
// http://localhost:1337/parse/functions/createPortfolio
