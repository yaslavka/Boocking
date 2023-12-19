import React, {useState} from "react";
import styles from "../../Pages/PrivatePages/MessagePages/messge.module.scss";
import MessageUserList from "../MessageUserList";

function LeftSide({messages, help}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [inputAction, setInputAction] = useState(false);

    const filteredUsers = messages
        ? messages.filter((user) =>
            user.users.username.toLowerCase().includes(searchTerm.toLowerCase()) || user.users.email.toLowerCase().includes(searchTerm.toLowerCase())
            || user.users.phone.toLowerCase().includes(searchTerm.toLowerCase()) || user.users.first_name.toLowerCase().includes(searchTerm.toLowerCase())
            || user.users.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];
    return (
        <>
            <form className={styles.messageHeader}>
                <input
                    type="text"
                    placeholder="Enter to Search..."
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setInputAction(true)
                    }}
                />
            </form>
            <div className={styles.messageChatList}>
                {messages?.length > 0 && (
                    <>
                        {filteredUsers?.length > 0 && inputAction === true ? (
                            <>
                                {filteredUsers.map((user, index)=>(
                                    <MessageUserList key={index} user={user.users} inputAction={inputAction} messages={user.message} chat={user} help/>
                                ))}
                            </>
                        ):(
                            <>
                                {inputAction === false && (
                                    <>
                                        {messages.map((user, index)=>(
                                            <MessageUserList key={index} user={user.users} messages={user.message} chat={user} help/>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    )
}
export default LeftSide