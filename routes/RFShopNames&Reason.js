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




  //create the route and function to got all user information from database

router.get('/shopNamesReasons', (req, res) => {

  const query = `SELECT * FROM shopNameReasons WHERE 1`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});







router.post('/shopDetails', (req, res) => {
  const shopDetails = req.body;

  const {shopName,finance,CustomerServiceLeader,warehouseManager,warehouses} = shopDetails;

  const sql = `INSERT INTO shopDetails (shopName,finance,customerServiceLeader,warehouses,warehouseManager) VALUES (?, ?, ?,?,?)`;

  connection.query(sql, [shopName,finance,CustomerServiceLeader, JSON.stringify(warehouses),warehouseManager], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while inserting data.' });
    } else {
      console.log('Successfully inserted', result);
      res.json({ insertId: result.insertId }); // Return the insertId on successful insertion
    }
  });
});


router.get('/shopDetails',(req,res)=>{
  const query = `SELECT * FROM shopDetails WHERE 1`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
})



router.put('/warehouseNames', (req, res) => {
  const newWarehouseNames = req.body;

  let sql = `UPDATE shopNameReasons SET warehouseNames='${[newWarehouseNames]}' WHERE id=1`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("successfully updated", result);
    res.json(result);;
  });

});


router.put('/reasons', (req, res) => {

  const newReasons = req.body;
  console.log(newReasons);

  let sql = `UPDATE shopNameReasons SET reasons='${[newReasons]}' WHERE id=1`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("successfully updated", result);
    res.json(result);;
  });

});

//create the route and function to delete a specific user information according to the email address

router.delete('/shop/delete/:id', (req, res) => {
  // INSERT INTO `players`(`id`, `name`, `club`) VALUES ('[value-1]','[value-2]','[value-3]')
  console.log(req.params.id);


  const sql = `DELETE FROM shopDetails WHERE id=?`;
  connection.query(sql, [req.params.id], function (err, result) {
    if (err) throw err;
    console.log("successfully Delete", result);
    res.json(result);
  });
});

// router.put('/shopNames', (req, res) => {
//   const newShopNames = req.body;
//   console.log(newShopNames);

//   // Assuming that the column for shopNames is called "shopNames" and the table name is "shopname_and_reasons"
//   const sql = 'UPDATE shopNameReasons SET shopNames=? WHERE id=1';

//   connection.query(sql, [newShopNames], function (err, result) {
//     if (err) {
//       console.error('Error updating shop names:', err);
//       return res.status(500).json({ error: 'Failed to update shop names' });
//     }

//     console.log('Successfully updated:', result);
//     return res.json(result);
//   });
// });


  module.exports=router;