import express from "express";
import bcrypt from "bcrypt";
import {pool} from "../db.js"
import jwt from "jsonwebtoken";


const router = express.Router(); //used to create the group or creating a group of area such as auth, payment, users, courses....in short 
                                    // /api/auth/register and /api/auth/login can be combined in route auth and main index.js only sends it to the auth and later it is transferred automatically to register and login

router.post("/register", async (req,res) => {

    try {
        const {full_name, email, password} = req.body
        console.log("body",req.body)

        if(!full_name || !email || !password){
            return res.status(400).json({ok:false, message: "full_name email and passwords are required fields"})
        }
        if(String(password).length < 6){
            return res.status(400).json({ok: false, message: "Password must contain atleast 6 Characters"})
        }

        const cleanEmail = email.trim().toLowerCase();

        // 1) first check if email already exists

        const exists = await pool.query("SELECT id FROM users WHERE email = $1", [cleanEmail])

        if(exists.rows.length > 0){
            return res.status(409).json({ ok: false, message: "Email already registered" });
        }

        // 2) hash passwords
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds)

        console.log("password modification -->", password, passwordHash);

        const query = `INSERT INTO users (full_name, email, password_hash)
                        VALUES ($1, $2, $3)
                        RETURNING id, full_name, email, created_at`

        const values = [full_name.trim(), cleanEmail, passwordHash]
        const insert = await pool.query(query, values)

        const user = insert.rows[0]
        return res.status(201).json({ok:true, user})



    } catch (error) {
        console.error("Register error:", error);
    return res.status(500).json({ ok: false, message: "Registration failed" });
    }
})


router.post("/login", async (req,res) => {
    try {
        
        const {email, password} = req.body
        

        if(!email || !password){
            return res.status(400).json({
                ok:false,
                message: "Email and Password are required"
            })
        }

        const cleanEmail = email.trim().toLowerCase()

        const query = "SELECT id, full_name, email, password_hash FROM users WHERE email = $1"

        const result = await pool.query(query, [cleanEmail])
        

        if(result.rows.length === 0){
            return res.status(401).json({
                ok: false,
                message: "User does not exist...Please check the Email or Create a new Account"

            })
        }

        const user = result.rows[0]
        console.log("✅ user from backend:", user)

        // compare password
        const isMatch = await bcrypt.compare(password, user.password_hash)

        if(!isMatch){
            console.log("!!!!!!! meesage from backend: password is wrong!")
            return res.status(401).json({
                ok: false,
                message: "Invalid email or password"
            });
            
        }

        // success
        console.log("✅ meesage from backend: password is macthed and login is possible")

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            ok: true,
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email
            }
        });
        
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            ok: false,
            message: "Login failed"
        });
    }
})



export default router;