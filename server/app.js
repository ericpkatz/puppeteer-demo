const express = require('express');
const app = express();
app.use(express.urlencoded());

const home = ({ secret })=> `
  <html>
    <body>
      <h1>Hello World</h1>
      ${ secret ? `<div id="secret">${secret}</div>` : ''}
      <form method='POST' action='/'>
        <input name='secret'>
        <button>submit</button>
      </form>
    </body>
    <script>
      const div = document.querySelector('#secret'); 
      if(div){
        div.innerHTML = div.innerHTML.toUpperCase();
      }
    </script>
  </html>
`;
app.get('/', (req, res, next)=> res.send(home({})));
app.post('/', (req, res, next)=> res.send(home(req.body)));

module.exports = app;
