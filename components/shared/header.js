import { useSession } from "next-auth/client";
import Link from "next/link";
import Logo from "./logo";
import UserPopover from "./user-popover";

const navigation = [
  { name: "Cars", href: "/" },
  // { name: "Items", href: "/" },
  // { name: "Jobs", href: "#" },
];

export default function Header() {
  const [session, loading] = useSession();

  return (
    <header className="">
      <nav className="max-w-7xl mx-auto sm:px-6 lg:px-8 " aria-label="Top">
        <div className="w-full px-2 py-6 flex items-center justify-between border-primary-500 lg:border-none bg-white">
          <div className="flex items-center">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link, index) => (
                <Link key={index} href={link.href}>
                  <a className="text-lg font-medium text-primary-600 hover:text-primary-500">
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-1 ">
            {!session && (
              <>
                <Link href="/auth/login">
                  <a className="inline-block bg-primary-500 py-1 px-2 border border-transparent text-base font-semibold text-white hover:bg-opacity-75 transition delay-150 ease-in-out">
                    Log in
                  </a>
                </Link>
                <Link href="/auth/register">
                  <a className="inline-block bg-white py-2 px-2 border border-transparent text-base font-semibold text-primary-600 hover:text-primary-700">
                    Register
                  </a>
                </Link>
              </>
            )}

            {session && (
              <>
                <UserPopover />
              </>
            )}
          </div>
        </div>
        <div className="py-2 flex flex-wrap justify-center space-x-6 lg:hidden bg-primary-600">
          {navigation.map((link, index) => (
            <Link key={index} href={link.href}>
              <a className="text-base font-medium text-primary-200 hover:text-primary-50">
                {link.name}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
