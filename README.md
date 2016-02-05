# API-Table

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
  
    email=[string]
    
    password=[string]

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
  
    email=[string]
    
    password=[string]

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
    
    token=[string]

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
