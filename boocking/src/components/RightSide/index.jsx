import React from "react";
import styles from "../../Pages/PrivatePages/MessagePages/messge.module.scss";
import MessageUserList from "../MessageUserList";
import ChatList from "../ChatList";
import {Formik, Form, Field} from "formik";



function RightSide({messages, authId, id, user}) {
    return (
        <>
            <div className={styles.messageHeaderLeft}>
                {user && (
                    <MessageUserList user={user} left>
                        <div>
                            <i className="fas fa-trash text-danger"/>
                        </div>
                    </MessageUserList>
                )}
            </div>
            <div className={styles.chatContainer}>
                <div className={styles.chatDisplay}>
                    {messages?.length > 0 && (
                        <>
                            {messages.map((chat, index)=>{
                                const messagesSort = chat.message.filter((i)=>i.userId ===authId || i.recipient ===authId) || []
                                return (
                                    <ChatList key={index} messages={messagesSort} authId={authId}/>
                                )
                            })}
                        </>
                    )}
                </div>
            </div>
            <Formik>

            </Formik>
        </>
    )
}
export default RightSide