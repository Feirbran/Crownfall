import React, { useRef, useEffect } from 'react';

export default function CombatLog({
  logs = [],
  isOpenMobile = false,
  onToggleMobile = () => {},
  onCopyLog = () => {}
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <>
      {/* MOBILE FLOATING LOG TOGGLE */}
      <button
        className="mobile-log-drawer-btn"
        onClick={onToggleMobile}
        title="Apri Registro di Battaglia"
      >
        📜 Log ({logs.length})
      </button>

      {/* COMBAT LOG CONTAINER */}
      <div className={`combat-log-sidebar ${isOpenMobile ? 'open-mobile' : ''}`}>
        <div className="log-header-bar">
          <span className="log-title">📜 REGISTRO DI BATTAGLIA</span>
          <div className="log-actions">
            <button className="btn-copy-log" onClick={onCopyLog}>
              📋 Copia
            </button>
            <button className="btn-close-log-mobile" onClick={onToggleMobile}>
              ✕
            </button>
          </div>
        </div>

        <div className="log-entries-scroll" ref={containerRef}>
          {logs.length === 0 ? (
            <div className="log-empty-msg">Nessuna azione ancora registrata...</div>
          ) : (
            logs.map((item, idx) => {
              let typeClass = 'log-item-sys';
              if (item.type === 'p1') typeClass = 'log-item-p1';
              else if (item.type === 'p2') typeClass = 'log-item-p2';

              return (
                <div key={idx} className={`log-entry-row ${typeClass}`}>
                  <span className="log-time">[{item.time}]</span>
                  <span className="log-text">{item.text}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
