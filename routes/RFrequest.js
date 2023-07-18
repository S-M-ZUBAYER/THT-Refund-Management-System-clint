//Require necessary packages

const express = require("express");
const connection = require("../config/db");
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const bodyParser=require('body-parser');
const app=express();
app.use(cors());



//create the route and function to get the the Question Answer store according to the email address

router.get('/refundRequest', (req, res) => {

    const query = `SELECT * FROM refundrequest WHERE 1`;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.json(results);
      }
    });
  });
  

//create the route and function to get the the Question Answer store according to the status

router.get('/allNonSpecialRequest', (req, res) => {
  const query = `SELECT * FROM refundrequest WHERE special = ?`;

  connection.query(query, [false], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});
//create the route and function to get the the Question Answer store according to the status

router.get('/allSpecialRequest', (req, res) => {
  const query = `SELECT * FROM refundrequest WHERE special = ?`;

  connection.query(query, [true], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});
//create the route and function to get the the Question Answer store according to the status

router.get('/warehouseRequest', (req, res) => {
  const query = `SELECT * FROM refundrequest WHERE wareHouseStatus = ? AND special = ?`;

  connection.query(query, ["false", false], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});


  router.get('/warehouseSpecialRequest', (req, res) => {
    const query = `SELECT * FROM refundrequest WHERE wareHouseStatus = ? AND special = ?`;
  
    connection.query(query, ["false", true], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.json(results);
      }
    });
  });

  router.get('/financeRequest', (req, res) => {
    const query = `SELECT * FROM refundrequest WHERE warehouseManagerStatus = ? AND financeStatus = ? AND special = ?`;
  
    connection.query(query, ["true","false", false], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.json(results);
      }
    });
  });
  

  router.get('/financeSpecialRequest', (req, res) => {
    const query = `SELECT * FROM refundrequest WHERE wareHouseStatus = ? AND financeStatus = ? AND CustomerServiceLeaderStatus = ? AND special = ?  `;
  
    connection.query(query, ["true","false","true", true], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.json(results);
      }
    });
  });
  
  


//create the route and function to get the the Question Answer store according to the status

  // router.get('/LeaderStatusRequest', (req, res) => {
  //   const query = `SELECT * FROM refundrequest WHERE customerServiceStatus = "true" AND customerServiceLeaderStatus = "false" AND special = `;
  
  //   connection.query(query, (error, results) => {
  //     if (error) {
  //       console.error('Error executing query:', error);
  //       res.status(500).json({ error: 'An error occurred' });
  //     } else {
  //       res.json(results);
  //     }
  //   });
  // });

  router.get('/LeaderStatusRequest', (req, res) => {
    const query = `SELECT * FROM refundrequest WHERE customerServiceStatus = ? AND CustomerServiceLeaderStatus = ? AND special = ?`;
  
    connection.query(query, ["true", "false", false], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.json(results);
      }
    });
  });


  router.get('/LeaderStatusSpecialRequest', (req, res) => {
    const query = `SELECT * FROM refundrequest WHERE customerServiceStatus = ? AND CustomerServiceLeaderStatus = ? AND special = ?`;
  
    connection.query(query, ["true", "false", true], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.json(results);
      }
    });
  });

  router.get('/refundRequest/:orderNumber', (req, res) => {

   const orderNumber = req.params.orderNumber;
   console.log(orderNumber,"manager")
  const query = 'SELECT * FROM refundrequest WHERE orderNumber = ?';

  connection.query(query, [orderNumber], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if (results.length > 0) {
        res.json(results[0]); // Assuming you only want to retrieve one record
      } else {
        res.status(404).json({ message: 'Refund request not found' });
      }
    }
  });
  });

  router.get('/warehouseManagerRequest', (req, res) => {
    const query = `SELECT * FROM refundrequest WHERE wareHouseStatus = ? AND warehouseManagerStatus = ? AND special = ?`;
  
    connection.query(query, ["true", "false", false], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.json(results);
      }
    });
  });



