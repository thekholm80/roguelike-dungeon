const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8000);

app.use(express.static(__dirname + '/dist'));

app.get('*', (request, response) => {
  response.sendFile(__dirname + '/dist/' + 'index.html');
});

// if api is needed, can possibly change react routes to '/app/*'
// and have api route through '/api/*'

app.listen(app.get('port'), () => {
  console.log('Node app is running on port ', app.get('port'));
});
