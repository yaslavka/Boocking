import React from "react";
import logo from "../../logo.svg";
import styles from './index.module.scss'

function Home() {
    return(
      <>
          <header className={styles.appheader}>
              <img src={logo} className={styles.AppLogo} alt="logo" />
              <p>
                  Edit <code>src/App.js</code> and save to reload.


                  ыаа
              </p>
              <a
                  className={styles.AppLink}
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  Learn React
              </a>
          </header>
      </>
    )
}
export default Home