import { useAuth } from "../hooks/useAuth";
import { UserPop } from "./UserPop";
import { Logo } from "./Logo";
import userWithoutPhoto from "../assets/user-without-photo.jpg";

export function Header() {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-tr from-slate-800 to-slate-600">
      <div className="flex justify-between max-w-xl mx-auto px-4 pt-4 pb-10">
        <Logo className="text-slate-200" />

        {user && user.email && (
          <UserPop
            name={user.displayName || user.email}
            avatar={user.photoURL || userWithoutPhoto}
          />
        )}
      </div>
    </div>
  );
}
