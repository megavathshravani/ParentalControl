// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const admin = require('firebase-admin');
// const path = require('path');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// const serviceAccountPath = path.join(__dirname, 'myauthapp-c3a5b-firebase-adminsdk-znhn2-677fa05a03.json');
// const serviceAccount = require(serviceAccountPath);
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// // Endpoint for user signup
// app.post('/get_data', async (req, res) => {
//   const { email, password, firstname, lastname, username } = req.body;
//   console.log('Signup Details Received:', req.body);

//   try {
//     const userRecord = await admin.auth().createUser({
//       email,
//       password,
//       displayName: `${firstname} ${lastname}`, 
//     });

//     const userRef = admin.firestore().collection('users').doc(userRecord.uid);
//     await userRef.set({
//       email,
//       firstname,
//       lastname,
//       username,
//       uid: userRecord.uid,
//     });

//     res.send('User created successfully');
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).send('Error creating user');
//   }
// });

// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(403).json({ message: 'No token provided' });
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.user = decodedToken;
//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };

// // Apply `verifyToken` middleware to routes that require authentication


// app.get('/fetch_data', async (req, res) => {
//   try {
//     const usersRef = admin.firestore().collection('users');
//     const snapshot = await usersRef.get();

//     if (snapshot.empty) {
//       return res.status(404).send('No users found');
//     }

//     const users = [];
//     snapshot.forEach(doc => {
//       users.push({ id: doc.id, ...doc.data() });
//     });

//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).send('Error fetching users');
//   }
// });


// app.post('/add-child', verifyToken, async (req, res) => {
//   const { parentEmail, childEmail } = req.body;

//   try {
//     const childRecord = await admin.auth().getUserByEmail(childEmail);
//     const childData = await admin.firestore().collection('users').doc(childRecord.uid).get();

//     if (!childData.exists) {
//       return res.status(404).json({ message: 'Child not found' });
//     }

//     // Store the parent-child connection in Firestore
//     await admin.firestore().collection('connections').add({
//       parentEmail,
//       childEmail,
//       connectedAt: new Date(),
//     });

//     res.status(200).json({ message: 'Child connected successfully' });
//   } catch (error) {
//     console.error('Error connecting child:', error);
//     res.status(500).json({ message: 'Error connecting child' });
//   }
// });

// // app.post('/add-child', async (req, res) => {
// //   const { parentEmail, childEmail } = req.body;

// //   try {
// //     const childRecord = await admin.auth().getUserByEmail(childEmail);
// //     const childData = await admin.firestore().collection('users').doc(childRecord.uid).get();

// //     if (!childData.exists) {
// //       return res.status(404).json({ message: 'Child not found' });
// //     }

// //     // Store the parent-child connection
// //     await admin.firestore().collection('connections').add({
// //       parentEmail,
// //       childEmail,
// //       childId: childRecord.uid,
// //     });

// //     res.status(200).json({ message: 'Child connected successfully' });
// //   } catch (error) {
// //     console.error('Error connecting child:', error);
// //     res.status(500).json({ message: 'Error connecting child' });
// //   }
// // });

// app.get('/get-connected-children', verifyToken, async (req, res) => {
//   const { email } = req.user; // Get the email from the verified token

//   try {
//     const connectionsSnapshot = await admin.firestore()
//       .collection('connections')
//       .where('parentEmail', '==', email)
//       .get();

//     const children = connectionsSnapshot.docs.map(doc => doc.data());

//     res.status(200).json({ children });
//   } catch (error) {
//     console.error('Error fetching connected children:', error);
//     res.status(500).json({ message: 'Error fetching connected children' });
//   }
// });


// app.post('/create-quiz', verifyToken, async (req, res) => {
//   const { parentEmail, childEmail, questions } = req.body;

//   try {
//     const quizRef = admin.firestore().collection('quizzes').doc();
//     await quizRef.set({
//       parentEmail,
//       childEmail,
//       questions,
//       createdAt: new Date(),
//     });

//     res.status(200).json({ message: 'Quiz created successfully' });
//   } catch (error) {
//     console.error('Error creating quiz:', error);
//     res.status(500).json({ message: 'Error creating quiz' });
//   }
// });


// // Endpoint to create and save quiz questions
// // app.post('/create-quiz', async (req, res) => {
// //   const { parentEmail, childEmail, questions } = req.body;

// //   try {
// //     const quizRef = admin.firestore().collection('quizzes').doc();
// //     await quizRef.set({
// //       parentEmail,
// //       childEmail,
// //       questions,
// //       createdAt: new Date(),
// //     });

// //     res.status(200).json({ message: 'Quiz created successfully' });
// //   } catch (error) {
// //     console.error('Error creating quiz:', error);
// //     res.status(500).json({ message: 'Error creating quiz' });
// //   }
// // });

