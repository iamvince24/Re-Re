export default function Settings({ children }) {
  return (
    <div id="settings">
      {children}
      <style jsx>{`
        #settings {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          /* padding: 1rem 0; */
          padding: 0px 20px 20px;
          margin-bottom: 20px;
          border-bottom: 3px solid #f2d4cc;
        }
      `}</style>
    </div>
  );
}