router.post('/refundRequest/add', (req, res) => {
    const {
      orderNumber,
      orderTime,
      shopName,
      customerUserName,
      customerOrderNumber,
      orderDate,
      orderAmount,
      customerReturnTrackingNumber,
      refundReason,
      otherReason,
      refundAmount,
      customerReceivingAmount,
      customerReceivingAccount,
      customerBankName,
      customerBankAccountName,
      customerBankSwift,
      remarks,
      warehouseImg,
      financeImg,
      applicantName,
      applicationDate,
      customerServiceStatus,
      customerServiceLeaderStatus,
      warehouseStatus,
      warehouseManagerStatus,
      financeStatus,
      supplierStatus,
      special
    } = req.body;
  
    const formData = [
      orderNumber,
      orderTime,
      shopName,
      customerUserName,
      customerOrderNumber,
      orderDate,
      orderAmount,
      customerReturnTrackingNumber,
      refundReason,
      otherReason,
      refundAmount,
      customerReceivingAmount,
      customerReceivingAccount,
      customerBankName,
      customerBankAccountName,
      customerBankSwift,
      remarks,
      warehouseImg,
      financeImg,
      applicantName,
      applicationDate,
      customerServiceStatus,
      customerServiceLeaderStatus,
      warehouseStatus,
      warehouseManagerStatus,
      financeStatus,
      supplierStatus,
      special
    ];

    console.log(formData)
  
    let sql =
      'INSERT INTO refundrequest ( orderNumber,orderTime, shopName, customerUsername, customerOrderNumber, orderDate, orderAmount, customerReturnTrackingNumber, refundReason, otherReason, refundAmount, customerReceivingAmount, customerReceivingAccount, customerBankName, customerBankAccountName, customerBankSwift, remarks, warehouseImg,financeImg, applicantName, applicationDate,CustomerServiceStatus,CustomerServiceLeaderStatus,wareHouseStatus,warehouseManagerStatus,	financeStatus,supplierStatus,special) VALUES (?)';
  
    connection.query(sql, [formData], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error occurred during data insertion.');
      } else {
        console.log('Successfully inserted.');
        res.json(result);
      }
    });
  });
  


  router.put('/refundRequest/update/:orderNumber', (req, res) => {
    const orderNumber = req.params.orderNumber;
  
    const {
      orderTime,
      shopName,
      customerUserName,
      customerOrderNumber,
      orderDate,
      orderAmount,
      customerReturnTrackingNumber,
      refundReason,
      otherReason,
      refundAmount,
      customerReceivingAmount,
      customerReceivingAccount,
      customerBankName,
      customerBankAccountName,
      customerBankSwift,
      remarks,
      applicantName,
      applicationDate,
      special
    } = req.body;
  
    const formData = [
      orderTime,
      shopName,
      customerUserName,
      customerOrderNumber,
      orderDate,
      orderAmount,
      customerReturnTrackingNumber,
      refundReason,
      otherReason,
      refundAmount,
      customerReceivingAmount,
      customerReceivingAccount,
      customerBankName,
      customerBankAccountName,
      customerBankSwift,
      remarks,
      applicantName,
      applicationDate,
      special
    ];
  
    let sql =
      'UPDATE refundrequest SET orderTime = ?, shopName = ?, customerUsername = ?, customerOrderNumber = ?, orderDate = ?, orderAmount = ?, customerReturnTrackingNumber = ?, refundReason = ?, otherReason = ?, refundAmount = ?, customerReceivingAmount = ?, customerReceivingAccount = ?, customerBankName = ?, customerBankAccountName = ?, customerBankSwift = ?, remarks = ?, applicantName = ?, applicationDate = ?, special= ? WHERE orderNumber = ?';
  
    connection.query(sql, [...formData, orderNumber], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error occurred during data update.');
      } else {
        console.log('Successfully updated.');
        res.json(result);
      }
    });
  });
  

//Here make route to update the warehouseStatus update
  router.put('/refundRequest/updateWarehouseStatus/:orderNumber', (req, res) => {
    const orderNumber = req.params.orderNumber;
  
    let sql = `UPDATE refundrequest SET warehouseStatus = ? WHERE orderNumber = ?`;
  
    connection.query(sql, ["true", orderNumber], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error occurred during data update.');
      } else {
        console.log('Successfully updated.');
        res.json(result);
      }
    });
  });

//Here make route to update the  WarehouseManager Status
  router.put('/updateWarehouseManagerStatus/:orderNumber', (req, res) => {
    const orderNumber = req.params.orderNumber;


    let sql = `UPDATE refundrequest SET warehouseManagerStatus = ? WHERE orderNumber = ?`;
  
    connection.query(sql, ["true", orderNumber], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error occurred during data update.');
      } else {
        console.log('Successfully updated.');
        res.json(result);
      }
    });
  });

//Here make route to update the  WarehouseManager Status
  router.put('/updateFinanceStatus/:orderNumber', (req, res) => {
    const orderNumber = req.params.orderNumber;


    let sql = `UPDATE refundrequest SET financeStatus = ? WHERE orderNumber = ?`;
  
    connection.query(sql, ["true", orderNumber], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error occurred during data update.');
      } else {
        console.log('Successfully updated.');
        res.json(result);
      }
    });
  });


  router.put('/updateLeaderStatus/:orderNumber', (req, res) => {
    const orderNumber = req.params.orderNumber;
  
    let sql = `UPDATE refundrequest SET customerServiceLeaderStatus = ? WHERE orderNumber = ?`;
  
    connection.query(sql, ["true", orderNumber], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error occurred during data update.');
      } else {
        console.log('Successfully updated.');
        res.json(result);
      }
    });
  });
  
  

 
  router.delete('/refundRequest/delete/:id', (req, res) => {
  
    const sql = `DELETE FROM refundrequest WHERE id=?`;
    connection.query(sql, [req.params.id], function (err, result) {
      if (err) throw err;
      console.log("successfully Delete", result);
      res.json(result);
    });
  });


    
  
   
  

  module.exports=router;