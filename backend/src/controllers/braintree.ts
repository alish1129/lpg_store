import userModel from '../models/user';
import braintree from 'braintree';


const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY!,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY!,
    merchantId: process.env.BRAINTREE_MERCHANT_ID!
})

export default class BrainTreeController {


    generateToken(req: any, res: any) {
        gateway.clientToken.generate({})
        .then(response => {
            const clientToken = response.clientToken
            res.status(200).send(clientToken)
          }).catch(err =>  res.status(500).send(err))
    }
   

}