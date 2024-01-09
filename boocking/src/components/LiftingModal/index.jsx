import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import confirm from 'reactstrap-confirm'
import Modal from 'react-bootstrap/Modal'
import { Form } from 'react-bootstrap'
import { declOfNum } from '../../utils'
import { Button, FormGroup, Input } from 'reactstrap'

function LiftingModal({
  lifting,
  liftingPackage,
  object,
  setLifting,
  objectManager,
  value,
}) {
  const { t } = useTranslation('common')
  const [liftingInput, setLiftingInput] = useState(null)
  const [id, setId] = useState(null)
  const handleChange = (e) => {
    setLiftingInput(Number(e.target.value))
  }
  const liftingConfirmValue = async () => {
    setLifting(false)
    const days = Number(liftingInput)
    const result = await confirm({
      title: `${t('Подтвердите Поднятие')}`,
      message: `${t('Поднятие в списке на')} ${days} ${declOfNum(days, [
        `${t('день')}`,
        `${t('дня')}`,
        `${t('дней')}`,
      ])}, ${t('на сумму')} ${days * Number(liftingPackage.price)} RUB?`,
      confirmText: `${t('Подтвердить')}`,
      confirmColor: 'danger',
      cancelText: `${t('Отменить')}`,
      cancelColor: 'link text-muted',
    })
    if (result) {
    }
  }
  const liftingConfirm = async () => {
    setLifting(false)
    const days = Number(liftingInput)
    const result = await confirm({
      title: `${t('Подтвердите Поднятие')}`,
      message: `${t('Поднятие в списке на')} ${days} ${declOfNum(days, [
        `${t('день')}`,
        `${t('дня')}`,
        `${t('дней')}`,
      ])}, ${t('на сумму')} ${days * Number(liftingPackage.price)} RUB?`,
      confirmText: `${t('Подтвердить')}`,
      confirmColor: 'danger',
      cancelText: `${t('Отменить')}`,
      cancelColor: 'link text-muted',
    })
    if (result) {
    }
  }
  return (
    <>
      <Modal
        show={lifting}
        onHide={() => {
          setLifting(false)
        }}
      >
        <Modal.Header
          closeButton={() => {
            setLifting(false)
          }}
        >
          Поднятие
        </Modal.Header>
        <Form onSubmit={(e) => e.preventDefault()}>
          {value ? (
            <>
              <FormGroup style={{ paddingInline: 25, paddingTop: 10 }}>
                <Input
                  type="number"
                  name="lifting"
                  value={liftingInput}
                  placeholder="Количество дней"
                  onChange={handleChange}
                />
              </FormGroup>
            </>
          ) : (
            <>
              {objectManager && (
                <FormGroup style={{ paddingInline: 25, paddingTop: 10 }}>
                  <select onChange={(e) => setId(Number(e.target.value))}>
                    <option value="Выберите отель" disabled hidden>
                      Выберите отель
                    </option>
                    {objectManager.map((item, index) => (
                      <>
                        <option key={index} id={item.id} value={item.id}>
                          {item.nameHotel}
                        </option>
                      </>
                    ))}
                  </select>
                </FormGroup>
              )}
              <FormGroup style={{ paddingInline: 25, paddingTop: 10 }}>
                <Input
                  type="number"
                  name="lifting"
                  value={liftingInput}
                  placeholder="Количество дней"
                  onChange={handleChange}
                />
              </FormGroup>
            </>
          )}
          <Modal.Footer>
            <Button
              color={'primary'}
              type={'button'}
              onClick={value ? liftingConfirmValue : liftingConfirm}
            >
              Поднять
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
export default LiftingModal
