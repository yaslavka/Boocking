import React from "react";
import {useSelector} from "react-redux";
import styles from './index.module.scss'
import SearchForm from "../../components/SearchForm";
import {useTranslation} from "react-i18next";
import bg from '../../assets/bg/sebastian-staines-uT6T6kernVo-unsplash.png'
import Cities from "../../components/Cities";

function Home() {
    const {t} = useTranslation('common')
    const cities = useSelector((state) => state.geo.cities)
    const loadings = useSelector((state) => state.geo.loadings.cities)
    return(
      <>
          <div className={styles.root}>
              <img src={bg} alt={'tobook'} className={styles.root_pages}/>
              <SearchForm t={t}/>
              {loadings ?(
                  <>

                  </>
              ):(
                  <>
                      {cities && <Cities cities={cities} t={t}/>}
                  </>
              )}
          </div>
      </>
    )
}
export default Home