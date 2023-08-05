export const utilsManager = {
    addChild(parentIdentifier, childContent) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.insertAdjacentHTML("beforeend", childContent);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },

    addChildAtStart(parentIdentifier, childContent) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.insertAdjacentHTML("afterbegin", childContent);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },

    parseDate(date){
        const dateFormat = new Date(date)
        let parsedDate = dateFormat.getDate()+
           "/"+(dateFormat.getMonth()+1)+
           "/"+dateFormat.getFullYear()+
           " "+dateFormat.getHours()+
           ":"+dateFormat.getMinutes()+
           ":"+dateFormat.getSeconds();
    
        return parsedDate       
    }

};



export async function apiPost(payload) {
    const response = await fetch(`https://77-haks/catchNui`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload) 
    })

    if (response.ok) {
        return await response.json();
    }
}
