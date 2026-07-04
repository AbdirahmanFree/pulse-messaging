export function combineChats(chat1,chat2){
    if(chat2.length <=0){
        return chat1
    }
    if(chat1.length <=0){
        return chat2
    }
    const time1 = new Date(chat1[0].updated_at).getTime()
    const time2 = new Date(chat2[0].updated_at).getTime()
    if(time1>= time2){
        return chat1.slice(0,1).concat(combineChats(chat1.slice(1),chat2))
    }
    else{
        return chat2.slice(0,1).concat(combineChats(chat1,chat2.slice(1)))
    }
}
