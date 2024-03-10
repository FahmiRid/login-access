const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const users = [
  {
    name: 'user1',
    password: '123',
    permission_id: '123',
    permission_list: {
      C: 0,
      R: 0,
      U: 0,
      D: 0,
      A: 0,
    },
  },
  {
    name: 'user2',
    password: '123',
    permission_id: '456',
    permission_list: {
      C: 1,
      R: 0,
      U: 1,
      D: 0,
      A: 1,
    },
  },
  {
    name: 'user3',
    password: '123',
    permission_id: '789',
    permission_list: {
      C: 1,
      R: 1,
      U: 1,
      D: 1,
      A: 1,
    },
  },
];

const roleList = [
  {
    "page_size": 5,
    "total_records": 18,
    "page": 1,
    "search_text": "ASB",
    "data": [
      {
        "role_name": "ASB maker",
        "product_line": "ASB",
        "status": "1"
      },
      {
        "role_name": "ASB Checker",
        "product_line": "ASB",
        "status": "1"
      },
      {
        "role_name": "Mortgage Maker",
        "product_line": "Mortgage",
        "status": "1"
      },
      {
        "role_name": "Mortgage Checker",
        "product_line": "Mortgage",
        "status": "1"
      },
      {
        "role_name": "DW Maker",
        "product_line": "Digital Wealth",
        "status": "1"
      },
      {
        "role_name": "DW Checker",
        "product_line": "Digital Wealth",
        "status": "1"
      },
      {
        "role_name": "ASB maker",
        "product_line": "ASB",
        "status": "0"
      },
      {
        "role_name": "ASB Checker",
        "product_line": "ASB",
        "status": "0"
      },
      {
        "role_name": "Mortgage Maker",
        "product_line": "Mortgage",
        "status": "0"
      },
      {
        "role_name": "Mortgage Checker",
        "product_line": "Mortgage",
        "status": "0"
      },
      {
        "role_name": "DW Maker",
        "product_line": "Digital Wealth",
        "status": "0"
      },
      {
        "role_name": "DW Checker",
        "product_line": "Digital Wealth",
        "status": "0"
      },
      {
        "role_name": "ASB maker",
        "product_line": "ASB",
        "status": "1"
      },
      {
        "role_name": "ASB Checker",
        "product_line": "ASB",
        "status": "1"
      },
      {
        "role_name": "Mortgage Maker",
        "product_line": "Mortgage",
        "status": "1"
      },
      {
        "role_name": "Mortgage Checker",
        "product_line": "Mortgage",
        "status": "1"
      },
      {
        "role_name": "DW Maker",
        "product_line": "Digital Wealth",
        "status": "1"
      },
      {
        "role_name": "DW Checker",
        "product_line": "Digital Wealth",
        "status": "1"
      },
      {
        "role_name": "ASB maker",
        "product_line": "ASB",
        "status": "0"
      }
    ]
  }
]

const productline = [
  [
    {
      "id": "1",
      "name": "ASB"
    },
    {
      "id": "2",
      "name": "Mortgage"
    },
    {
      "id": "3",
      "name": "Digital Wealth"
    }
  ]
]

const sports = [
  { id: 1, title: "MORTGAGE" },
  { id: 2, title: "ASB" },
  { id: 3, title: "DIGITAL WEALTH" },
];

app.get('/api/sports', (req, res) => {
  res.json(sports);
});

app.get('/api/rolelist', (req, res) => {
  res.json(roleList);
});

app.get('/api/productline', (req, res) => {
  res.json(productline);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.name === username && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful', user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
