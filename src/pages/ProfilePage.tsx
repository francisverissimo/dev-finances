import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Form, Input } from "antd";
import { useAuth } from "../hooks/useAuth";
import { updateDisplayName, updatePhotoURL } from "../services/auth";
import {
  ArrowLeft,
  CircleNotch,
  FloppyDisk,
  PencilSimpleLine,
  Upload,
  X,
} from "phosphor-react";
import { uploadPhotoProfile } from "../services/storage";
import userWithoutPhoto from "../assets/user-without-photo.jpg";

export function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  const [form] = Form.useForm();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleChangePhotoURL(event: ChangeEvent<HTMLInputElement>) {
    try {
      const inputImage = event.target.files![0];

      if (inputImage && user) {
        setPhoto(URL.createObjectURL(inputImage));
        const profilePhotoURL = await uploadPhotoProfile(user, inputImage);
        setPhoto(profilePhotoURL);
        await updatePhotoURL(user, profilePhotoURL);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleChangeDisplayName() {
    setIsLoading(true);

    try {
      const displayName = form.getFieldValue("displayName");

      if (user && displayName != user?.displayName) {
        await updateDisplayName(user, displayName);
      }

      setIsInputDisabled(true);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!user) return navigate("/");
    user?.photoURL ? setPhoto(user.photoURL) : setPhoto(userWithoutPhoto);
  }, []);

  return (
    <div className="bg-slate-300 min-h-screen">
      <div className="bg-gradient-to-tr from-slate-800 to-slate-600">
        <div className="flex justify-between max-w-xl mx-auto p-2">
          <div
            className="group p-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ArrowLeft
              className="group text-slate-400 group-hover:text-slate-100 transition"
              size={32}
            />
          </div>
        </div>
      </div>

      {user && (
        <div className="flex flex-col gap-8 md:gap-4 max-w-xl p-4 mx-auto pt-12">
          <div className="flex md:flex-col gap-4 justify-center md:justify-start items-center flex-wrap">
            <div className="flex flex-col justify-center items-center gap-4 p-4">
              <span className="text-lg md:text-xl text-slate-700 font-medium">
                {user.displayName ? user.displayName : user.email && user.email}
              </span>

              <div className="p-4 relative">
                {photo ? (
                  <Avatar
                    shape="circle"
                    size={200}
                    src={photo}
                    alt="Profile Photo"
                    onClick={() => inputRef.current?.click()}
                  />
                ) : (
                  <img
                    src={userWithoutPhoto}
                    alt="Default Profile Image"
                    className="max-w-[200px] rounded-full"
                  />
                )}

                <input
                  title=""
                  type="file"
                  ref={inputRef}
                  name="inputUploadAvatar"
                  id="inputUploadAvatar"
                  onChange={(event) => handleChangePhotoURL(event)}
                  className="absolute opacity-0 inset-0 cursor-pointer"
                />

                <div
                  onClick={() => setIsInputDisabled(false)}
                  className="w-fit rounded-full p-3 text-zinc-100 transition bg-teal-700"
                >
                  <Upload size={22} />
                </div>
              </div>

              <div className="h-[1px] w-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-200 rounded-md"></div>
            </div>
          </div>

          <div className="flex-1 flex flex-col px-4 pt-0 pb-4">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleChangeDisplayName}
              disabled={isInputDisabled}
              initialValues={{ displayName: user.displayName || "" }}
            >
              <div className="flex gap-2 justify-between">
                {isInputDisabled ? (
                  <button
                    type="button"
                    title="Editar"
                    onClick={() => setIsInputDisabled(false)}
                    className={`${
                      isLoading && "hidden"
                    } w-fit h-fit my-auto text-xl rounded-full p-3 text-zinc-100 transition bg-sky-600 hover:bg-sky-700`}
                  >
                    <PencilSimpleLine size={22} />
                  </button>
                ) : (
                  <button
                    type="button"
                    title="Cancelar"
                    onClick={() => setIsInputDisabled(true)}
                    className={`${
                      isLoading && "hidden"
                    } w-fit h-fit my-auto text-xl rounded-full p-3 text-zinc-100 transition bg-slate-600 hover:bg-slate-700`}
                  >
                    <X size={22} />
                  </button>
                )}

                <Form.Item
                  name="displayName"
                  label={<p className="text-base">Como podemos te chamar?</p>}
                  className="flex-1 p-0"
                >
                  <Input
                    type="text"
                    size="large"
                    bordered={false}
                    className="text-xl text-slate-600 font-medium p-0"
                    style={{
                      paddingInline: 0,
                      borderBottom: "2px solid #94a3b8",
                    }}
                  />
                </Form.Item>

                {!isInputDisabled && (
                  <button
                    type="button"
                    title="Salvar"
                    onClick={() => form.submit()}
                    className={`${
                      isLoading && "hidden"
                    } w-fit h-fit my-auto text-xl p-3 rounded-full text-zinc-100 bg-green-600 hover:bg-green-700 disabled:bg-zinc-400 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:text-zinc-100 transition`}
                  >
                    <FloppyDisk size={22} />
                  </button>
                )}
              </div>
            </Form>

            {isLoading && (
              <CircleNotch
                size={36}
                className="text-slate-600 mx-auto animate-spin"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
