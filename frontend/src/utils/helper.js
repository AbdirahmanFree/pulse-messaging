export function groupMessages(messages){
    if(messages.length <=1){
        return messages.length === 0 ? [] : [messages]
    }
    let groupedMessages =[]
    let group = []
    for(let i = messages.length-1;i >=0;i--){
        if(i === messages.length -1){
            group.unshift(messages[messages.length-1])
        }
        else{
            if(group.length === 0){
                group.unshift(messages[i])
                continue
            }
            
            const t1 = new Date(group[group.length-1].sent_at).getTime()
            const t2 = new Date(messages[i].sent_at).getTime()
            const difference = Math.abs(t1-t2)
            if(difference < 15*60 *1000){
                group.unshift(messages[i])
                continue
            }
            else{
                groupedMessages.unshift(group)
                group = [messages[i]]
                continue
            }
        }
    }
    if(group.length >0){
        groupedMessages.unshift(group)
    }
    return groupedMessages
}

export function formatDate(date){
    const dateThen = new Date(date)
    const dateNow = new Date()
    if(dateNow.getTime()-dateThen.getTime() < 7*24*60*60*1000){
        if(dateNow.getTime()- dateThen.getTime() < 24*60*60*1000 && dateNow.getDay() === dateThen.getDay()){
            return dateThen.toLocaleTimeString([],{hour:'numeric', minute:'2-digit'})
        }
        const day = dateThen.getDay()
        const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        return `${week[day].slice(0,3)} ${dateThen.toLocaleTimeString([],{hour:'numeric', minute:'2-digit'})}`
    }
    else{
        
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December']
        const month = months[dateThen.getMonth()]
        const day = dateThen.getDate()
        const year = dateThen.getFullYear()
        return `${month.slice(0,3)}, ${day}, ${year}, ${dateThen.toLocaleTimeString([],{hour:'numeric', minute:'2-digit'})}`
    }

}
