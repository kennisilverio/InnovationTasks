const express = require('express');
const parser = require('body-parser');
const app = express();
const axios = require('axios');
//helper function for operations
var getResult = (data) => {
    if (data.operation === 'remainder'){
        return data.left % data.right;
    };
    if (data.operation === 'subtraction'){
        return data.left - data.right;
    };
    if (data.operation === 'addition'){
        return data.left + data.right;
    };
    if (data.operation === 'multiplication'){
        return data.left * data.right;
    };
    if (data.operation === 'division'){
        return data.left / data.right;
    };
}

//   ---- trying to implement continuous get and post request but receiving error from resetting the headers multiple times on the express server. Might be best to run the following call using AJAX instead of axios along with jQuery.
// var executeRequest = () => {
//     axios.get('https://interview.adpeai.com/api/v1/get-task')
//     .then(({data}) => {
//         var result = getResult(data);
//         axios.post('https://interview.adpeai.com/api/v1/submit-task', {
//             id: data.id,
//             result: result
//         })
//         .then((response) => {
//             if (response.status === 200){
//                 return res.status(200).send(`${response.data}!! ${data.id} : The result of ${data.left} and ${data.right} using the operation ${data.operation} equals ${result}.`)
//             }
//             else if (response.status === 400){
//                 console.log('Incorrect value in result; no ID specified; value is invalid.')
//                 // return res.status(400).end()
//             }
//             else if (response.status === 500){
//                 console.log('ID cannot be found.')
//                 // return res.status(500).end()
//             }
//         })
//         .catch(err => console.log(err, 'this is error in post request to API'))
//     })
//     .catch(err => console.log(err, 'this is error in get request to API'))
//     setInterval(executeRequest, 3000);
// }


app.get('/', (req, res) => {
        axios.get('https://interview.adpeai.com/api/v1/get-task')
        .then(({data}) => {
            var result = getResult(data);
            axios.post('https://interview.adpeai.com/api/v1/submit-task', {
                id: data.id,
                result: result
            })
            .then((response) => {
                if (response.status === 200){
                    return res.status(200).send(`${response.data}!! ${data.id} : The result of ${data.left} and ${data.right} using the operation ${data.operation} equals ${result}.`)
                }
                else if (response.status === 400){
                    console.log('Incorrect value in result; no ID specified; value is invalid.')
                    // return res.status(400).end()
                }
                else if (response.status === 500){
                    console.log('ID cannot be found.')
                    // return res.status(500).end()
                }
            })
            .catch(err => console.log(err, 'this is error in post request to API'))
        })
        .catch(err => console.log(err, 'this is error in get request to API'))
});



app.listen(8000, () => {
    console.log('Listening on Port 8000');
});