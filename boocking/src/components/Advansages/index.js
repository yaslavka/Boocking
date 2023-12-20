import React from 'react';
import styles from './advansages.module.scss';

function Advansages({t}) {
  return (
    <>
      <div className={styles.advansagesPages}>
        <div className={styles.advansagesPagesTitle}>
                    6 ФАКТОВ О НАС
        </div>
        <div className={styles.advansagesSubPagesTitle}>
          {t('ПРЕИМУЩЕСТВА БРОНИРОВАНИЯ У НАС')}
        </div>
        <article className={styles.numberBox}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{position: 'absolute', backgroundColor: '#FFF', top: 32, width: 20, height: 20, borderRadius: 50, borderWidth: 3, borderColor: '#93D7E0', borderStyle: 'solid', zIndex: 1}}/>
            <h2 className={styles.titleNumber}>01</h2>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{position: 'absolute', backgroundColor: '#FFF', top: 32, width: 20, height: 20, borderRadius: 50, borderWidth: 3, borderColor: '#93D7E0', borderStyle: 'solid', zIndex: 1}}/>
            <h2 className={styles.titleNumber}>02</h2>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{position: 'absolute', backgroundColor: '#FFF', top: 32, width: 20, height: 20, borderRadius: 50, borderWidth: 3, borderColor: '#93D7E0', borderStyle: 'solid', zIndex: 1}}/>
            <h2 className={styles.titleNumber}>03</h2>
          </div>
          <article className={styles.circleBox}>
            {Array(100).fill(<span className={styles.circle} />)}
          </article>
        </article>
        <div className={styles.advansagesPagesImag}>
          <div className={styles.advansagesPagesImagesText}>
            <div>
              <div style={{width: 400, marginBottom: 10}}>
                {'Отель предназначен для временного проживания граждан на срок, согласованный с администрацией комплекса. По истечении согласованного срока Гость обязан освободить номер по требованию администрации.'}
              </div>
              <div style={{width: 400}}>
                {'Гостю необходимо предъявить администратору службы СПИР, следующие документы, имеющие не истекший срок действия: для граждан РФ - паспорт гражданина РФ, для граждан РФ, не достигших 14-летнего возраста - свидетельство о рождении, для граждан РФ, постоянно проживающих за пределами РФ - паспорт, удостоверяющий личность гражданина РФ за пределами РФ (Заграничный паспорт),для граждан других государств и лиц без гражданства – документ, удостоверяющий личность иностранного гражданина; виза (для стран, с которыми у РФ установлены визовые отношения); миграционная карта, имеющая отметку органа пограничного контроля; документ, выданный иностранным государством и признанный в соответствии с международным договором РФ в качестве документа, удостоверяющего личность лица без гражданства.'}
              </div>
            </div>
            <div>
              <div style={{width: 400, marginBottom: 10}}>
                                Оплата производится в рублях, наличными денежными средствами, путем безналичного перечисления по договору бронирования или с использованием расчетных (кредитных) карт. Поселение в отель производится только после внесения Гостем оплаты проживания. Фискальный чек и окончательный счет за оказанные услуги выдается при выезде Гостя.
              </div>
              <div style={{width: 400}}>
                                Вне зависимости от вида поселения, в случае задержки выезда Гостя после расчетного часа на срок не более 6 часов производится почасовая оплата. При задержке выезда на срок от 6 до 12 часов после расчетного часа плата взимается за половину суток. При выезде по истечении более 12 часов после расчетного часа оплата производится как за полные сутки.
              </div>
            </div>
            <div>
              <div style={{width: 400, marginBottom: 10}}>
                                К гостям отеля могут приходить посетители с 8.00 до 23.00 часов. Администратор должен вести запись всех визитеров. Посетители обязаны представить документ, подтверждающий их личность администратору. За них отвечает проживающий в номере.
              </div>
              <div style={{width: 400}}>
                                Смена постельного белья осуществляется один раз в два дня, полотенец и туалетных принадлежностей производится один раз в сутки. По просьбе Гостя и за дополнительную плату может быть произведена внеплановая замена белья.
              </div>
            </div>
          </div>
        </div>
        <article className={styles.numberBox}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{position: 'absolute', backgroundColor: '#FFF', top: 32, width: 20, height: 20, borderRadius: 50, borderWidth: 3, borderColor: '#93D7E0', borderStyle: 'solid', zIndex: 1}}/>
            <h2 className={styles.titleNumber}>04</h2>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{position: 'absolute', backgroundColor: '#FFF', top: 32, width: 20, height: 20, borderRadius: 50, borderWidth: 3, borderColor: '#93D7E0', borderStyle: 'solid', zIndex: 1}}/>
            <h2 className={styles.titleNumber}>05</h2>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{position: 'absolute', backgroundColor: '#FFF', top: 32, width: 20, height: 20, borderRadius: 50, borderWidth: 3, borderColor: '#93D7E0', borderStyle: 'solid', zIndex: 1}}/>
            <h2 className={styles.titleNumber}>06</h2>
          </div>
          <article className={styles.circleBox}>
            {Array(100).fill(<span className={styles.circle} />)}
          </article>
        </article>
        <div className={styles.advansagesPagesImag}>
          <div className={styles.advansagesPagesImagesText}>
            <div>
              <div style={{width: 400, marginBottom: 10}}>
                Гость обязан бережно относиться к имуществу и оборудованию отеля «HATTI LOFT HOTEL», соблюдать установленный порядок проживания. В случае утраты или повреждения Гостем имущества отеля он возмещает стоимость нанесенного ущерба на основании действующего прейскуранта.
              </div>
              <div style={{width: 400}}>
                                Оставлять в номере посторонних лиц, а также передавать им ключ от номера. В случае утери ключа гость оплачивает стоимость ключа в размере 700 руб.;
              </div>
            </div>
            <div>
              <div style={{width: 400, marginBottom: 10}}>
                                Оплата производится в рублях, наличными денежными средствами, путем безналичного перечисления по договору бронирования или с использованием расчетных (кредитных) карт. Поселение в отель производится только после внесения Гостем оплаты проживания. Фискальный чек и окончательный счет за оказанные услуги выдается при выезде Гостя.
              </div>
              <div style={{width: 400}}>
                                Смена постельного белья осуществляется один раз в два дня, полотенец и туалетных принадлежностей производится один раз в сутки. По просьбе Гостя и за дополнительную плату может быть произведена внеплановая замена белья.
              </div>
            </div>
            <div>
              <div style={{width: 400, marginBottom: 10}}>
                                Вне зависимости от вида поселения, в случае задержки выезда Гостя после расчетного часа на срок не более 6 часов производится почасовая оплата. При задержке выезда на срок от 6 до 12 часов после расчетного часа плата взимается за половину суток. При выезде по истечении более 12 часов после расчетного часа оплата производится как за полные сутки.
              </div>
              <div style={{width: 400}}>
                                К гостям отеля могут приходить посетители с 8.00 до 23.00 часов. Администратор должен вести запись всех визитеров. Посетители обязаны представить документ, подтверждающий их личность администратору. За них отвечает проживающий в номере.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Advansages;
