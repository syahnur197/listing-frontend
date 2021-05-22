import { Formik } from "formik";
import { getSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../../components/shared/logo";
import { register } from "../../lib/backend-api/auth";
import {
  setDangerNotification,
  setSuccessNotification,
} from "../../lib/reducers/notification-slice";
import ValidationError from "../../components/shared/validation-error";
import { useDispatch } from "react-redux";

export default function Register() {
  const router = useRouter();

  const dispatch = useDispatch();

  const handleLoginButtonClicked = (event) => {
    event.preventDefault();
    router.push("/auth/login");
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
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            password_confirmation: "",
            mobile_number: "",
          }}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const response = await register(values);

              if (response.status === 201) {
                dispatch(
                  setSuccessNotification({
                    title: "Account Registered!",
                    message: "You have successfully registered your account!",
                  })
                );

                router.replace("/auth/login");
              }
            } catch (error) {
              if (error?.response?.status === 401) {
                dispatch(
                  setDangerNotification({
                    title: "Unauthorised!",
                    message: "Please try to re-login!",
                  })
                );

                setSubmitting(false);
                return;
              }

              if (!error?.response?.data?.errors) {
                console.error(error);
                dispatch(
                  setDangerNotification({
                    title: "Something is not right!",
                    message: "Please contact us to resolve this issue!",
                  })
                );

                return;
              }

              const { errors } = error?.response?.data;

              errors.forEach((_error) => {
                setFieldError(_error.param, _error.msg);
              });

              setSubmitting(false);

              dispatch(
                setDangerNotification({
                  title: "Something is not right!",
                  message: "Please re-check your car detail!",
                })
              );
            }
          }}
        >
          {(props) => (
            <form className="mt-8 space-y-6" action="#" method="POST">
              <div className="shadow-sm space-y-2">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={props.values.email}
                    onChange={(event) => props.setFieldValue("email", event.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                  <ValidationError errorMessage={props.errors.email} />
                </div>

                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="username"
                    value={props.values.username}
                    onChange={(event) => props.setFieldValue("username", event.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                  />
                  <ValidationError errorMessage={props.errors.username} />
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={props.values.password}
                    onChange={(event) => props.setFieldValue("password", event.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  <ValidationError errorMessage={props.errors.password} />
                </div>

                <div>
                  <label htmlFor="password_confirmation" className="sr-only">
                    Password Confirmation
                  </label>
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    value={props.values.password_confirmation}
                    onChange={(event) =>
                      props.setFieldValue("password_confirmation", event.target.value)
                    }
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                  <ValidationError errorMessage={props.errors.password_confirmation} />
                </div>

                <div>
                  <label htmlFor="mobile_number" className="sr-only">
                    Mobile Number
                  </label>
                  <input
                    id="mobile_number"
                    name="mobile_number"
                    type="number"
                    value={props.values.mobile_number}
                    onChange={(event) => props.setFieldValue("mobile_number", event.target.value)}
                    required
                    min="7000000"
                    max="8999999"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Mobile Number - optional"
                  />
                  <ValidationError errorMessage={props.errors.mobile_number} />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  disabled={props.isSubmitting}
                  onClick={props.handleSubmit}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  Register
                </button>
                <button
                  onClick={handleLoginButtonClicked}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-gray-500 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 "
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3 "></span>
                  Log In
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
