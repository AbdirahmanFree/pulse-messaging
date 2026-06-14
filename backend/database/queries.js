import sql from "./db.js";

export const addUser = async(user) =>{
    await sql`INSERT INTO users (first_name, last_name, phone_number, password)
        VALUES (${user.firstName}, ${user.lastName}, ${user.phoneNumber}, ${user.password})`
}

export const getUserFromNumber = async(phoneNumber) =>{
    return await sql`SELECT * FROM users
              WHERE phone_number=${phoneNumber}`
}

export const getPhoneNumber = async (id) => {
    return await sql`SELECT phone_number FROM users
                     WHERE id = ${id}`
}



