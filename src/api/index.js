import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import request from 'request';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		console.log("Chegou!");
		res.json({ version });
	});


	api.post('/hash', function(req, res) {
	    let hash = req.hash;
	    let myJSONObject = {
		  "installmentCount": 1,
		  "fundingInstrument": {
		    "method": "CREDIT_CARD",
		    "creditCard": {
		        "hash": hash,
		      "holder": {
		        "fullname": "Jose Portador da Silva",
		        "birthdate": "1988-12-30",
		        "taxDocument": {
		          "type": "CPF",
		          "number": "33333333333"
		        },
		        "phone": {
		          "countryCode": "55",
		          "areaCode": "11",
		          "number": "66778899"
		        }
		      }
		    }
		  }
		}

	    let url = "https://api.moip.com.br/v2/orders/" + orderId + "/payments?token=" + token;
	    request({
		    url: url,
		    method: "POST",
		    contentType: "application/x-www-form-urlencoded",
		    json: true,
		    body: myJSONObject
		}, (error, response, body) => {
		    console.log(response);
		    res.send("response");
		});
	});

	return api;
}
