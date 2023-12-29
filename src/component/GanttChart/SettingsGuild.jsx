export default function Settings({ children }) {
  return (
    <div
      id="settings"
      className="flex flex-col p-4 w-full pb-0 md:justify-between md:flex-row"
    >
      {children}
    </div>
  );
}