// // Endpoint to get child quiz results
// app.get('/get-results', async (req, res) => {
//   const { childEmail } = req.query;

//   try {
//     const quizzesRef = admin.firestore().collection('results').where('childEmail', '==', childEmail);
//     const snapshot = await quizzesRef.get();

//     if (snapshot.empty) {
//       return res.status(404).json({ message: 'No results found' });
//     }

//     const results = snapshot.docs.map(doc => doc.data());
//     res.status(200).json(results);
//   } catch (error) {
//     console.error('Error fetching results:', error);
//     res.status(500).json({ message: 'Error fetching results' });
//   }
// });



// app.post('/childlogin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Fetch the user by email
//     const userCredential = await admin.auth().getUserByEmail(email);
//     const user = userCredential.toJSON();
//     console.log('Child logged in:', user.email);

//     // Capture the IP address of the login request
//     const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

//     // Log login details in Firestore
//     const loginRef = admin.firestore().collection('loginLogs').doc(); // Auto-generates an ID
//     await loginRef.set({
//       email: user.email,
//       loginTime: new Date(),
//       ipAddress: ipAddress,
//       role: "child", // Role set to child
//     }).then(() => {
//       console.log('Child login details saved to Firestore');
//     }).catch((error) => {
//       console.error('Error writing child login details to Firestore:', error);
//     });

//     res.status(200).json({ message: 'Child login successful', user });
//   } catch (error) {
//     console.error('Error logging in (child):', error.message);
//     res.status(401).json({ message: 'Login failed. Check your email or password.' });
//   }
// });


// // Parent and child login (combined into one to simplify token-based login)
// // app.post('/login', async (req, res) => {
// //   const { email, password } = req.body; // role can be "parent" or "child"

// //   try {
// //     const user = await admin.auth().getUserByEmail(email);
// //     const token = await admin.auth().createCustomToken(user.uid); // Generate custom token

// //     // Capture IP address and login details in Firestore
// //     const loginRef = admin.firestore().collection('loginLogs').doc(); // Auto-generates an ID
// //     const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
// //     await loginRef.set({
// //       email,
// //       loginTime: new Date(),
// //       ipAddress,
// //     });

// //     res.status(200).json({ message: 'Login successful', token }); // Return token to client
// //   } catch (error) {
// //     console.error('Error logging in:', error.message);
// //     res.status(401).json({ message: 'Login failed. Check your email or password.' });
// //   }
// // });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Fetch the user by email
//     const userCredential = await admin.auth().getUserByEmail(email);
//     const user = userCredential.toJSON();
//     console.log('User logged in:', user.email);

//     // Capture the IP address of the login request
//     const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

//     // Log login details in Firestore
//     const loginRef = admin.firestore().collection('loginLogs').doc(); // Auto-generates an ID
//     await loginRef.set({
//       email: user.email,
//       loginTime: new Date(),
//       ipAddress: ipAddress,
//       role: "parent",
//     }).then(() => {
//       console.log('Login details saved to Firestore');
//     }).catch((error) => {
//       console.error('Error writing login details to Firestore:', error);
//     });

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     console.error('Error logging in:', error.message);
//     res.status(401).json({ message: 'Login failed. Check your email or password.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// Endpoint for user login


// Start server




const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, 'myauthapp-c3a5b-firebase-adminsdk-znhn2-677fa05a03.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware for token verification
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// User signup endpoint
app.post('/get_data', async (req, res) => {
  const { email, password, firstname, lastname, username } = req.body;
  console.log('Signup Details Received:', req.body);

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName:'${firstname} ${lastname}',
    });

    const userRef = admin.firestore().collection('users').doc(userRecord.uid);
    await userRef.set({
      email,
      firstname,
      lastname,
      username,
      uid: userRecord.uid,
    });

    res.send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
});

app.post('/create-quiz', async (req, res) => {
  const { parentEmail, childEmail, subject, questions } = req.body;

  if (!parentEmail || !childEmail || !subject || questions.length === 0) {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    const quizRef = admin.firestore().collection('quizzes').doc();
    await quizRef.set({
      parentEmail,
      childEmail,
      subject,
      questions,
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'Quiz created successfully' });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
  }
});



// app.post('/create-quiz', async (req, res) => {
//   const { parentEmail, childEmail, questions } = req.body;

//   try {
//     const quizRef = admin.firestore().collection('quizzes').doc();
//     await quizRef.set({
//       parentEmail,
//       childEmail,
//       questions,
//       createdAt: new Date(),
//     });

//     res.status(200).json({ message: 'Quiz created successfully' });
//   } catch (error) {
//     console.error('Error creating quiz:', error);
//     res.status(500).json({ message: 'Error creating quiz' });
//   }
// });

