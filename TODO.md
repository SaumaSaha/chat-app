[x] initial setup

- npm
- eslint
- gitignore

Model the users

```
User:
  fields:
    socket,
    name,
    messages,

  behaviors:
    addMessage => will add the message to list of messages
    getMessages => will give all the messages of the user
    getName => will give the name of the user

Users:
fields:
users => it will be a socket object with key as user-name

behaviors:
addUser => will add a new user
removeUser => will remove the user that has the specific socket or user-name
userIsRegistered => check if the user is present or not
getAllMessages => it will get all the messages sent by users
```

Issues:

- We want to seperate data of specific users
- We have to refactor the code
- We want to create a client of our own
- We want to check the if cases in on connection and send a rich object to the client also

Request format:

{"message": "message", "text": "How are you", "from":"Sauma", "to": "Vidita"}
{"message": "message", "text": "How are you", "from":"Sauma", "to": "Riya"}
{"message": "message", "text": "Kaisi ho", "from":"Vidita", "to": "Riya"}
{"message": "message", "text": "Kaisi ho", "from":"Riya", "to": "Vidita"}
{"message": "message", "text": "I am fine", "from":"Vidita", "to": "Sauma"}
{"message": "connect", "name": "Sauma"}
{"message": "connect", "name": "Vidita"}
{"message": "connect", "name": "Riya"}
{"message": "connect", "name": "Riya"}
{"message": "connect", "name": "Vidita"}

Response Format:

{"message": "registered", "text": "hello user"};
{"message": "message", "text": some message};
{"message": "registration-error", "text": "User already registered"}

bittu:Hello bittu
sauma:Hello sauma

Connect Bittu
hello bittu

SocketController:
fields:
socket
behaviors:
write => this.#socket.("")

```
CLIENT
  fields:
    name
    client

  behaviors:
    sendRequest
    start
    onConnect
    onData
```

[x] Client should request first

[x] change the encoding from outside

[x] refactor the chat-server

```
extract the socket out in our own entity(name: proxy client) // name is too generic

ProxyClient:
fields:
  socket,
  onRegistration

behaviors:
  write,
  handleRegitration => onRegistration()
  handleMessage,
  handleDisconnection
  start => it will start listening on data and register the callbacks
```

how to send the callbacks ?
-> send an object where the keys are the request messages, or,
-> send the callbacks normally as fn ref // drawback: it should know which
callback to call when

[ ] We have to change the contract of how we store the message of a user

```
Messages:
  fields:
    messages => {
                  sauma: {
                    vidita:[message1, message2],
                    milan:[message1, message2]
                  },
                  vidita: {
                    sauma:[message1, message2]
                  },
                  milan: {
                    sauma:[message1, message2]
                  }
                }

  behaviors:
    addUser(name)
    addMessage(sender, receiver, message)
    getChatOf(sender, receiver)


```

[ ] We can make abstractions for the client like
own client or connection class
own inputStream class or input controller class
own renderer or view class

const connection = new Connection(client);
