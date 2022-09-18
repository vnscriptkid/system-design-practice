## refs
- https://dev.to/thisdotmedia/build-an-api-gateway-with-nestjs-in-10-minutes-16db
- https://levelup.gitconnected.com/nestjs-microservices-with-grpc-api-gateway-and-authentication-part-2-2-d67dc8e3b86a
- https://wanago.io/2020/11/16/api-nestjs-microservices/

## product service
- `GET /products/1`
```js
{
    "id": 1,
    "category": "furniture",
    "description": "nice",
    "price": 100
}
```

## promotion service
- `GET /promotions/2`
```js
{
    "id": 2,
    "type": "year end",
    "discount": 12.3,
    "endDate": "2022-12-31"
}
```

## review service
- `GET /reviews/3`
```js
{
    "id": 3,
    "user": "john",
    "rating": 4,
    "comment": "i like it"
}
```

## aggregator service
- `GET /api/products/1`
```js
{
    "id": 1,
    "category": "furniture",
    "description": "nice",
    "price": {
        "listPrice": 100,
        "discount": 12.3, 
        "discountedPrice": 87.7,
        "amountSaved": 12.3,
        "endDate": "2022-12-31"
    },
    "reviews": [
        {
            "id": 3,
            "user": "john",
            "rating": 4,
            "comment": "i like it"
        }
    ]
}
```