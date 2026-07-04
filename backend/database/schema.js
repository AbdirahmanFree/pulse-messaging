import sql from "./db.js";
const createUserTable = async () => {

    await sql`CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        phone_number TEXT UNIQUE NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        password TEXT NOT NULL,
        joined_at TIMESTAMPTZ DEFAULT NOW() 
    )
                `
}

const createChatTable = async () => {
    await sql`CREATE TABLE IF NOT EXISTS chats (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        is_group BOOLEAN NOT NULL DEFAULT FALSE,
        name TEXT,
        CONSTRAINT group_name_required
        CHECK (
                (NOT is_group) OR (name IS NOT NULL)
            )


    )`
}

const createMessageTable = async () => {
    await sql`CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
        sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type TEXT NOT NULL DEFAULT 'text',
        CHECK (type IN ('text','image','video','audio','file')),
        content TEXT,
        file_url TEXT,   
        CHECK(content IS NOT NULL OR file_url IS NOT NULL), 
        sent_at TIMESTAMPTZ DEFAULT NOW() 
    )`
}

const createmessageReadsTable = async () =>{
    await sql`CREATE TABLE IF NOT EXISTS message_reads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        read_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(message_id,user_id)
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

const createTableIndexes = async () => {
    await sql`CREATE INDEX IF NOT EXISTS idx_messages_chat_id
            ON messages(chat_id) `

    await sql`CREATE INDEX IF NOT EXISTS idx_message_reads_message_id
            ON message_reads(message_id)`

    await sql`CREATE INDEX IF NOT EXISTS idx_chat_participants_user_id
            ON chat_participants(user_id)`
    
    await sql`CREATE INDEX IF NOT EXISTS idx_chat_participants_chat_id
            ON chat_participants(chat_id)`
}

export async function initDb(){
    await createUserTable()
    await createChatTable()
    await createMessageTable()
    await createChatParticipant()
    await createmessageReadsTable()
    await createTableIndexes()
    console.log("initialized databases")
}

initDb()