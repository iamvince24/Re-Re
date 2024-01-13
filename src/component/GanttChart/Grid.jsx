export default function Grid({ children, isSmallScreen, theme }) {
  return (
    <div id="gantt-grid-container">
      {children}
      <style>{`
        #gantt-grid-container {
          height: auto;
          max-height: calc(100% - 240px);
          display: grid;   
          grid-template-columns: ${isSmallScreen ? "180px 1fr" : "225px 1fr"};
          border-radius: 5px;
          outline: 2px solid var(--primary-color);
          margin: 25px 20px 0px ;
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
          overflow: scroll;
          // align-content: start;
        }
      `}</style>
    </div>
  );
}
