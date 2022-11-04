import { Modal } from "antd";

interface ModalAddTransactionInterface {
  open: boolean;
  handleClose: () => void;
}

export function ModalAddTransaction({
  open,
  handleClose,
}: ModalAddTransactionInterface) {
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title="Nova Transação"
      destroyOnClose
      footer={null}
    >
      <input type="radio" name="typeTransaction" id="expense" />
      <input type="radio" name="typeTransaction" id="incoming" />
      <input type="text" placeholder="Descrição" />
      <input type="number" placeholder="Valor" />

      <button>Calcelar</button>
      <button>Salvar</button>
    </Modal>
  );
}
