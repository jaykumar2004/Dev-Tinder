# DevTinder Apis

## auth router
- POST /signup
- POST /login
- POST /logout


## profile router
- GET /profile/view 
- PATCH /profile/edit
- PATCH /profile/password //forgot password

## connecton Request Router
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId


## user router
- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profiles of other users on platform

# Status : 
- Ignore, Interested, Accepted, Rejected
