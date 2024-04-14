const axios = require("axios");
axios
  .get("https://catfact.ninja/fact")
  .then((response) => console.log(response.data.fact));

axios.post("https://tecweb-js.insper-comp.com.br/token", {
    username: "andersonsfj"
}, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }).then((resposta) => {
    console.log(resposta);
  });

axios.get("https://tecweb-js.insper-comp.com.br/exercicio", {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZGVyc29uc2ZqIiwidGVudGF0aXZhIjozLCJpYXQiOjE3MTI4MDAxODQsImV4cCI6MTcxMjgwMDI0NH0.ATETpx-Z4-xk0lE2GRFM9QsjTq4tiwLGNbKKRksDH2w'
    },
  }).then((retorno) => {
    console.log(retorno);
  });

// axios.post("https://tecweb-js.insper-comp.com.br/exercicio/SLUG", {
//     username: "andersonsfj"
// }, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//   }).then((resposta) => {
//     console.log(resposta);
//   });