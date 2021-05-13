/* This example requires Tailwind CSS v2.0+ */
const navigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Contact Us", href: "#" },
  ],
};

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item, index) => (
            <div key={index} className="px-5 py-2">
              <a
                href={item.href}
                className="text-base text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-4 text-center text-base text-gray-400">
          &copy; {currentYear} BruListing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
