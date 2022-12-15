import { useState } from "react";
import { Form, Input } from "antd";
import { useAuth } from "../hooks/useAuth";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { ArrowLeft, CircleNotch } from "phosphor-react";

interface ForgotPageProps {
  setPage: (page: "login" | "signup" | "forgot") => void;
}

export function ForgotPage({ setPage }: ForgotPageProps) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();
  const { handleForgotPassword } = useAuth();

  async function handleForgot() {
    setSubmitLoading(true);
    const email = form.getFieldValue("email");
    await handleForgotPassword(email.trim());
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

          <p className="text-slate-600 font-medium text-center">
            Redefinir senha
          </p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleForgot}
            className="flex flex-col gap-4"
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
                  "Redefinir senha"
                )}
              </button>
            </Form.Item>

            <div>
              <div className="h-[1px] mb-2 bg-gradient-to-l from-emerald-600 via-emerald-400 to-emerald-200 rounded-md"></div>

              <button
                type="button"
                onClick={() => setPage("login")}
                className="flex items-center w-fit p-2 gap-2 text-slate-700 hover:text-emerald-800 font-medium transition"
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
