import React, {useState} from 'react';
import styles from '../../Pages/PrivatePages/MessagePages/messge.module.scss';
import MessageUserList from '../MessageUserList';
import {useSelector} from 'react-redux';

function LeftSide({help, authId}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputAction, setInputAction] = useState(false);
  const messages = useSelector((state) => state.messages.messages);
  const filteredUsers = messages ?
    messages.filter((user) =>
      user.user.username.toLowerCase().includes(searchTerm.toLowerCase()) || user.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user.phone.toLowerCase().includes(searchTerm.toLowerCase()) || user.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) :
    [];
  console.log(messages && messages);
  return (
    <>
      <form className={styles.messageHeader}>
        <input
          type={'text'}
          placeholder={'Enter to Search...'}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setInputAction(true);
          }}
        />
      </form>
      <div className={styles.messageChatList}>
        {messages?.length > 0 && (
          <>
            {filteredUsers?.length > 0 && inputAction === true ? (
              <>
                {filteredUsers.filter((i)=>i.user.id ===authId || i.users.id !==authId).map((user, index) => (
                  <>
                    {help ? (
                      <>
                        {user.user.id !== authId ? (
                          <MessageUserList key={index} user={user.user} messages={user.message} chat={user} help/>
                        ):(
                          <MessageUserList key={index} user={user.users} messages={user.message} chat={user} help/>
                        )}
                      </>
                    ):(
                      <>
                        {user.user.id !== authId ? (
                          <MessageUserList key={index} user={user.user} messages={user.message} chat={user}/>
                        ):(
                          <MessageUserList key={index} user={user.users} messages={user.message} chat={user}/>
                        )}
                      </>
                    )}
                  </>
                ))}
              </>
            ) : (
              <>
                {inputAction === false && (
                  <>
                    {messages.map((user, index) => (
                      <>
                        {help ?(
                          <>
                            {user.user.id !== authId ? (
                              <MessageUserList key={index} user={user.user} messages={user.message} chat={user} help/>
                            ):(
                              <MessageUserList key={index} user={user.users} messages={user.message} chat={user} help/>
                            )}
                          </>
                        ):(
                          <>
                            {user.user.id !== authId ? (
                              <MessageUserList key={index} user={user.user} messages={user.message} chat={user}/>
                            ):(
                              <MessageUserList key={index} user={user.users} messages={user.message} chat={user}/>
                            )}
                          </>
                        )}
                      </>
                    ))}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default LeftSide;
