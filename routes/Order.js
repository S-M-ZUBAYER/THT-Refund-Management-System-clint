const express = require("express");
const connection = require("../config/db");
const router = express.Router();
const cors = require('cors');
const app = express();
app.use(cors());
const fs = require('fs');

// import multer from "multer" to upload file in the backend
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// import path from "path" to get the specific path of any file
const path = require("path")

// Set the specific folder to show the file
router.use(express.static('public'))

// create the structure to upload the file with specific name
const orderImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/orderImages')
  },
  filename: (req, file, cb) => {
    const orderNumber = req.params.orderNumber;
    const fileName = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);

    // Create a link to the image and store it in the database
    const imageUrl = `/orderImages/${fileName}`;
    const sql = `INSERT INTO orderImages (orderNumber, imageUrl) VALUES (?, ?)`;
    connection.query(sql, [orderNumber, imageUrl], (err, result) => {
      if (err) {
        console.error(`Error inserting image URL into the database: ${err}`);
      } else {
        console.log(`Image URL inserted into the database: ${imageUrl}`);
      }
    });
  }
})


const warehouseImagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/orderImages')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
});

// declare the multer
const warehouseImagesStorageUpload = multer({
  storage: warehouseImagesStorage
});


router.put('/orderUpdate/:orderNumber', warehouseImagesStorageUpload.fields([{ name: 'images' }]), (req, res) => {
  const orderNumber = req.params.orderNumber;
  const { trackingNumber, warehouseBy } = req.body; // Extract additional fields from the request body
  console.log(orderNumber, "img");

  // Extract filenames of all images from the uploaded files
  const allImages = req.files['images']?.map((file) => file.filename);

  let sql = `UPDATE orderdetails SET warehouseOrderImg = ?, trackingNumber = ?, warehouseBy  = ? WHERE orderNumber = ?`;

  connection.query(sql, [allImages.join(','), trackingNumber, warehouseBy, orderNumber], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error occurred during data update.');
    } else {
      console.log('Successfully updated.');
      res.json(result);
    }
  });
});


router.put('/orderStatusUpdate/:orderNumber', (req, res) => {
  const orderNumber = req.params.orderNumber; // Extract orderNumber from the URL parameter

  let sql = `UPDATE orderdetails SET warehouseStatus = ? WHERE orderNumber = ?`;

  connection.query(sql, [true, orderNumber], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error occurred during data update.');
    } else {
      console.log('Successfully updated the status.');
      res.json(result);
    }
  });
});



//new one for order
router.post('/order/add', (req, res) => {
  const orderDetails = req.body;

  const {orderNumber,productName,modelNo,image,quantity,price,color,colorImg,customerName, customerPhone,email, remark,orderDate,orderTime,city,state,country,address,deliveryCharge,orderTrackingNo, warehouseName } = orderDetails;

  const sql = `INSERT INTO orderDetails (orderNumber,productName,modelNo,image,quantity,price,color,colorImg,customerName, customerPhone,email,remark,orderDate,orderTime,city,state,country,address,deliveryCharge,orderTrackingNo,warehouseName) VALUES (?,?,?, ?,?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  connection.query(sql, [orderNumber,productName,modelNo,image,quantity,price,color,colorImg,customerName, customerPhone,email,remark,orderDate,orderTime,city,state,country,address,deliveryCharge,orderTrackingNo,warehouseName], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while inserting data.' });
    } else {
      console.log('Successfully inserted', result);
      res.json({ insertId: result.insertId }); // Return the insertId on successful insertion
    }
  });
});


router.get('/allOrder/:orderNumber', (req, res) => {
  const orderNumber = req.params.orderNumber; // Get the orderNumber from the URL parameter

  const query = `SELECT * FROM orderDetails WHERE orderNumber = ?`; // Modify the query to filter by orderNumber

  connection.query(query, [orderNumber], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});


router.get('/allFinishOrder', (req, res) => {


  const query = `SELECT * FROM orderDetails WHERE warehouseStatus = true`; // Add condition for warehouseStatus

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});



router.get('/allOrder', (req, res) => {

  const query = `SELECT * FROM orderDetails WHERE 1`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});

router.get('/allWarehouseOrder', (req, res) => {
  const query = 'SELECT * FROM orderDetails WHERE warehouseStatus = false';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});

router.get('/allFinishedOrder', (req, res) => {
  const query = 'SELECT * FROM orderDetails WHERE warehouseStatus = 1';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});



router.get('/order/:id', (req, res) => {
  const orderId = req.params.id; // Get the 'id' parameter from the request URL

  const query = `SELECT * FROM orderDetails WHERE id = ?`; // Use a placeholder for the 'id'

  connection.query(query, [orderId], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        res.json(results[0]); // Return the first (and presumably only) result
      }
    }
  });
});







  router.delete('/order/delete/:id', (req, res) => {
  
    const sql = `DELETE FROM orderDetails WHERE id=?`;
    connection.query(sql, [req.params.id], function (err, result) {
      if (err) throw err;
      console.log("successfully Delete", result);
      res.json(result);
    });
  });


    
  
   
  

  module.exports=router;