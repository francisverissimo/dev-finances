import { useForm } from "antd/lib/form/Form";
import locale from "antd/lib/date-picker/locale/pt_BR";
import {
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
} from "antd";
import { AddTransactionFormFieldValues } from "../types";
import { addTransaction } from "../services/firestore";
import { FloppyDisk, X } from "phosphor-react";
import { useAuth } from "../hooks/useAuth";

interface ModalAddTransactionProps {
  open: boolean;
  handleClose: () => void;
}

export function ModalAddTransaction({
  open,
  handleClose,
}: ModalAddTransactionProps) {
  const [form] = useForm();
  const { user } = useAuth();

  async function handleSubmitForm() {
    const fieldValues = form.getFieldsValue() as AddTransactionFormFieldValues;
    if (fieldValues.value >= 0)
      return message.warn("Transação sem valor algum.:");

    user && addTransaction(user.uid, fieldValues);
    handleCloseModal();
  }

  function handleCloseModal() {
    handleClose();
    form.resetFields();
  }

  return (
    <Modal
      open={open}
      onCancel={handleCloseModal}
      title="Nova Transação"
      destroyOnClose
      footer={null}
      bodyStyle={{ paddingInline: "24px", paddingBlock: "0 24px" }}
      width={544}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ type: "expense" }}
        onFinish={handleSubmitForm}
      >
        <Divider orientation="left" plain>
          <span className="text-sm text-slate-700">Descrição</span>
        </Divider>

        <Form.Item
          name="description"
          rules={[
            { required: true, message: "Digite uma descrição, por favor.:" },
          ]}
        >
          <Input />
        </Form.Item>

        <Divider orientation="left" plain>
          <span className="text-sm text-slate-700">Transação</span>
        </Divider>

        <Form.Item
          name="type"
          rules={[{ required: true, message: "Campo obrigatório." }]}
        >
          <Radio.Group>
            <Radio value="expense" className="text-red-600 font-medium">
              Saída
            </Radio>
            <Radio value="income" className="text-green-700 font-medium">
              Entrada
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Divider orientation="left" plain>
          <span className="text-sm text-slate-700">Valor</span>
        </Divider>

        <Form.Item
          name="value"
          rules={[
            {
              required: true,
              message: "Digite um número, por favor.:",
            },
            { type: "number" },
          ]}
        >
          <InputNumber type="number" min={0} />
        </Form.Item>

        <Divider />

        <Form.Item
          name="date"
          rules={[
            { required: true, message: "Selecione uma data, por favor.:" },
          ]}
        >
          <DatePicker locale={locale} />
        </Form.Item>

        <Divider />

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={handleCloseModal}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 transition text-xl text-zinc-100 p-2 rounded"
          >
            <X size={26} />
            Calcelar
          </button>

          <button
            type="button"
            onClick={() => form.submit()}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 transition text-xl text-zinc-100 px-4 rounded"
          >
            <FloppyDisk size={26} />
            Salvar
          </button>
        </div>
      </Form>
    </Modal>
  );
}
