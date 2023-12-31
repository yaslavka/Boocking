import React from 'react'
import { useSelector } from 'react-redux'
import styles from './index.module.scss'
import SearchForm from '../../components/SearchForm'
import { useTranslation } from 'react-i18next'
import Cities from '../../components/Cities'
import Recommended from '../../components/Recommended'
import Actions from '../../components/Actions'
import Advansages from '../../components/Advansages'

function Home() {
  const { t } = useTranslation('common')
  const cities = useSelector((state) => state.geo.cities)
  const recommended = useSelector((state) => state.recommended.recommended)
  const actions = useSelector((state) => state.recommended.actions)
  return (
    <>
      <div className={styles.bg}>
        <div className={styles.root}>
          <div className={styles.bg2} />
          <div style={{ marginBottom: 150 }} />
          <SearchForm t={t} cities={cities} />
          {cities && <Cities cities={cities} t={t} />}
          {recommended && <Recommended recommended={recommended} t={t} />}
          {actions && <Actions actions={actions} t={t} />}
          <Advansages t={t} />
        </div>
      </div>
    </>
  )
}
export default Home
