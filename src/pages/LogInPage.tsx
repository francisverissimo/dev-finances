import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { useAuth } from "../hooks/useAuth";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { User, Lock, CircleNotch } from "phosphor-react";

interface LoginPageFieldValues {
  email: string;
  password: string;
}

export function LogInPage() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();
  const { handleSignIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    setSubmitLoading(true);
    const { email, password } = form.getFieldsValue() as LoginPageFieldValues;
    await handleSignIn(email.trim(), password);
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

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="flex flex-col gap-2"
          >
            <Form.Item
              name="email"
              className="m-0"
              rules={[{ required: true, message: "Campo obrigatório." }]}
            >
              <Input
                size="large"
                placeholder="E-mail"
                bordered={false}
                prefix={<User className="text-slate-500" size={26} />}
                style={{ paddingInline: 0, borderBottom: "2px solid #ccc" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              className="m-0"
              rules={[{ required: true, message: "Campo obrigatório." }]}
            >
              <Input.Password
                bordered={false}
                prefix={<Lock className="text-slate-500" size={26} />}
                placeholder="Senha"
                style={{ paddingInline: 0, borderBottom: "2px solid #ccc" }}
              />
            </Form.Item>

            <button
              type="button"
              onClick={() => navigate("/forgot")}
              className="w-fit self-end font-medium text-slate-600 my-2 cursor-pointer hover:text-teal-700"
            >
              Esqueceu a senha?
            </button>

            <Form.Item>
              <button
                type="submit"
                className="flex justify-center text-xl text-slate-200 w-full font-medium py-2 px-4 bg-slate-600 hover:bg-slate-700 rounded-full transition"
              >
                {submitLoading ? (
                  <CircleNotch size={28} className="animate-spin text-xl" />
                ) : (
                  "Entrar"
                )}
              </button>
            </Form.Item>

            <div className="h-[1px] my-4 bg-gradient-to-l from-emerald-600 via-emerald-400 to-emerald-200 rounded-md"></div>

            <p className="w-fit self-center font-medium text-slate-600 ">
              Ainda não se cadastrou por aqui?
            </p>

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-slate-700 hover:text-emerald-700 font-medium transition"
            >
              Cadastre-se
            </button>
          </Form>
        </div>
      </div>

      <Footer className="pb-4" />
    </div>
  );
}
