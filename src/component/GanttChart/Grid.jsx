export default function Grid({ children }) {
  return (
    <div id="gantt-grid-container">
      {children}
      <style>{`
        #gantt-grid-container {
          display: grid;
          // grid-template-columns: 150px 1fr;
          grid-template-columns: 200px 1fr;
          // outline: 2px solid var(--color-outline);
          border-radius: 5px;
          // border-radius: 10px;
          border: 2px solid white;
          // box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
          margin: 0px 20px ;
        }
      `}</style>
    </div>
  );
}
