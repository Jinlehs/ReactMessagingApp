import React, {useState} from 'react';
import {ChatEngine, getOrCreateChat, getUsers} from 'react-chat-engine'

const DirectMessaging = () => {
    // The useState hook initially sets the username to an empty string
    const[username, setUsername] = useState('')
    
    function createDirectChat(creds:any) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

    function renderChatForm(creds:any) {
		return (
			<div>
				<input 
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button onClick={() => createDirectChat(creds)}>
					Create
				</button>
			</div>
		)
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
        />
    )
}

export default DirectMessaging