// Save location endpoint
app.post('/save-location', async (req, res) => {
  const { email, location } = req.body;

  try {
    await admin.firestore().collection('locations').doc(email).set({
      emailid: email,
      latitude: location.latitude,
      longitude: location.longitude,
      timestamp: new Date(),
    });
    res.status(200).json({ message: 'Location saved successfully' });
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).json({ message: 'Error saving location' });
  }
});

// Get location endpoint
app.get('/get-location', async (req, res) => {
  const { email } = req.params;

  try {
    const locationDoc = await admin.firestore().collection('locations').doc(email).get();

    if (!locationDoc.exists) {
      return res.status(404).json({ message: 'Location not found for the specified email.' });
    }

    res.status(200).json(locationDoc.data());
  } catch (error) {
    console.error('Error fetching location:', error);
    res.status(500).json({ message: 'Error fetching location' });
  }
});

// Other endpoints and logic (e.g., login, quizzes, fetching users)
app.get('/fetch_data', async (req, res) => {
  try {
    const usersRef = admin.firestore().collection('users');
    const snapshot = await usersRef.get();

    if (snapshot.empty) {
      return res.status(404).send('No users found');
    }

    const users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await admin.auth().getUserByEmail(email);
    const user = userCredential.toJSON();
    console.log('User logged in:', user.email);

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    await admin.firestore().collection('loginLogs').doc().set({
      email: user.email,
      loginTime: new Date(),
      ipAddress: ipAddress,
      role: 'parent',
    });

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(401).json({ message: 'Login failed. Check your email or password.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}');
});



















// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const admin = require('firebase-admin');
// const path = require('path');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// const serviceAccountPath = path.join(__dirname, 'myauthapp-c3a5b-firebase-adminsdk-znhn2-677fa05a03.json');
// const serviceAccount = require(serviceAccountPath);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });


// app.post('/get_data', async (req, res) => {
//   const { email, password, firstname, lastname, username } = req.body;
//   console.log('Signup Details Received:', req.body);

//   try {
    
//     const userRecord = await admin.auth().createUser({
//       email,
//       password,
//       displayName: ${firstname} ${lastname}, 
//     });

//     // Save additional user details in Firestore (optional)
//     const userRef = admin.firestore().collection('users').doc(userRecord.uid);
//     await userRef.set({
//       email,
//       firstname,
//       lastname,
//       username,
//       uid: userRecord.uid, // Store the Firebase user ID
//     });

//     res.send('User created successfully');
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).send('Error creating user');
//   }
// });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
  
//   try {
//     // Fetch the user by email
//     const userCredential = await admin.auth().getUserByEmail(email);

//     // Note: Password verification should be done on the client side or using Firebase Web SDK

//     const user = userCredential.toJSON();
//     console.log('User logged in:', user.email);

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     console.error('Error logging in:', error.message);
//     res.status(401).json({ message: 'Login failed. Check your email or password.' });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log('Server is running on http://localhost:${PORT}');
// });





// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const admin = require('firebase-admin');
// const path = require('path');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// const serviceAccountPath = path.join(__dirname, 'myauthapp-c3a5b-firebase-adminsdk-znhn2-677fa05a03.json');
// const serviceAccount = require(serviceAccountPath);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });


// app.post('/get_data', async (req, res) => {
//   const { email, password, firstname, lastname, username } = req.body;
//   console.log('Signup Details Received:', req.body);

//   try {
    
//     const userRecord = await admin.auth().createUser({
//       email,
//       password,
//       displayName: `${firstname} ${lastname}`, 
//     });

//     // Save additional user details in Firestore (optional)
//     const userRef = admin.firestore().collection('users').doc(userRecord.uid);
//     await userRef.set({
//       email,
//       firstname,
//       lastname,
//       username,
//       uid: userRecord.uid, // Store the Firebase user ID
//     });

//     res.send('User created successfully');
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).send('Error creating user');
//   }
// });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
  
//   try {
//     // Fetch the user by email
//     const userCredential = await admin.auth().getUserByEmail(email);

//     // Note: Password verification should be done on the client side or using Firebase Web SDK

//     const user = userCredential.toJSON();
//     console.log('User logged in:', user.email);

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     console.error('Error logging in:', error.message);
//     res.status(401).json({ message: 'Login failed. Check your email or password.' });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });








// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Route to display "Hello World" at the root URL
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// // Route to handle signup data
// app.post('/get_data', (req, res) => {
//   const { email, firstname, lastname, username, password } = req.body;
//   console.log('Signup Details Received:', req.body);
//   res.send('Signup details received successfully');
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });






// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const cors = require('cors'); // Import CORS

// const app = express();
// connectDB();

// app.use(cors()); // Use CORS middleware
// app.use(express.json());
// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

