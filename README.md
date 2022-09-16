# Web Single sign-on(SSO) 
> A free unified authentication platform using the SSI architecture built on the Everscale blockchain. Allows developers to use SSI in their products, and makes integration easier.


## Table of Contents

- [Terminology](#terminology)
- [Description](#description)

## Terminology

**DID** -  глобально уникальный идентификатор, который не требует централизованной регистрации и чаще всего генерируется и/или регистрируется криптографически. DID может относиться к любому субъекту(человек, организация, вещи, модели данных, абстрактному объекту и т.д.)

**Self-sovereign identity(SSI)** - это подход к цифровой идентификации, который дает людям контроль над информацией, которую они используют, чтобы доказать, кто они, веб-сайтам, службам и приложениям в Интернете.

**Single sign-on(SSO)** - метод аутентификации, который позволяет пользователям безопасно аутентифицироваться сразу в нескольких приложениях и сайтах, используя один набор учетных данных.

**Verifiable credential(VC)** - это защищенные от несанкционированного доступа учетные данные, авторство которых может быть проверено криптографически.

## Description

**Self-sovereign identity(SSI)** - это подход к цифровой идентификации, который дает людям контроль над ифнормацией, которую они используют для подтверждения своей личности веб-сайтам, службам и приложениям в интернете. Чтобы люди могли иметь постоянные учетные записи, они пологаються на крупных поставщиков учетных записей, таких как Google. Если пользователь решает не использовать крупного поставщика учетных записей, он создает у каждого поставщика услуг свою. <br>
SSI предостволяет иной подход, в котором пользователь существует независимо от служб. Это позволяет пользователю получить доступ к упрощенному и безопасному способу, при котором за ним сохраняется полный контроль над информацией, связанной с его личностью.

**Single sign-on(SSO)** - метод аутентификации, который позволяет пользователям безопасно аутентифицироваться сразу в нескольких приложениях и сайтах, используя один набор учетных данных. SSO использует SSI в качестве подхода аутентификации. И является мостом между пользователем и поставщиком услуг в интеренете. <br>
Для идентификации пользователя мы используем DID идентификатор. <br>
**DID** -  глобально уникальный идентификатор, который не требует централизованной регистрации и чаще всего генерируется и/или регистрируется криптографически. DID может относиться к любому субъекту(человек, организация, вещи, модели данных, абстрактному объекту и т.д.) <br>
И уже к DID пользователь привязывает свои учетные данные, такие как full name или паспортные данные.

Все данные пользователя хранятся в VC.
**Verifiable credential(VC)** - это защищенные от несанкционированного доступа учетные данные, авторство которых может быть проверено криптографически.

Более подробно про DID можно прочитать здесь.
Более подробно про VC можно прочитать здесь.


Мы решили упростить подключение и использование SSI разработчиками стороних сайтов и приложений, созданием SSO. Для использования SSI разработчикам всего лишь требуеться подключить SSO с помощью API. Для обычных пользователей это тоже упрощает жизнь тем. Что они могут хранить все свои данные в одном месте, личном кошельке. Личный кошелек в данный момент представлен в виде мобильного приложения.

Между пользователем и входом на сайт лежат следующее шаги:
1) Пользователь заходит на сайт или приложение, доступ на котором он хочет получить, то есть провайдер услуг.
2) Провайдер услуг отправляет токен, с информацией о пользователе и данных которые он хочет получить от пользователя на SSO(система управления доступом), как часть запроса на аутентификацию.
3) В первую очередь система управления доступом проверяет был ли пользователь авторизирован и какие данные от пользователя необходимы провайдеру услуг. Если он был авторизирован и провайдеру не нужны данные от пользователя то он переходит сразу на шаг 6.
4) Если пользователь не авторизован, то он должен будет пройти авторизацию или регистрацию в система контроля доступом.
5) Если провайдеру услуг нужны дополнительные данные от пользователя, то он сделает запрос на получение данных и разрешением их использовать от пользователя.
6) Как только система управления доступами одобрит идентификационные данные, она вернет токен провайдеру услуг, подтверждая успешную аутентификацию.
7) Этот токен проходит “сквозь браузер” пользователя провайдеру услуг.
8) Токен, полученный провайдером услуг, подтверждается согласно доверительным отношениям, установленным между провайдером услуг и системой управления доступами во время первоначальной настройки.
9) Пользователю предоставляется доступ к провайдеру услуг.



