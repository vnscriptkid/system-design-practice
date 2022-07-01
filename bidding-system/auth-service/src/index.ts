import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config()

const app = express();

// By default, API Gateway authorizations are cached (TTL) for 300 seconds.
// This policy will authorize all requests to the same API Gateway instance where the
// request is coming from, thus being efficient and optimising costs.
const generatePolicy = (principalId: string, /* methodArn: string*/) => {
  // const apiGatewayWildcard = methodArn.split('/', 2).join('/') + '/*';

  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          // Resource: apiGatewayWildcard,
        },
      ],
    },
  };
};

app.get('/authorize', (req: express.Request, res: express.Response) => {
    if (!req.headers.authorization) {
      console.error(`!! auth header missing`);
      return res.status(403).json({error: 'auth header missing'})
    }
    
    const token = req.headers.authorization.replace('Bearer ', '');

    try {
      const claims = jwt.verify(token, process.env.AUTH0_PUBLIC_KEY as any);
      const policy = generatePolicy(claims.sub as string/*, event.methodArn*/);
  
      // return {
      //   ...policy,
      //   context: claims
      // };

      return res.send({ context: claims })
    } catch (error) {
      console.error(`!! unauthorized`, error);
      return res.status(403).json({error: 'unauthorized'})
    }
})

const port = process.env.PORT || 8501;
app.listen(port, () => {
  console.log(`[AuthService] server is listening on port ${port}`)
})