import React, { useCallback, useState } from 'react'
import { Modal } from 'antd'

type ModalBuilder = (open: () => void, close: () => void, visible: boolean) => JSX.Element

export const useModal = (modal: JSX.Element | ModalBuilder) => {
  const [visible, setVisible] = useState(false)

  const open = useCallback(() => setVisible(true), [])
  const close = useCallback(() => setVisible(false), [])

  const modalElement = typeof modal !== 'function' ? (
    <Modal
      visible={visible}
      onCancel={close}
    >
      {modal}
    </Modal>
  ) : (modal(open, close, visible))

  return {
    modal: modalElement, open, close: close
  }
}
