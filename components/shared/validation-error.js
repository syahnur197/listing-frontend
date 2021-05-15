export default function ValidationError({ errorMessage }) {
  return (
    <>{errorMessage && <span className="text-red-500 text-sm block mt-1">{errorMessage}</span>}</>
  );
}
