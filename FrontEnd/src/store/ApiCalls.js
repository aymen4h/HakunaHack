export const getNews = async() => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    var res = await fetch("api/News/GetNews/3", {
        method: "get",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        })
    });    
    
    return res;
}
export const createNewsCall = async(body) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    var res = await fetch("api/News/CreateNew",{
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }),
        body : JSON.stringify(body),
    });
}
export const getMoeNewsCall = async(lastdat) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    var res = await fetch(`api/News/GetMoreNews/3/${lastdat}`, {
        method: "get",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        })
    });    
    
    return res;
}
export const loginCall = async( body ) => {
    
    var res = await fetch("Auth/Login", {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(body)
    })

    const data = await res.json();
    
    return data;
}
export const registerCall = async( body ) => {
    
    var res = await fetch("Auth/Register", {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json"
            
        }),
        body: JSON.stringify(body)
    });

    const data = await res.json();
    
    return data;
}
export const NewsForAdminCall = async() => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    console.log("ddd")
    var res = await fetch("api/News/GetForAdmin",{
        method: "get",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        })
    });
    return res;
}
export const PlacesForAdminCall = async() => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    var res = await fetch("api/Map/GetPlacesForAdmin",{
        method: "get",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        })
    });
    return res;
}
export const acceptNews = async(id) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    var res = await fetch(`api/News/UpdateNewsStatus/${id}`,{
        method: "put",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        })
    });
    return res;
}
export const removeNews = async(id) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    var res = await fetch(`api/News/RemoveNews/${id}`,{
        method: "delete",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        })
    });
    return res;
}
export const removePlaces = async(id) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    var res = await fetch(`api/Map/RemovePlaces/${id}`,{
        method: "delete",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        })
    });
    return res;
}
export const acceptPlaces = async(id) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    var res = await fetch(`api/Map/UpdatePlacesStatus/${id}`,{
        method: "put",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        })
    });
    return res;
}
export const getPlaces = async() => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    var res = await fetch("api/Map/GetPlaces", {
        method: "get",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        })
    });    
    
    return res;
}
export const createPlaceCall = async(body) => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    var res = await fetch(`api/Map/CreatePlace`, {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }),
        body : JSON.stringify(body),
    })
}
export const getChatRoomByName = async(name) => {
    const userObject = JSON.parse(localStorage.getItem('user'));
    const userId = userObject.userS.id;
    var res = await fetch(`api/Chat/GetRoomByName/${name}/${userId}`, {
        method: "get",
        headers: new Headers({
            "Content-Type": "application/json",
            
        })
    });    
    
    return res;
}
export const getChatRoomByuserId = async() => {
    const userObject = JSON.parse(localStorage.getItem('user'));
    const userId = userObject.userS.id;
    var res = await fetch(`api/Chat/GetRoomsForUser/${userId}`, {
        method: "get",
        headers: new Headers({
            "Content-Type": "application/json",
            
        })
    });    
    
    return res;
}
export const CreateNewChatRoom = async(body) => {

    var res = await fetch(`api/Chat/CreateNewChatRoom`, {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body : JSON.stringify(body),
    })
    console.log(JSON.stringify(body))
    return res;
}
export const joinChatRoomCall = async(body) => {

    var res = await fetch(`api/Chat/Join`, {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body : JSON.stringify(body),
    })
    return res;
}
export const GetMessages = async(roomId) => {
    var res = await fetch(`api/Chat/GetMessages/${roomId}`, {
        method: "get",
        headers: new Headers({
            "Content-Type": "application/json",
            
        })
    });    
    
    return res;
}
export const GetMoreMessages = async(roomId, lastdate) => {
    var res = await fetch(`api/Chat/GetMoreMessages/${roomId}/${lastdate}`, {
        method: "get",
        headers: new Headers({
            "Content-Type": "application/json",
            
        })
    });    
    
    return res;
}