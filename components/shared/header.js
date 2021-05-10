import Link from "next/link";
import Logo from "./logo";

const navigation = [
  { name: "Items", href: "/" },
  { name: "Jobs", href: "#" },
  { name: "Contact Us", href: "#" },
  //   { name: "Docs", href: "#" },
  //   { name: "Company", href: "#" },
];

export default function Header() {
  return (
    <header className="">
      <nav className="max-w-7xl mx-auto sm:px-6 lg:px-8 " aria-label="Top">
        <div className="w-full px-4 py-6 flex items-center justify-between border-primary-500 lg:border-none bg-white">
          <div className="flex items-center">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link, index) => (
                <Link key={index} href={link.href}>
                  <a className="text-lg font-medium text-primary-600 hover:text-primary-50">
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-2 ">
            <Link href="/auth/login">
              <a className="inline-block bg-primary-500 py-2 px-2 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                Log in
              </a>
            </Link>
            <Link href="/auth/register">
              <a className="inline-block bg-white py-2 px-2 border border-transparent rounded-md text-base font-medium text-primary-600 hover:bg-primary-50">
                Register
              </a>
            </Link>
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
