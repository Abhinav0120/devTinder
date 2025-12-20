# DevTinder Api's

## authRouter
- POST /signup
- POST /login
- POST /logut

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userID
- POST /request/review/:status/:requestID

## useRouter
- GET /user/connections
- GET /user/request/recieved
- GET /user/feed - Gets you profiles of other users on platform

Status: ignore, interasted, accepted, rejected


