import React, { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

function Chat() {
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5265/chat")
            .build();

        connection.on("ReceiveMessage", (user, message, userName) => {
            const li = document.createElement("li");
            document.getElementById("messagesList").appendChild(li);
            li.textContent = `${user} us ${userName} says ${message}`;
        });
        

        connection.start().then(() => {
            console.log("connected");
        }).catch(err => console.error(err.toString()));

        const joinChatRoom = () => {
            connection.invoke("JoinChatRoom", document.getElementById("roomInput").value)
                .catch(err => console.error(err.toString()));
        };

        const sendMessage = (e) => {
            e.preventDefault();
            const user = document.getElementById("userInput").value;
            const message = document.getElementById("messageInput").value;
            const room = document.getElementById("roomInput").value;
            connection.invoke("SendMessage", room, user, message, "user")
                .catch(err => console.error(err.toString()));
        };

        document.getElementById("joinButton").addEventListener("click", joinChatRoom);
        document.getElementById("sendButton").addEventListener("click", sendMessage);

        // Cleanup event listeners on component unmount
        return () => {
            document.getElementById("joinButton").removeEventListener("click", joinChatRoom);
            document.getElementById("sendButton").removeEventListener("click", sendMessage);
        };
    }, []);

    return (
        <div className="container">
            <div className="row p-1">
                <div className="col-1">Chatroom ID</div>
                <div className="col-5"><input type="text" id="roomInput" /></div>
            </div>
            <div className="row p-1">
                <div className="col-1">User</div>
                <div className="col-5"><input type="text" id="userInput" /></div>
            </div>
            <div className="row p-1">
                <div className="col-1">Message</div>
                <div className="col-5"><input type="text" className="w-100" id="messageInput" /></div>
            </div>
            <div className="row p-1">
                <div className="col-6 text-end">
                    <input type="button" id="sendButton" value="Send Message" />
                    <input type="button" id="joinButton" value="Join" />
                </div>
            </div>
            <div className="row p-1">
                <div className="col-6">
                    <hr />
                </div>
            </div>
            <div className="row p-1">
                <div className="col-6">
                    <ul id="messagesList"></ul>
                </div>
            </div>
        </div>
    );
}

export default Chat;
