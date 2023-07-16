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

  router.get('/warehouseRequest', (req, res) => {
    const query = `SELECT * FROM refundrequest WHERE customerServiceLeaderStatus = "true" AND wareHouseStatus = "false"`;
  
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

  router.get('/LeaderStatusRequest', (req, res) => {
    const query = `SELECT * FROM refundrequest WHERE customerServiceStatus = "true" AND customerServiceLeaderStatus = "false"`;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.json(results);
      }
    });
  });



router.post('/refundRequest/add', (req, res) => {
    console.log("connect router")
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
      applicantName,
      applicationDate,
      customerServiceStatus,
      customerServiceLeaderStatus,
      warehouseStatus,
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
      applicantName,
      applicationDate,
      customerServiceStatus,
      customerServiceLeaderStatus,
      warehouseStatus,
      financeStatus,
      supplierStatus,
      special
    ];

    console.log(formData)
  
    let sql =
      'INSERT INTO refundrequest ( orderNumber,orderTime, shopName, customerUsername, customerOrderNumber, orderDate, orderAmount, customerReturnTrackingNumber, refundReason, otherReason, refundAmount, customerReceivingAmount, customerReceivingAccount, customerBankName, customerBankAccountName, customerBankSwift, remarks, applicantName, applicationDate,CustomerServiceStatus,CustomerServiceLeaderStatus,wareHouseStatus,	financeStatus,supplierStatus,special) VALUES (?)';
  
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
  
  

 
  router.delete('/refundRequest/delete/:orderNumber', (req, res) => {
  
    const sql = `DELETE FROM refundrequest WHERE orderNumber=?`;
    connection.query(sql, [req.params.orderNumber], function (err, result) {
      if (err) throw err;
      console.log("successfully Delete", result);
      res.json(result);
    });
  });


    
  
   
  

  module.exports=router;