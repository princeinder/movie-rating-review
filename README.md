# Movie Rating and Review

## Install

    npm install

## Run  app in development mode

    npm run dev

##Run  app in production mode

    npm run prod

### Request- User signup

`POST /api/user/signup`

   curl -i -H 'Accept: application/json' -d 'username=testuser&email=testuser@gmail.com' http://localhost:5000/api/user/signup

### Response

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 42
ETag: W/"2a-nMoFx54+czTntmSLXl3mqIsZV4A"
Date: Sat, 21 Nov 2020 17:18:55 GMT
Connection: keep-alive


    {"message":"User registered successfully"}


### Request -Add new movie

`POST /api/movie/add`

   curl -i -H 'Accept: application/json' -d 'title=Avenger' http://localhost:5000/api/movie/add

### Response

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-/vp9Xi4nqbGbDZkiS0EiFgh0n30"
Date: Sat, 21 Nov 2020 17:23:32 GMT
Connection: keep-alive


{"message":"Movie added successfully"}



### Request -Add movie review

`POST /api/movie/review/add`

   curl -i -H 'Accept: application/json' -d 'movie={movieid}&user={userid}&rating=2.5&comment=nice' http://localhost:5000/api/movie/review/add

### Response

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-/vp9Xi4nqbGbDZkiS0EiFgh0n30"
Date: Sat, 21 Nov 2020 17:23:32 GMT
Connection: keep-alive


{"message":"Thanks for your response"}


### Request -Listing all the movies(sorting + pagination)

`GET /api/movie/get`

   curl -i -H 'Accept: application/json'  http://localhost:5000/api/movie/get?page=1&limit=10&sort=-1

### Response

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-/vp9Xi4nqbGbDZkiS0EiFgh0n30"
Date: Sat, 21 Nov 2020 17:23:32 GMT
Connection: keep-alive



[
    {
        "_id": "5fb93df622b0b526dff41104",
        "title": "Inception",
        "__v": 0,
        "ratingsAvg": 2.5,
        "ratingsQty": 2,
        "reviews": [
            {
                "_id": "5fb93e1622b0b526dff41106",
                "movie": "5fb93df622b0b526dff41104",
                "user": {
                    "_id": "5fb93a2a690a72229e533031",
                    "username": "Inder",
                    "email": "test@gmail.com"
                },
                "rating": 2.5,
                "comment": "test",
                "createdAt": "2020-11-21T16:19:34.715Z",
                "__v": 0
            },
            {
                "_id": "5fb93e9d22b0b526dff4110c",
                "movie": "5fb93df622b0b526dff41104",
                "user": {
                    "_id": "5fb93e7a22b0b526dff4110a",
                    "username": "testinder",
                    "email": "test123@gmail.com"
                },
                "rating": 2.5,
                "comment": "test",
                "createdAt": "2020-11-21T16:21:49.153Z",
                "__v": 0
            }
        ]
    },
    {
        "_id": "5fb9398268721b215a8793b6",
        "title": "Avengers",
        "__v": 0,
        "ratingsAvg": 2.5,
        "ratingsQty": 1,
        "reviews": [
            {
                "_id": "5fb93dbe22b0b526dff41102",
                "movie": "5fb9398268721b215a8793b6",
                "user": {
                    "_id": "5fb93a2a690a72229e533031",
                    "username": "Inder",
                    "email": "test@gmail.com"
                },
                "rating": 2.5,
                "comment": "test",
                "createdAt": "2020-11-21T16:18:06.084Z",
                "__v": 0
            }
        ]
    },
    {
        "_id": "5fb94d14c06074336caa4d8a",
        "title": "Avenger=",
        "__v": 0,
        "reviews": []
    }
]



### Request -getting the specific  movie(sorting + pagination)

`GET /api/movie/get/{movieid}`

   curl -i -H 'Accept: application/json'  http://localhost:5000/api/movie/get/5fb93df622b0b526dff41104?page=1&limit=10&sort=1

### Response

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-/vp9Xi4nqbGbDZkiS0EiFgh0n30"
Date: Sat, 21 Nov 2020 17:23:32 GMT
Connection: keep-alive



{
    "_id": "5fb93df622b0b526dff41104",
    "title": "Inception",
    "__v": 0,
    "ratingsAvg": 2.5,
    "ratingsQty": 2,
    "reviews": [
        {
            "_id": "5fb93e9d22b0b526dff4110c",
            "movie": "5fb93df622b0b526dff41104",
            "user": {
                "_id": "5fb93e7a22b0b526dff4110a",
                "username": "testinder",
                "email": "test123@gmail.com"
            },
            "rating": 2.5,
            "comment": "test",
            "createdAt": "2020-11-21T16:21:49.153Z",
            "__v": 0
        },
        {
            "_id": "5fb93e1622b0b526dff41106",
            "movie": "5fb93df622b0b526dff41104",
            "user": {
                "_id": "5fb93a2a690a72229e533031",
                "username": "Inder",
                "email": "test@gmail.com"
            },
            "rating": 2.5,
            "comment": "test",
            "createdAt": "2020-11-21T16:19:34.715Z",
            "__v": 0
        }
    ]
}





