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

export const getPhoneNumbers = async(number)=>{
    return await sql`SELECT phone_number, first_name, last_name, id FROM users
                    WHERE phone_number LIKE ${`%${number}%`}`
}

export const getChats = async(user_id)=>{
    return await sql`SELECT chats.id, chats.is_group, CONCAT(recepient.first_name, ' ', recepient.last_name) as name, recepient.id as recepient_id, chats.updated_at FROM chats
                     JOIN chat_participants as cp_1 ON cp_1.chat_id = chats.id
                     JOIN chat_participants as cp_2 ON cp_2.chat_id = chats.id AND cp_2.user_id != cp_1.user_id 
                     JOIN users as recepient ON recepient.id = cp_2.user_id
                     WHERE cp_1.user_id = ${user_id} AND NOT chats.is_group
                     ORDER BY chats.updated_at DESC`
}

export const getGroupChats = async(user_id) => {
    return await sql`SELECT chats.id, chats.is_group, chats.name, chats.updated_at FROM chats 
                     JOIN chat_participants ON chat_participants.user_id = ${user_id} AND chat_participants.chat_id = chats.id
                     WHERE chats.is_group
                     ORDER BY chats.updated_at DESC `

}

export const getChat = async(user_id,chat_id) =>{
    const chat = (await sql`SELECT * FROM chats
                    WHERE chats.id = ${chat_id}`)[0]
    if(chat.is_group){
        return (await sql`SELECT chats.id, chats.is_group, chats.name, chats.updated_at FROM chats
                        WHERE chats.id = ${chat_id}`)[0]
    } else{
        return (await sql`SELECT chats.id, chats.is_group, CONCAT(recepient.first_name, ' ', recepient.last_name) as name, recepient.id as recepient_id, chats.updated_at FROM chats
                        JOIN chat_participants as cp1 ON cp1.chat_id = ${chat_id} AND cp1.user_id = ${user_id}
                        JOIN chat_participants as cp2 ON cp2.chat_id = ${chat_id} AND cp1.id != cp2.id
                        JOIN users as recepient ON recepient.id = cp2.user_id
                        WHERE chats.id = ${chat_id}`)[0]
    }
}

export const getUserName = async(user_id)=>{
    return (await sql`SELECT first_name, last_name FROM users
                    WHERE users.id = ${user_id} `)[0]
}

export const deleteUser =async(user_id)=> {
    await sql`DELETE FROM users
                WHERE users.id =${user_id}`
}

export const getDirectChat= async(user1_id,user2_id) =>{
    return (await sql`SELECT * FROM chats
            JOIN chat_participants as cp1 ON cp1.chat_id = chats.id AND cp1.user_id = ${user1_id}
            JOIN chat_participants as cp2 ON cp2.chat_id = chats.id AND cp2.user_id = ${user2_id} AND cp1.id != cp2.id
            WHERE NOT chats.is_group`)[0]
}

export const addChat = async(user_id,recepient_id) =>{
   const [chat] = await sql`INSERT INTO chats(is_group)
                            VALUES(FALSE)
                            RETURNING*`
    await sql`INSERT INTO chat_participants(chat_id,user_id)
                            VALUES(${chat.id},${user_id})`
    await sql`INSERT INTO chat_participants(chat_id,user_id)
                            VALUES(${chat.id},${recepient_id})`
    
    return chat
   
}

export const addMessage = async(user_id,chat_id,message,type) =>{
    
        await sql`INSERT INTO messages(sender_id,chat_id,content)
                                VALUES(${user_id},${chat_id},${message})`
}

export const sendMessage = async(object) =>{
    if(object.type === "text"){
        await sql`INSERT INTO messages(chat_id,sender_id,type,content)
                                VALUES(${object.chatId},${object.senderId},${object.type},${object.content})`
    }
    else{
        await sql`INSERT INTO messages(chat_id,sender_id,type,file_url)
                                VALUES(${object.chatId},${object.senderId},${object.type},${object.fileUrl})`
    }

}

export const getChatMessages = async(chatId) => {
    return await sql`SELECT * FROM messages
                        WHERE messages.chat_id = ${chatId}
                        ORDER BY messages.sent_at DESC`
}




