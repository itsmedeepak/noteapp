
Note-Taking App
===============

Overview
--------

The Note-Taking App is a secure and scalable RESTful API that facilitates note creation, management, and collaboration. Users can create, read, update, and delete notes. Additionally, the application allows users to share notes with others and perform keyword-based searches.

Table of Contents
-----------------

*   [Project Structure](#project-structure)
*   [Technical Stack](#technical-stack)
*   [Getting Started](#getting-started)
*   [API Endpoints](#api-endpoints)
*   [Authentication](#authentication)
*   [Rate Limiting and Request Throttling](#rate-limiting-and-request-throttling)
*   [Search Functionality](#search-functionality)
*   [Folder Structure](#folder-structure)
*   [Dependencies](#dependencies)

[Folder Structure](#project-structure)
----------------

*   **controllers/:** Contains controller functions handling logic.
*   **middleware/:** Includes authentication middleware and rate limiting middleware.
*   **models/:** Defines the Mongoose models for MongoDB.
*   **routes/:** Defines the API routes and their corresponding controllers.
*   **test/:** Holds the test files for unit and integration tests.
*   **config/:** Includes configuration files such as database connection.


[Technical Stack](#technical-stack)
---------------

*   **Framework:** Express.js
*   **Database:** MongoDB
*   **Authentication:** JSON Web Tokens (JWT)
*   **Testing:** Your preferred testing framework

[Getting Started](#getting-started)
---------------

1.  **Clone the Repository:** 
    - `git clone https://github.com/itsmedeepak/noteapp.git` 
    - `cd noteapp`
2.  **Install Dependencies:** 
      - `npm install`
3.  **Configure Enviromental Variables:**
    -  `MONGODBURI = <replace with mongodb uri string>`
     -  `SECRETKEY = <replace with jwt scecret key>`
4.  **Run the Application:** `npm start`

[API Endpoints](#api-endpoints)
-------------

### Authentication Endpoints

*   `POST /api/auth/signup:` Create a new user account.
*   `POST /api/auth/login:` Log in to an existing user account and receive an access token.

### Note Endpoints

*   `GET /api/notes:` Get a list of all notes for the authenticated user.
*   `GET /api/notes/:id:` Get a note by ID for the authenticated user.
*   `POST /api/notes:` Create a new note for the authenticated user.
*   `PUT /api/notes/:id:` Update an existing note by ID for the authenticated user.
*   `DELETE /api/notes/:id:` Delete a note by ID for the authenticated user.
*   `POST /api/notes/:id/share:` Share a note with another user for the authenticated user.
*   `GET /api/search?q=:query:` Search for notes based on keywords.

[Authentication](#authentication)
--------------

The API uses JSON Web Tokens (JWT) for authentication. Include the token in the Authorization header when making requests to secured endpoints.

```javascript
const authenticationMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.SECRETKEY); // Use your actual secret key

    // Check if the user exists
    const user = await User.findById(decodedToken.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the user to the request object for further use
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
```

[Rate Limiting and Request Throttling](#rate-limiting-and-request-throttling)
------------------------------------

To handle high traffic, rate limiting and request throttling have been implemented, ensuring the API remains performant and secure.

```javascript
const rateLimit = require('express-rate-limit');

// Create a limiter with specified options
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // maximum requests per window
  message: 'Too many requests from this IP, please try again later.',
});

module.exports = limiter;
```

[Search Functionality](#search-functionality)
--------------------

Text indexing is implemented for high-performance search functionality. Users can search for notes based on keywords.

```javascript
const searchNotes = async (req, res) => {
  try {
    const query = req.query.q;
    const notes = await Note.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
        { content: { $regex: query, $options: 'i' } }, // Case-insensitive content search
      ],
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
```


[Dependencies](#dependencies)
------------

Ensure you have the required dependencies installed:
- **bcrypt**: "^5.1.1"
- **body-parser**: "^1.20.2"
- **cors**: "^2.8.5"
- **dotenv**: "^16.3.1"
- **express**: "^4.18.2"
- **express-rate-limit**: "^7.1.5"
- **jsonwebtoken**: "^9.0.2"
- **mongoose**: "^8.0.3"
- **nodemon**: "^3.0.2"

Developed by Deepak Kumar ❤️
