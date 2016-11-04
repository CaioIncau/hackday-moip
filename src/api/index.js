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
		res.json({ version });
	});


	api.get('/createOrder', (req, res) => {
		console.log("Chegou!");
		res.json({ version });
	});	

	api.get('/hash', function(req, res) {
    
    let hash = req.hash;
    let paymentJson = {
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

    let orderJson = {
        "ownId": "84018491",
        "amount": {
            "currency": "BRL",
            "subtotals": {
                "shipping": 200
            }
        },
        "items": [
            {
                "product": "Produto - {{$timestamp}}",
                "quantity": 1,
                "detail": "Mais info...",
                "price": 800
            }
        ],
        "customer": {
            "ownId": "84018491",
            "fullname": "Hamlet Gentil",
            "email": "ryu@labs.moip.com.br",
            "birthDate": "1988-12-30",
            "taxDocument": {
                "type": "CPF",
                "number": "22222222222"
            },
            "phone": {
                "countryCode": "55",
                "areaCode": "11",
                "number": "66778899"
            },
            "shippingAddress": {
                "street": "Avenida Faria Lima",
                "streetNumber": 2927,
                "complement": 8,
                "district": "Itaim",
                "city": "Sao Paulo",
                "state": "SP",
                "country": "BRA",
                "zipCode": "01234000"
            }
        }
    }
    let url = "https://api.moip.com.br/v2/orders/"
    
      request({
        url: url,
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        json: true,
        body: orderJson,
        headers: {
          'Authorization': auth
        }
    }, (error, response, body) => {
        let hash = req.hash;
      console.log(body.id);

      let paymentUrl = "https://api.moip.com.br/v2/orders/" + body.id + "/payments";
      request({
        url: paymentUrl,
          method: "POST",
          contentType: "application/x-www-form-urlencoded",
          json: true,
          body: paymentJson,
          headers: {
            'Authorization': auth
          }
      }, (error, response, body) => {
          console.log(body);
          res.send("response");
      });
          res.send("response");
          return body.id;
      });
	});

	return api;
}
