import sql from "./db.js";

export const addUser = async(user) =>{
    await sql`INSERT INTO users (first_name, last_name, phone_number, password)
        VALUES (${user.firstName}, ${user.lastName}, ${user.phoneNumber}, ${user.password})`
}
