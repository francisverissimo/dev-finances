import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Popover } from "antd";
import { CaretDown, User, SignOut } from "phosphor-react";

interface UserPopProps {
  name: string;
  avatar: string;
}

export function UserPop({ name, avatar }: UserPopProps) {
  const navigate = useNavigate();
  const { handleSignOut } = useAuth();

  return (
    <Popover
      placement="bottomRight"
      content={
        <div className="flex flex-col gap-2">
          <strong className="font-medium text-base text-zinc-600">
            {name}
          </strong>

          <button
            onClick={() => navigate("/profile")}
            className="flex w-fit gap-1 px-4 py-1 text-base text-sky-600 hover:text-sky-500"
          >
            <User size={22} />
            Perfil
          </button>

          <button
            className="flex w-fit items-center gap-1 px-4 py-1 text-base text-red-600 hover:text-red-500"
            onClick={handleSignOut}
          >
            <SignOut size={22} />
            Sair
          </button>
        </div>
      }
    >
      <div className="flex gap-1 items-center justify-center cursor-pointer">
        <img
          src={avatar}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-10 rounded-full"
        />

        <CaretDown size={16} className="text-zinc-300" />
      </div>
    </Popover>
  );
}
