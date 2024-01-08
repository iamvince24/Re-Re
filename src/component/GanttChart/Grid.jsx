export default function Grid({ children }) {
  return (
    <div id="gantt-grid-container">
      {children}
      <style>{`
        #gantt-grid-container {
          height: auto;
          max-height: calc(100% - 240px);
          display: grid;
          grid-template-columns: 225px 1fr;
          border-radius: 5px;
          outline: 2px solid var(--color-Gantt-Outline);
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
          margin: 0px 20px ;
          overflow: scroll;
          // align-content: start;
        }
      `}</style>
    </div>
  );
}
