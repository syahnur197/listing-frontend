import styles from "../../styles/items.module.css";

export default function ItemsBanner({ children, size = "large" }) {
  const sizes = {
    small: "py-8 md:py-8",
    large: "py-16 md:pt-32 md:pb-40 ",
  };
  return (
    <div className={`rounded-b-md px-4 ${styles.hero} ${sizes[size]}`}>
      <div className="flex flex-col w-full md:w-2/5 mx-auto">
        <h1 className="font-bold text-2xl md:text-5xl text-primary-900 self-center mb-4 relative">
          Items Listing
        </h1>
        {children}
      </div>
    </div>
  );
}
