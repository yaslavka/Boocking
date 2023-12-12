import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import SearchForm from '../../components/SearchForm';
import { useTranslation } from 'react-i18next';
import bg from '../../assets/bg/sebastian-staines-uT6T6kernVo-unsplash.png';
import Cities from '../../components/Cities';
import Recommended from '../../components/Recommended';
import Actions from '../../components/Actions';
import Advansages from '../../components/Advansages';
import Footer from '../../components/Footer';

function Home() {
  const { t } = useTranslation('common');
  const cities = useSelector((state) => state.geo.cities);
  const recommended = useSelector((state) => state.recommended.recommended);
  const actions = useSelector((state) => state.recommended.actions);
  return (
    <>
      <div className={styles.root}>
        <img src={bg} alt={'tobook'} className={styles.root_pages} />
        <SearchForm t={t} cities={cities} />
        {cities && <Cities cities={cities} t={t} />}
        {recommended && <Recommended recommended={recommended} t={t} />}
        {actions && <Actions actions={actions} t={t} />}
        <Advansages t={t} />
        <Footer />
      </div>
    </>
  );
}
export default Home;
