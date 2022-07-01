import {Request, Response, NextFunction} from 'express';
import axios from 'axios';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    

    try {
        const axiosRes = await axios.get(`${process.env.AUTH_SERVICE_URL}/authorize`, {
            headers: {
                'Authorization': req.headers['authorization'] as any
            }
        })
        
        if (axiosRes.status === 200) {
            console.info(`^^ GOOD TO GO`);
            (req as any).user = axiosRes.data?.context || null; 
            console.log(`@@ user in req`, (req as any).user)
            return next();
        } else {
            return res.status(403).send({error: 'unauthorized'})
        }

    } catch (err) {
        next(err);
    }
}

// {
//     "context": {
//       "nickname": "vnscriptkid",
//       "name": "vnscriptkid@gmail.com",
//       "picture": "https://s.gravatar.com/avatar/95a10fe109a81fccb9166c9dd2765b39?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fvn.png",
//       "updated_at": "2022-06-30T17:33:11.409Z",
//       "email": "vnscriptkid@gmail.com",
//       "email_verified": true,
//       "iss": "https://dev-lbozycin.us.auth0.com/",
//       "sub": "auth0|62bd3f455105461db4ed049b",
//       "aud": "5uDxMMTWDHOrh7u6qYqFe7fdCzCqiIPv",
//       "iat": 1656610391,
//       "exp": 1656646391
//     }
//   }