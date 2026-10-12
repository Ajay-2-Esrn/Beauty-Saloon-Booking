const mysql = require("mysql2/promise");
require('dotenv').config
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post('/adminLogin', async (req, res) => {
    let DB;
    try {
        DB = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        const { adminUsername, adminPassword } = req.body
        const adminDataSql = `SELECT username,password FROM beautysaloonadmin WHERE username=? AND password=?`
        const [adminData] = await DB.execute(adminDataSql, [adminUsername, adminPassword])
        console.log(adminData)

        if (adminData.length > 0) {
            res.status(200).json({
                message: "Admin Login Success"
            })
        }
        else {
            res.status(401).json({
                message: "Invalid Username Or Password"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Fetch Error" || error
        })
    }
    finally {
        if (DB) {
            await DB.end()
        }
    }
})

app.post('/userLogin', async (req, res) => {
    let DB;
    try {
        DB = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        const { userUsername, userPassword } = req.body
        const userDataSql = `SELECT name,phone,username,password FROM registeredusers WHERE username=? AND password=?`
        const [userData] = await DB.execute(userDataSql, [userUsername, userPassword])

        if (userData.length > 0) {
            res.status(200).json({
                message: "User Login Success",
                name: userData[0].name,
                phone: userData[0].phone
            })
        }
        else {
            res.status(401).json({
                message: "Invalid Username or Password"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Server Fetch Error",
            error: error.data
        })
    }
})

app.post('/registerUser', async (req, res) => {
    let DB;
    try {
        DB = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        const { regName, regPhone, regUsername, regPassword } = req.body
        const regUserSql = `INSERT INTO registeredusers (name,phone,username,password) VALUES (?,?,?,?)`
        const [regUserData] = await DB.execute(regUserSql, [regName, regPhone, regUsername, regPassword])

        if (regUserData.affectedRows > 0) {
            res.status(200).json({
                message: "User Registered"
            })
        }
        else {
            res.json({
                message: "Register Failed"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Fetch Failed"
        })
    }
    finally {
        if (DB) {
            await DB.end()
        }
    }
})

app.post('/regBookings', async (req, res) => {
    let DB;
    try {
        DB = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        const { name, phone, service, date } = req.body
        const regBookSql = `INSERT INTO bookedusers (name,phone,service,booked_date) VALUES (?,?,?,?)`
        const [bookingData] = await DB.execute(regBookSql, [name, phone, service, date])
        if (bookingData.affectedRows > 0) {
            res.status(200).json({
                message: "Booked Successfully"
            })
        }
        else {
            res.status(401).json({
                message: "Booking Failed"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Server Fetch Failed"
        })
    }
    finally {
        if (DB) {
            await DB.end()
        }
    }
})

app.get('/myBookingList', async (req, res) => {
    let DB;
    try {
        DB = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        const { phone } = req.query
        const bookingListSql = `SELECT id,name,phone,service,booked_date,reg_date FROM bookedusers WHERE phone=?`
        const [myBookingList] = await DB.execute(bookingListSql, [phone])
        if (myBookingList.length > 0) {
            res.json(myBookingList)
        }
        else {
            console.log("Empty My Booking List")
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Fetch Faiiled"
        })
    }
    finally {
        if (DB) {
            await DB.end()
        }
    }
})

app.put('/removeMyBook', async (req, res) => {
    let DB;
    try {
        DB = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        const { userId } = req.body
        const removeMyBookSql = `DELETE FROM bookedusers WHERE id=?`
        const [removedBookData] = await DB.execute(removeMyBookSql, [userId])
        if (removedBookData.affectedRows > 0) {
            res.status(200).json({
                message: "Removed"
            })
        }
        else {
            res.status(401).json({
                message: "Failed To Remove"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Fetch Failed"
        })
    }
    finally {
        if (DB) {
            await DB.end()
        }
    }
})

app.get('/allBookedList', async (req, res) => {
    let DB;
    try {
        DB = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        const [allBookedData] = await DB.query("SELECT id,name,phone,reg_date,booked_date,service FROM bookedusers");
        if (allBookedData.length > 0) {
            res.json(allBookedData)
        }
        else {
            res.status(401).json({
                message: "Empty List"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Fetch Error"
        })
    }
    finally {
        if (DB) {
            await DB.end()
        }
    }
})

app.listen(3000, () => {
    console.log("Server Running at Port 3000")
})