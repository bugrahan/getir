# getir
**Repository for Getir's Backend Assignment**

This is a RESTful API project with a single endpoint that fetches the data in the provided MongoDB collection and returns the results in the requested format.

You can send a POST request to this URL:
https://getir-app-bugrahan.herokuapp.com/records

This can be used as a sample payload:

`{
    "startDate": "2016-12-12",
    "endDate": "2016-12-13",
    "minCount": 153,
    "maxCount": 153
}`


To run the tests, you can use `npm run test` in your local.

To run the project in the local environment, `npm run start` or `npm run dev` can be used. While the former one is using `node`, the latter one is using `nodemon`


