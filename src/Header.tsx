import { useState } from "react";
import axios from 'axios';


const Header = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    var userValue = ''; 
    var passwordValue = ''; 

    // function to handle the submit
    const handleSubmit = async () => {
        //header for authentication
        const authObject = {'Private-Key': process.env.REACT_APP_PRIVATE_KEY}
        
        // post request to create user
        try {
            await axios.post(
                "https://api.chatengine.io/users/",
                {'username': userValue, 'secret': passwordValue}, // Body object
                {'headers': authObject} // Headers object
            )
            .then((r:any) => console.log(r))
            // login the user
            localStorage.setItem('username', userValue)
            localStorage.setItem('password', passwordValue)

            window.location.reload()
         } catch (error) {
             console.log(error)
             setError('Incorrect credentials, try again')
         }
                            
    }

    const getUsers = async () => {
        //header for authentication
        const authObject = {'Private-Key': process.env.REACT_APP_PRIVATE_KEY}
        try { 
            await axios.get("https://api.chatengine.io/users/", {'headers': authObject}).then((r:any) => console.log(r))
            // window.location.reload()
        }
        catch (error) {
            console.log(error)
            setError('Incorrect credentials, try again')
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-2 pt-6">
                <div className="flex wrap justify-center pb-2">
                    <div className=" text-4xl font-medium text-primary">DentHire</div>
                </div>
                <div className="justify-center">
                    <div className="flex justify-center pb-2">
                        <div className="pr-2"> 
                            <input 
                                type="text" 
                                id="first_name" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Username" 
                                required
                                onChange={(e) => userValue = (e.target as any).value}
                                >
                            </input>
                        </div>
                    </div>
                    <div className="flex justify-center pb-2">
                        <div className="pr-2"> 
                            <input type="text" 
                                id="first_name" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Password" 
                                required
                                onChange={(e) => passwordValue = (e.target as any).value}
                                >
                            </input>
                        </div>
                    </div>
                    <div className="flex justify-center pb-6" >
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "
                            onClick={() => handleSubmit()}>
                                Add User
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header