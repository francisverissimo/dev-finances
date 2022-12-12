import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { useAuth } from "../hooks/useAuth";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { ArrowLeft, CircleNotch } from "phosphor-react";

interface SignUpFieldValues {
  displayName: string;
  email: string;
  password: string;
  confirm: string;
}

export function SignUpPage() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();
  const { handleNewAccount } = useAuth();
  const navigate = useNavigate();

  async function handleSignUp() {
    setSubmitLoading(true);
    const { displayName, email, password } =
      form.getFieldsValue() as SignUpFieldValues;
    await handleNewAccount(email.trim(), password, displayName.trim());
    setSubmitLoading(false);
  }

  return (
    <div className="flex flex-col bg-gradient-to-b from-slate-600 via-slate-400 to-slate-200 justify-center items-center px-2 h-screen">
      <div className="flex-1 flex justify-center items-center max-w-md w-full">
        <div className="flex flex-col gap-4 bg-slate-100 p-4 rounded-md shadow-xl w-full">
          <div className="self-center">
            <Logo className="text-slate-600" />
            <div className="h-[1px] bg-gradient-to-r from-teal-600 via-teal-400 to-teal-200 rounded-md"></div>
          </div>

          <p className="text-slate-600 font-medium text-center">Cadastre-se</p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSignUp}
            className="flex flex-col gap-4"
          >
            <Form.Item
              name="displayName"
              className="m-0"
              rules={[{ required: true, message: "Campo obrigatório." }]}
            >
              <Input
                size="large"
                placeholder="Nome"
                bordered={false}
                style={{ paddingInline: 0, borderBottom: "2px solid #ccc" }}
              />
            </Form.Item>

            <Form.Item
              name="email"
              className="m-0"
              rules={[{ required: true, message: "Campo obrigatório." }]}
            >
              <Input
                size="large"
                placeholder="E-mail"
                bordered={false}
                style={{ paddingInline: 0, borderBottom: "2px solid #ccc" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              className="m-0"
              rules={[
                { required: true, message: "Por favor, digite sua senha." },
              ]}
              hasFeedback
            >
              <Input.Password
                bordered={false}
                placeholder="Senha"
                style={{ paddingInline: 0, borderBottom: "2px solid #ccc" }}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              className="m-0"
              rules={[
                { required: true, message: "Por favor, confirme sua senha." },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "As duas senhas que você digitou não conferem.!"
                      )
                    );
                  },
                }),
              ]}
              dependencies={["password"]}
              hasFeedback
            >
              <Input.Password
                bordered={false}
                placeholder="Confirmar Senha"
                style={{ paddingInline: 0, borderBottom: "2px solid #ccc" }}
              />
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="flex justify-center text-xl text-slate-200 w-full font-medium py-2 px-4 mt-4 bg-slate-600 hover:bg-slate-700 rounded-full transition"
              >
                {submitLoading ? (
                  <CircleNotch size={28} className="animate-spin text-xl" />
                ) : (
                  "Cadastrar"
                )}
              </button>
            </Form.Item>

            <div>
              <div className="h-[1px] mb-2 bg-gradient-to-l from-emerald-600 via-emerald-400 to-emerald-200 rounded-md"></div>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-fit p-2 flex items-center gap-2 text-slate-700 hover:text-emerald-800 font-medium transition"
              >
                <ArrowLeft size={22} /> Voltar para o Login
              </button>
            </div>
          </Form>
        </div>
      </div>

      <Footer className="pb-4" />
    </div>
  );
}
