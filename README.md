# Web Single sign-on(SSO) 
> A free unified authentication platform using the SSI architecture built on the Everscale blockchain. Allows developers to use SSI in their products, and makes integration easier. This is the MVP version.


## Table of Contents

- [Description](#description)
- [How does SSO work?](#how-does-sso-work)
- [How to use](#how-to-use)
- [Technologies used](#technologies-used)

## Description

**Single sign-on(SSO)** is authentication method that allows users to securely authenticate to multiple applications and sites at once using a single set of credentials. As an approach to authorization, we use SSI.<br>

**Self-sovereign identity(SSI)** is an approach to digital identification that gives people control over the information they use to verify their identity to websites, services and applications on the Internet. In order for people to have permanent accounts, they rely on large account providers like Google. If the user decides not to use a large account provider, he creates his own for each service provider. <br>
SSI provides a different approach in which the user exists independently of the services. This allows the user to gain access to a simplified and secure way in which he retains full control over information related to his identity.<br>

As an identifier, we use the globally unique identifier **DID**. Which does not require centralized registration and is most often generated and/or registered cryptographically. DID can refer to any subject (person, organization, things, data models, abstract object, etc.)

To store user data, we use **Verifiable credential(VC)** is credentials protected from unauthorized access, the authorship of which can be verified cryptographically. <br> 
A user can get a VC from any service provider, but use only VC received from trusted providers for authentication.


You can read more about DID [here](https://www.w3.org/TR/did-core/)<br>
You can read more about VC [here](https://www.w3.org/TR/vc-data-model/)


## How does SSO work?


SSO is based on setting up a trust relationship between an application known as a service provider and an access management system. Such trust relationships are often based on the exchange of a certificate between an access management system and a service provider. Such a certificate can be used to indicate the identification information that is sent from the access management system to the service provider, so the service provider will know that the information comes from a reliable source. In SSO, identification data takes the form of tokens containing identification values of user information such as DID or VC.


The authorization procedure usually looks like this:
1) The user visits the website or application that he wants to access, that is, the service provider.
2) The service provider sends a token with information about the user and the data he wants to receive from the user to the SSO (access control system) as part of the authentication request.
3) First of all, the access control system checks whether the user has been authorized and what data from the user is needed by the service provider. If he was authorized and the provider does not need data from the user, then he goes straight to step 6.
4) If the user is not authorized, then he will have to pass authorization or registration in the access control system.
5) If the service provider needs additional data from the user, it will request it from the user.
6) As soon as the access control system approves the identification data, it will return the token to the service provider, confirming successful authentication.
7) This token passes “through the user's browser” to the service provider.
8) The token received by the service provider is confirmed according to the trust relationship established between the service provider and the access management system during the initial setup.
9) The user is granted access to the service provider.


## How to use

To use SSO, it is necessary to implement 2 functions of sending data for authentication and receiving data back.


### The function of sending data to SSO
In order to create a user authentication request through our system, it is necessary to implement the following functionality:
1) Create an endpoint with query parameters.
2) Implement redirection to the newly created endpoint.

#### Endpoint for forwarding
```
https://sso-defispace.ru/api/url
```

#### Query parameters
1) endpoint - The URL to which you will need to send an authorization response.
2) method - the method of the request to which the response will be sent (GET, POST)
3) data\[attributes\] - Array of attribute names that are required for user authentication. This parameter is optional! You can see the name of all the attributes that our system works with [here](https://schema.org/)

#### Example of a ready endpoint
```
https://sso-defispace.ru/api/url?endpoint=https://your/address/auth&method=GET
```
or if attributes are needed
```
https://sso-defispace.ru/api/url?endpoint=https://your/address/auth&method=GET&data[attributes]=familyName&data[attributes]=givenName
```

Example of implementation in js:
```js
const express = require('express');

const app = express();

const host = "127.0.0.1";
const port = "3000";

app.get("./", async(req, res) => {
    res.redirect("https://sso-defispace.ru/api/url?endpoint=https://your/address/auth&method=GET&data[attributes]=familyName&data[attributes]=givenName"); //
});

app.listen(port, host);

```

### Response reception function
It can be implemented using different request methods - GET or POST.
Accepts:
1) did
2) auth(bool) - authorization result

#### GET request
After successful authentication, the SSO creates from the endpoint that it received from the service provider and creates a URL with query parameters. Redirects to the created URL.

Example of implementation in js:
```js
const express = require("express");

const app = express();

app.get("/auth", async (req, res) => {
    try {
        if(req?.query?.did && req?.query?.auth) {
            //further authorization actions in your service
        }
    } catch(error) {
        // error handling
    }
})

```

#### POST request
Accepts parameters in body. After successfully sending data via a POST request. SSO redirects to the same endpoint to which the POST request was sent before.

Example of implementation in js:
```js
const express = require("express");

const app = express();

app.get("/auth", async(req, res) => {
    //
});

app.post("./auth", async(req, res) => {
    if(req?.body?.did, req?.body?.auth) {
        //further authorization actions in your service
    }
});

```

## Technologies used
1) node js - >= v16.15.1
2) [eversdk](https://github.com/tonlabs/ever-sdk-js) - JavaScript Everscale SDK.
3) [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.
4) [next js](https://nextjs.org/) - an open JavaScript framework built on top of React.js for creating web applications, created by Vercel. The framework was designed to solve the React problem.js related to rendering the application on the server side - SSR. It works on the server and in the browser.
5) [React](https://ru.reactjs.org/) - JavaScript library for creating user interfaces.
6) [did:everscale](https://git.defispace.com/ssi-4/everscale-did-registry) - the did method implemented on the basis of the everscale blockchain.