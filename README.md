

# Spring Boot Middleware with Angular 4 front-end solution 

This application is composed of two parts, a Java server built using Spring Boot application framework exposing a 
RESTFul API to manage a list of items. 

The second part is composed of an Angular v.4 client-side application that serves as a simple interface to perform few 
operation for managing the list of items.

Persistent storage is implemented with a remote MySQL database installation. 

## Spring Boot part
Here a simplified description of the operations and components of the REST services and endpoints.

#### Maven build system
The Spring Boot project is build from a generic starter Maven pom file having dependencies for :

* Spring Boot jdbc driver
* MySQL
* JSON utilities

####The Item object
The Item class is described as:
```Java
class Item{
     String id;
     String name;
     String description;
     Timestamp creationDate;
}
```
and get translated as json object as:

```json
{
  "id": "b16a03a0-c87b-4fa9-8a4f-7e1f77418a84",
  "name": "this was my last item",
  "description": "this is the description for my last item",
  "creationDate": 1496251423000
}
```
The **id** of the Item object is mandatory, every other fields are optional and the **creationDate** will be eventually 
generated in the database of missing.

At this time the application does not make any use of the timestamp property.


#### Item Controller class
######Exposes at least 3 endpoints.
* **GET /items**: fetch then entire list of stored item objects.
* **POST /item**: fetch only one item based on his id.
* **PUT /item**: store an item into the database if not present. The item is coming from the user request payload as json representation.

######Additionally, the API exposes this endpoints:
* **DELETE /item**: to remove an item based on it unique identifier.
* **PATCH /item**: updates an existing item if found.
* **GET /removeAll**: empty the item list from the database.

The return type of all request produce an entity that convert to json is sent to the client.
```json
{
  "msg": "a message that the client can use as result for this operation",
  "data": items[] | item | null,
  "ts": 1496257411084 //timestamp of the operation
}
```
In case of a caught error, the response object is still formatted in the same way. The status code indicates how to use 
the message part of the response to inform the client.

A response with status code **400 : BAD REQUEST** contains a similar sub object in the error sent to the client.
```json
{
  "msg": "failed to remove item with id 34dc31e9-6982-43d6-8701-bacb45527387",
  "data": null,
  "ts": 1496257411084 //timestamp of the operation
}
```
Based on the result of each operation the generated response from the API interface could provide any of the following 
status codes:
* 200: for all succesfull operaitons.
* 400: if the manadatory id is missing when trying to add an item to the list.
* 500: for any other issues that requires to inform the user of some issues in the request or during the processing of 
the response.

####Enforcing JSON requests
The server enforce that all requests headers are JSON requests by accepting only **Content-type** as **application/json**.

This enforcement is performed by a request interceptor that during the pre-handle phase of the request ensure that the 
request header content type is set as "application/json". Otherwise a 403, FORBIDDEN status code is sent to the client.

####Data Access Layer
A data access object is used to implement CRUD operations to handle database operations.

####Remote MySQL installation
A semi-automated installation of MySQL was out of the scope of this simple project. Ideally a self-contained relational 
database such SQLIte could replace the actual MySQL choice.
At the moment I opted for a remote provided MySQL database. This temporary solution simplify
distribution.

## Angular 4 client-side part
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.6.

Therefore a nodejs server is included in the client module with the npm libraries needed to run, build and serve the 
client-side application without having to run Spring Boot .

There are 3 ways of running the client-side application:

* Stand-alone NodeJS application server on port 4200. This setting is initially useful to start the designing process of
the front-end part even before the RESTful service is required to provide real data.
* Stand-alone NodeJS applicaiton with a proxy configuration to access port 8080 of the running Spring Boot server. This 
gives the flexibility of quickly developing the front-end since any changes a watched and re-build using 
**ng build --watch** command. This configuration let us access the server endpoints, working with real data.
* As a built that is transfered to the resources static folder of the Spring Boot application. This let us serve the 
client-side portion from the Spring Boot server as static resources.

While the Angular client-side application is located on it own module, outside of the Spring Boot module, only the 
needed components are copied in the static resource folder of the server and they will be properly packed in the final 
**WAR** archive.

### Google Material Design
To provide a user firendly and modern interface, Google Material Design library was added to the Angular 4 application.

The following short video will dimostrate the usage of the simple interface:
[youtube video link](https://www.youtube.com/watch?v=4efpxYqvS-A)


## Further help
For any questions contact me by email: [marco.falsitta@me.com](mailto:marco.falsitta@me.com)
