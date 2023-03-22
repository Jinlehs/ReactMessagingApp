import React, {useState} from 'react'
import {ChatEngine, getOrCreateChat, getUsers, deleteChat} from 'react-chat-engine'
import axios from 'axios'

const DirectMessaging = () => {
    // The useState hook initially sets the username to an empty string
    const[username, setUsername] = useState('')
    const [error, setError] = useState('')
    var userName: string = ''; 
    
    function createDirectChat(cred:any) {
        console.log([username])
		getOrCreateChat(
			cred,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}
    
    function deleteDirectChat(cred:any, chat:any) {
        deleteChat(
            cred, chat.id
        )
    }

    var listOfUserNames: any[] = [] 
    var listOfUsers: any[] = [] 

    const handleDropDown = () => {
        //setOpen(!isOpen);
        //   let text = ""
        //   for (let i = 0; i < listOfUserNames.length; i++) {
        //       text += listOfUserNames[i] + "<br>"
        //   }
        //   const output = document.getElementById("users")
        //   if (output) output.innerHTML = text


        var myParent = document.getElementsByClassName("test")[0]
        var selectList = document.getElementsByClassName("selector")[0];
        myParent.appendChild(selectList);

        for (var i = 0; i < listOfUserNames.length; i++) {
            var option = document.createElement("option");
            option.value = listOfUserNames[i];
            option.text = listOfUserNames[i];
            selectList.appendChild(option);
        }
        console.log(selectList)
      };

      function handleChange(e:any) {
        console.log(e.target.value)
        userName = e.target.value
      }

    const getUsers = async () => {
        //header for authentication
        const authObject = {'Private-Key': process.env.REACT_APP_PRIVATE_KEY}
        try { 
            await axios.get("https://api.chatengine.io/users/", {'headers': authObject}).then((r:any) => {
                listOfUsers.push(r.data)
            })
            // window.location.reload()
            for (let i = 0; i < listOfUsers[0].length; i++) {
                listOfUserNames.push(listOfUsers[0][i].username)
                console.log(listOfUsers[0][i].username)
            }
        }
        catch (error) {
            console.log(error)
            setError('Incorrect credentials, try again')
        }
    }

    function renderChatForm(cred:any) {
		return (
			<div>
				<input 
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button onClick=
                {() => {
                    createDirectChat(cred)
                    refreshPage()
                }}>
					Create
				</button>
                <div className="dropdown">
                    <div>
                        <button
                            onClick={getUsers}>
                                getUsers
                        </button>
                    </div>
                    <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                    onClick={handleDropDown}
                    >
                    user dropdown
                    <svg
                        className="ml-2 w-4 h-4"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                    </button>
                </div>
                <ul className="test">
                    <select className="selector"
                        onChange={(e) => setUsername(e.target.value)}>
                    </select>
                </ul>
                <button onClick=
                {() => {
                    createDirectChat(cred)
                    refreshPage()
                }}>
                    create chat
                </button>
			</div>
		)
	}

    function renderOptions(cred: any, chat: any) {
        return (
            <button onClick=
                {() => {
                    deleteDirectChat(cred, chat)
                    setTimeout(() => refreshPage(), 1000);
                }}>
					Delete Chat
			</button>
        )
    }

    function refreshPage() {
        window.location.reload()
    }

    return(
        <ChatEngine
            height='70vh'
            userName='JinLee'
            // Accessing the stored environment variables in .env file
            userSecret={process.env.REACT_APP_USER_SECRET}
            projectID={process.env.REACT_APP_PROJECT_ID}
            privateKey={process.env.REACT_APP_PRIVATE_KEY}
            // displayNewChatInterface={(credentials: any) => displayChatInterface(credentials)}
            renderNewChatForm={(creds:any) => renderChatForm(creds)}
            renderOptionsSettings={(creds:any, chat:any) => renderOptions(creds, chat)}
        />
    )
}

export default DirectMessaging