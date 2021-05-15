import { Transition } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { getSession, signIn } from "next-auth/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../../components/shared/logo";

export default function Login({ error }) {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) setShowError(true);

    const interval = setInterval(() => {
      setShowError(false);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (error) {
  }

  const handleLogin = (event) => {
    event.preventDefault();

    signIn("backend_api", credential);
  };

  return (
    <div className="flex items-center min-h-full justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-2">
            <div>
              <Transition
                show={showError}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <span className="block bg-red-200 text-red-500 py-2 px-2 w-full mb-2 text-center">
                  Invalid Credential
                </span>
              </Transition>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                value={credential.email}
                onChange={(event) => setCredential({ ...credential, email: event.target.value })}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={credential.password}
                onChange={(event) => setCredential({ ...credential, password: event.target.value })}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a className="font-medium text-primary-600 hover:text-primary-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-2 items-center">
            <button
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-primary-500 group-hover:text-primary-400"
                  aria-hidden="true"
                />
              </span>
              Log In
            </button>
            <Link href="/auth/register">
              <a className="text-sm text-primary-600 hover:text-primary-500">Create an account</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { error } = query;

  return {
    props: {
      error,
    },
  };
}
