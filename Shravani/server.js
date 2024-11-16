// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const admin = require('firebase-admin');
// const path = require('path');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // Set the service account path
// const serviceAccountPath = 'C:/Users/mlaxm/OneDrive/Desktop/locknest/backend/myauthapp-c3a5b-firebase-adminsdk-znhn2-a80641830d.json';
// const serviceAccount = require(serviceAccountPath);

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// // Root route to handle "Cannot GET /"
// app.get('/', (req, res) => {
//   res.send('Welcome to the backend server!');
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

// // Endpoint to fetch all users
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

// // Endpoint to save location

// app.post('/location', async (req, res) => {
//   const { email, location } = req.body;

//   try {
//     // Saving location data into Firestore
//     await admin.firestore().collection('locations').doc(email).set({
//       emailid: email, // Corrected key-value pair
//       latitude: location.latitude,
//       longitude: location.longitude,
//       timestamp: new Date(),
//     });

//     res.status(200).json({ message: 'Location saved successfully' });
//   } catch (error) {
//     console.error("Error saving location:", error);
//     res.status(500).json({ message: 'Error saving location' });
//   }
// });


// // Endpoint for child login
// app.post('/childlogin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userCredential = await admin.auth().getUserByEmail(email);
//     const user = userCredential.toJSON();
//     console.log('Child logged in:', user.email);

//     const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

//     const loginRef = admin.firestore().collection('loginLogs').doc();
//     await loginRef.set({
//       email: user.email,
//       loginTime: new Date(),
//       ipAddress: ipAddress,
//       role: "child",
//     });

//     res.status(200).json({ message: 'Child login successful', user });
//   } catch (error) {
//     console.error('Error logging in (child):', error.message);
//     res.status(401).json({ message: 'Login failed. Check your email or password.' });
//   }
// });

// // Endpoint for user (parent) login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userCredential = await admin.auth().getUserByEmail(email);
//     const user = userCredential.toJSON();
//     console.log('User logged in:', user.email);

//     const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

//     const loginRef = admin.firestore().collection('loginLogs').doc();
//     await loginRef.set({
//       email: user.email,
//       loginTime: new Date(),
//       ipAddress: ipAddress,
//       role: "parent",
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
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Set the service account path
const serviceAccountPath = 'C:/Users/mlaxm/OneDrive/Desktop/locknest/backend/myauthapp-c3a5b-firebase-adminsdk-znhn2-a80641830d.json';
const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Root route to handle "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Endpoint for user signup
app.post('/get_data', async (req, res) => {
  const { email, password, firstname, lastname, username } = req.body;
  console.log('Signup Details Received:', req.body);

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstname} ${lastname}`,
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

// Endpoint to fetch all users
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

// Endpoint to save location
app.post('/location', async (req, res) => {
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
    console.error("Error saving location:", error);
    res.status(500).json({ message: 'Error saving location' });
  }
});

// Endpoint for child login
app.post('/childlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await admin.auth().getUserByEmail(email);
    const user = userCredential.toJSON();
    console.log('Child logged in:', user.email);

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const loginRef = admin.firestore().collection('loginLogs').doc();
    await loginRef.set({
      email: user.email,
      loginTime: new Date(),
      ipAddress: ipAddress,
      role: "child",
    });

    res.status(200).json({ message: 'Child login successful', user });
  } catch (error) {
    console.error('Error logging in (child):', error.message);
    res.status(401).json({ message: 'Login failed. Check your email or password.' });
  }
});

// Endpoint for user (parent) login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await admin.auth().getUserByEmail(email);
    const user = userCredential.toJSON();
    console.log('User logged in:', user.email);

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const loginRef = admin.firestore().collection('loginLogs').doc();
    await loginRef.set({
      email: user.email,
      loginTime: new Date(),
      ipAddress: ipAddress,
      role: "parent",
    });
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(401).json({ message: 'Login failed. Check your email or password.' });
  }
});

// ------------------- Quiz Feature Endpoints-------------------

// Endpoint to post quiz data (parent can add quiz)
app.post('/add-quiz', async (req, res) => {
  const { question, options, correctAnswer } = req.body;

  try {
    const quizRef = admin.firestore().collection('quiz');
    await quizRef.add({
      question,
      options,
      correctAnswer,
    });

    res.status(200).json({ message: 'Quiz question added successfully' });
  } catch (error) {
    console.error('Error adding quiz:', error);
    res.status(500).json({ message: 'Error adding quiz question' });
  }
});

// Endpoint to fetch quiz data (child can fetch quiz)
app.get('/child-quiz', async (req, res) => {
  try {
    const quizSnapshot = await admin.firestore().collection('quiz').get();

    if (quizSnapshot.empty) {
      return res.status(404).json({ message: 'No quiz data found' });
    }

    const quizData = [];
    quizSnapshot.forEach(doc => {
      const data = doc.data();
      quizData.push({
        question: data.question,
        options: data.options,
        correctAnswer: data.correctAnswer,
      });
    });

    res.status(200).json(quizData); // Send quiz data as JSON
  } catch (error) {
    console.error("Error fetching quiz data from Firestore:", error);
    res.status(500).json({ message: "Error fetching quiz data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
