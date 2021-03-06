# IVORY

current host on: 162.243.22.154:3939

***socket event***
----

**authenticate**
----
  After a child socket connected. Server will wait for a authenticate event.

* **event name**

  authenticate
  
* **data**

  `{token : <string>}`
  
* **Success Response:**

  * **event name**
    
    setup complete
  
  * **data**
  
    NULL

* **Error Response:**

  * **event name**
    
    unauthorized
  
  * **data**
  
    ` { message: 'invalid signature',inner: { message: 'invalid signature' },data: { message: 'invalid signature',code: 'invalid_token',type: 'UnauthorizedError' } }`

**message**
----
  server will wait for a message. after setup
  
* **event name**

  message

* **data**
  
  `{{takerid : <string>,message : <string>,group : <number>(0 for user,1 for group) ,url : <string>}}`

* **Success Response:**
  
  None

* **Error Response:**

  None

**send message**
----
  child socket will receive message send by server
 
 * **event name**

  newmessage 
  
* **data**
  
  `{{userid : <string>, takerid : <string>,message : <string>,group : <number>(0 for user,1 for group) ,url : <string>}}`
  
* **Success Response:**
  
  None

* **Error Response:**

  None

***API-Table***
----

**local register**
----
  register a user.

* **URL**

  /auth/local/register

* **Method:**

  `POST`
  
* **Header**

  None
  
*  **URL Params**

  None

* **Data Params**

  **Required:**
  
    email=string
    
    password=string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token : <string>, profile : <object> }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** NULL
  
  or
  
  * **Code:** 503 SERVICE UNAVAILABLE <br />
    **Content:** NULL
    
**local login**
----
  login with email and password.

* **URL**

  /auth/local/login

* **Method:**

  `POST`

* **Header**

  None
  
*  **URL Params**

  None

* **Data Params**

  **Required:**
  
    email=string
    
    password=string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token : <string>, profile : <object> }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** NULL
  
  or
  
  * **Code:** 503 SERVICE UNAVAILABLE <br />
    **Content:** NULL
    
**facebook login**
----
  login with facebook token.

* **URL**

  /auth/facebook/token

* **Method:**

  `get`

* **Header**

  None
  
*  **URL Params**

  **Required:**
    
    access_token=string

* **Data Params**

  NULL

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token : <string>, profile : <object> }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** NULL
  
  or
  
  * **Code:** 503 SERVICE UNAVAILABLE <br />
    **Content:** NULL

**find course**
----
  find courses.

* **URL**

  /api/class

* **Method:**

  `get`

* **Header**

  None
  
*  **URL Params**

  **At least have one:**
    
    Abbreviation=string
    
    Number=int(need 5 digits eg:18000)
    
    Title=string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token : [<object>] }`
 
* **Error Response:**
  
  * **Code:** 503 SERVICE UNAVAILABLE <br />
    **Content:** NULL

**join course group**
----
  find or create courses group and join the group.

* **URL**

  /api/joingroup

* **Method:**

  `get`

* **Header**

  **Required**
  
  x-access-token=string
  
*  **URL Params**

  **Choose one:**
    
    courseId=string
    
    groupid=string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** NULL
 
* **Error Response:**
  
  * **Code:** 404 NOT FOUND <br />
    **Content:** NULL

  or
  
  * **Code:** 503 SERVICE UNAVAILABLE <br />
    **Content:** NULL
  
