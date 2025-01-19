import { PowerIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";

function LogoutBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const expandRef = useOutsideClick(() => setIsOpen(false));

  return (
    <div className="relative" ref={expandRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <PowerIcon className="size-6 text-red-500" />
      </button>

      {isOpen && (
        <div className="absolute w-max -right-7 mt-2 p-4 bg-white shadow-lg rounded-xl">
          <form action="/logout" method="post">
            <button type="submit" className="font-bold hover:text-red-500">
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LogoutBtn;
