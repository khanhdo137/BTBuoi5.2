import axios from 'axios';

const FIREBASE_URL = 'https://firestore.googleapis.com/v1/projects/ex52-c6748/databases/(default)/documents/users';

const addUser = async (email, password) => {
  try {
    const userData = {
      fields: {
        email: { stringValue: email },
        password: { stringValue: password },
        createdAt: { timestampValue: new Date().toISOString() }
      }
    };

    const response = await axios.post(FIREBASE_URL, userData, {
      headers: {
        'Authorization': `Bearer ${YOUR_FIREBASE_AUTH_TOKEN}`, 
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      console.log('Thêm người dùng thành công:', response.data);
    }
  } catch (error) {
    console.error('Lỗi khi thêm người dùng:', error);
  }
};

const email = 'example@gmail.com';
const password = 'your-password';
addUser(email, password);
