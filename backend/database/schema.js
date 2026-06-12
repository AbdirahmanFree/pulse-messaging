import sql from "./db.js";
const createUserTable = async () => {

    await sql`CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        phone_number TEXT UNIQUE NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        joined_at TIMESTAMPTZ DEFAULT NOW() 
    )
                `
}

const createChatTable = async () => {
    await sql`CREATE TABLE IF NOT EXISTS chats (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW()
    )`
}

const createMessageTable = async () => {
    await sql`CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type_of TEXT NOT NULL DEFAULT 'text',
        CHECK (type_of IN ('text','image','video','audio','file')),
        content TEXT,
        file_url TEXT,    
        sent_at TIMESTAMPTZ DEFAULT NOW() 
    )`
}

const createChatParticipant = async () => {
    await sql`CREATE TABLE IF NOT EXISTS chat_participants (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        joined_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(chat_id,user_id)
    )`
}

export async function initDb(){
    await createUserTable()
    await createChatTable()
    await createMessageTable()
    await createChatParticipant()
    console.log("initialized databases")
}