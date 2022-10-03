# Web Single sign-on(SSO) 
> A free unified authentication platform using the SSI architecture built on the Everscale blockchain. Allows developers to use SSI in their products, and makes integration easier.


## Table of Contents

- [Description](#description)
- [How does SSO work?](#how-does-sso-work)

## Description

**Single sign-on(SSO)** - метод аутентификации, который позволяет пользователям безопасно аутентифицироваться сразу в нескольких приложениях и сайтах, используя один набор учетных данных. В качестве подхода к авторизации мы используем SSI.<br>

**Self-sovereign identity(SSI)** - это подход к цифровой идентификации, который дает людям контроль над ифнормацией, которую они используют для подтверждения своей личности веб-сайтам, службам и приложениям в интернете. Чтобы люди могли иметь постоянные учетные записи, они пологаються на крупных поставщиков учетных записей, таких как Google. Если пользователь решает не использовать крупного поставщика учетных записей, он создает у каждого поставщика услуг свою. <br>
SSI предостволяет иной подход, в котором пользователь существует независимо от служб. Это позволяет пользователю получить доступ к упрощенному и безопасному способу, при котором за ним сохраняется полный контроль над информацией, связанной с его личностью.<br>

В качестве идентификатора мы используем глобально уникальный идентификатор **DID**. Который не требует централизованной регистрации и чаще всего генерируется и/или регестрируется криптографически. DID может относиться к любому субъекту(человек, организация, вещи, модели данных, абстрактному объекту и т.д.)

Для хранения данных пользователя мы используем **Verifiable credential(VC)** - это защищенные от несанкционированного доступа учетные данные, авторство которых может быть проверено криптографически. <br> 
Пользователь может получить VC от любого постащика услуг, но использовать для аутентификации только VC полученные от проверенных поставщиков.


Более подробно про DID можно прочитать [здесь](https://www.w3.org/TR/did-core/)<br>
Более подробно про VC можно прочитать [здесь](https://www.w3.org/TR/vc-data-model/)


## How does SSO work?


SSO базируется на настройке доверительных отношений между приложением, известным как провайдер услуг, и системой управления доступами. Такие доверительные отношения часто базируются на обмене сертификатом между системой управления доступами и провайдером услуг. Такой сертификат может использоваться, чтобы обозначить идентификационную информацию, которая отправляется от системы управления доступами провайдеру услуг, таким образом провайдер услуг будет знать, что информация поступает из надежного источника. В SSO идентификационные данные принимают форму токенов, содержащих идентификационные значения информации о пользователе такие, как DID или VC.


Порядок авторизации обычно выглядит следующим образом:
1) Пользователь заходит на сайт или приложение, доступ на котором он хочет получить, то есть провайдер услуг.
2) Провайдер услуг отправляет токен, с информацией о пользователе и данных которые он хочет получить от пользователя на SSO(система управления доступом), как часть запроса на аутентификацию.
3) В первую очередь система управления доступом проверяет был ли пользователь авторизирован и какие данные от пользователя необходимы провайдеру услуг. Если он был авторизирован и провайдеру не нужны данные от пользователя то он переходит сразу на шаг 6.
4) Если пользователь не авторизован, то он должен будет пройти авторизацию или регистрацию в система контроля доступом.
5) Если провайдеру услуг нужны дополнительные данные от пользователя, то он запросит их от пользователя.
6) Как только система управления доступами одобрит идентификационные данные, она вернет токен провайдеру услуг, подтверждая успешную аутентификацию.
7) Этот токен проходит “сквозь браузер” пользователя провайдеру услуг.
8) Токен, полученный провайдером услуг, подтверждается согласно доверительным отношениям, установленным между провайдером услуг и системой управления доступами во время первоначальной настройки.
9) Пользователю предоставляется доступ к провайдеру услуг.


## Как использовать

Для использования SSO необходимо реализовать 2 функции отправки данных на аутентификацию и прием данных обратно.

### Функция отправки данных на SSO
Для того, чтобы создать запрос на аутентификацию пользователя через нашу систему, необходимо реализовать следующий функционал:
1) Создать endpoint с query параметрами
2) Реализовать переадресацию на только что созданный endpoint.

#### Ендпоинт для переадресации
```
https://sso-defispace.ru/api/url
```

#### Параметры query
1) endpoint - URL на который необходимо будет отправить ответ об авторизации.
2) method - метод запроса, на который будет отправлен ответ(GET, POST)
3) data\[attributes\] - Массив названий атрибутов, которые необходимы для аутентификации пользователя. Это параметр не является обязательным! Посмотреть название всех атрибутов с которыми работает наша система, можно [здесь](https://schema.org/)

#### Пример готового endpoint
```
https://sso-defispace.ru/api/url?endpoint=https://your/address/auth&method=GET
```
или если необходимы атрибуты
```
https://sso-defispace.ru/api/url?endpoint=https://your/address/auth&method=GET&data[attributes]=familyName&data[attributes]=givenName
```

Пример реализации на js:
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

### Функция приема ответа
Может быть реализованна с использованием разных методов запроса - GET или POST.
Принимает:
1) did

#### GET запрос
После успешной аутентификации, SSO создает из endpoint который получил от поставщика услуг и создает URL с query параметрами. Делает переадресацию на созданный URL.

Пример реализации на js:
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

#### POST запрос
Принимает параметры в body. После удачной отправки данных через POST запрос. SSO делает переадресацию на тот же endpoint, на который до этого был отправлен POST запрос.

Пример реализации на js:
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

## Используемые технологии
1) node js - >=v16.15.1
2) [eversdk](https://github.com/tonlabs/ever-sdk-js) - JavaScript Everscale SDK.
3) [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.
4) [next js](https://nextjs.org/) - an open JavaScript framework built on top of React.js for creating web applications, created by Vercel. The framework was designed to solve the React problem.js related to rendering the application on the server side - SSR. It works on the server and in the browser.
5) [React](https://ru.reactjs.org/) - JavaScript library for creating user interfaces.
6) [did:everscale](https://git.defispace.com/ssi-4/everscale-did-registry) - the did method implemented on the basis of the everscale blockchain.

