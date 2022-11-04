import {
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import locale from "antd/lib/date-picker/locale/pt_BR";
import { FloppyDisk, X } from "phosphor-react";
import { Moment } from "moment";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import {
  generateTransactionID,
  passDateInMomentFormatToDateFormat,
} from "../utils";

interface FormFieldValues {
  description: string;
  type: "expense" | "incoming";
  value: number;
  date: Moment;
}

interface ModalAddTransactionInterface {
  open: boolean;
  handleClose: () => void;
}

export function ModalAddTransaction({
  open,
  handleClose,
}: ModalAddTransactionInterface) {
  const [form] = useForm();

  function handleSubmitForm() {
    const { description, type, value, date } =
      form.getFieldsValue() as FormFieldValues;

    handleAddNewTransaction({
      value,
      description,
      type,
      date,
    });
  }

  function handleCloseModal() {
    handleClose();
    form.resetFields();
  }

  async function handleAddNewTransaction(data: FormFieldValues) {
    const docRef = doc(db, "users", "francissv97@gmail.com");

    const transactionId = generateTransactionID();

    const convertedDate = passDateInMomentFormatToDateFormat(data.date);

    await setDoc(
      docRef,
      {
        [`${transactionId}`]: {
          ...data,
          id: transactionId,
          date: convertedDate,
        },
      },
      { merge: true }
    );

    handleCloseModal();
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
      <Form form={form} layout="vertical" initialValues={{ type: "expense" }}>
        <Divider orientation="left" plain>
          <span className="text-sm text-slate-700">Descrição</span>
        </Divider>

        <Form.Item name="description">
          <Input />
        </Form.Item>

        <Divider orientation="left" plain>
          <span className="text-sm text-slate-700">Transação</span>
        </Divider>

        <Form.Item name="type">
          <Radio.Group>
            <Radio value="expense" className="text-red-600 font-medium">
              Saída
            </Radio>
            <Radio value="incoming" className="text-green-700 font-medium">
              Entrada
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Divider orientation="left" plain>
          <span className="text-sm text-slate-700">Valor</span>
        </Divider>

        <Form.Item name="value">
          <InputNumber type="number" />
        </Form.Item>

        <Divider />

        <Form.Item name="date">
          <DatePicker locale={locale} />
        </Form.Item>

        <Divider />

        <div className="flex gap-4 justify-end">
          <button
            onClick={handleCloseModal}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 transition text-xl text-zinc-100 p-2 rounded"
          >
            <X size={26} />
            Calcelar
          </button>

          <button
            onClick={handleSubmitForm}
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
