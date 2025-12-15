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
- POST /request/review/accepted/:requestID
- POST /request/review/rejected/:requestId

## useRouter
- GET /user/connections
- GET /user/request
- GET /user/feed - Gets you profiles of other users on platform

Status: ignore, interasted, accepted, rejected


