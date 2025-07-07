import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsLogin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLogin(false);
    setUser(null);
    window.location.assign("/");
  };

  // Check if user role is professional sales
  const isProfessionalSales = user?.role?.name === "professional sales";

  return (
    <div>
      {isLogin && user && (
        <nav className="fixed z-[10] bg-white flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold md:text-2xl">
              <a href="/">Surapatools</a>
            </h1>
          </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="capitalize text-sm font-medium">
                    {user.username}
                  </h1>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.role?.name}
                  </p>
                </div>
              </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=left]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                sideOffset={5}
              >
                <DropdownMenu.Item className="group cursor-pointer relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
                  <a href="/customers">Data Customer</a>
                </DropdownMenu.Item>

                {/* Show Notes only for professional sales */}
                {isProfessionalSales && (
                  <DropdownMenu.Item className="group cursor-pointer relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
                    <a href="/sales">Notes</a>
                  </DropdownMenu.Item>
                )}

                <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

                <DropdownMenu.Item
                  className="group cursor-pointer relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenu.Item>

                <DropdownMenu.Arrow className="fill-white" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
