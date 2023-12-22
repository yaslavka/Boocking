import React, {useCallback, useEffect, useMemo} from 'react';
import styles from '../../Pages/PrivatePages/MessagePages/messge.module.scss';
import MessageUserList from '../MessageUserList';
import ChatList from '../ChatList';
import {Formik, Form, Field} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as messageActions from '../../actions/message.actions';
import ChatInput from '../ChatInput';
import {getAccessToken} from '../../utils';


function RightSide({authId, id, help, messages}) {
  const userInfo = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const token =getAccessToken();
  const user = useSelector((state) => state.messages.user);
  const initialValues = useMemo(
      () => ({
        message: '',
      }),
      [],
  );
  const sendMessage = useCallback((message)=>{
    if (help) {
      dispatch(messageActions.sendMessageAdmin({...message, id: id, userId: authId, recipient: userInfo?.isAdmin ? user?.id: 1, token: token}));
    } else {
      dispatch(messageActions.sendMessage({...message, id: id, userId: authId, recipient: user?.id, token: token}));
    }
  }, [dispatch, id, authId, user?.id, token, userInfo?.isAdmin, messages]);

  return (
    <>
      <div className={styles.messageHeaderLeft}>
        {user && (
          <>
            {help ? (
              <>
                <MessageUserList user={user} left help>
                  {userInfo?.isAdmin && (
                    <div>
                      <i className="fas fa-trash text-danger"/>
                    </div>
                  )}
                </MessageUserList>
              </>
            ):(
              <MessageUserList user={user} left>
                <div>
                  <i className="fas fa-trash text-danger"/>
                </div>
              </MessageUserList>
            )}
          </>
        )}
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.chatDisplay}>
          {messages?.length > 0 && (
            <>
              {messages.map((chat, index)=>{
                return (
                  <ChatList key={index} messages={chat.message} authId={authId}/>
                );
              })}
            </>
          )}
        </div>
      </div>
      <Formik initialValues={initialValues} onSubmit={sendMessage}>
        {()=>(
          <Form className={styles.chatInput}>
            <Field
              type="text"
              name="message"
              component={ChatInput}
              placeholder="Введите сообщение"
            />
            <button type={'submit'}>Отправить</button>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default RightSide;
