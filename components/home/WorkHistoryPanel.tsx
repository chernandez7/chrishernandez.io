"use client";

import { memo } from "react";
import { promotionTracks, type SectionId } from "../../lib/home-content";
import { SectionGlyphFields } from "./SectionGlyphFields";

type WorkHistoryPanelProps = {
  onScrollToSection: (section: SectionId) => void;
};

function WorkHistoryPanelImpl({ onScrollToSection }: WorkHistoryPanelProps) {
  return (
    <>
      <SectionGlyphFields variant="history" />
      <div className="work-history">
        <div className="work-history__header">
          <p className="work-history__eyebrow">Field Record</p>
          <h2 className="work-history__title">Craft Chronicle</h2>
          <p className="work-history__lede">
            Stations in the craft, from startup crucibles to platform-scale
            systems.
          </p>
        </div>

        <ul className="work-history__list" aria-label="Craft chronicle">
          {promotionTracks.map((track) => (
            <li
              key={track.company}
              className="work-history__item work-history__item--track"
            >
              <p className="work-history__company">{track.company}</p>
              <ol
                className="work-history__stages"
                aria-label={`${track.company} progression`}
              >
                {track.stages.map((stage) => (
                  <li
                    key={`${track.company}-${stage.period}`}
                    className="work-history__stage"
                  >
                    <p className="work-history__period">{stage.period}</p>
                    <p className="work-history__role">{stage.role}</p>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>

        <div className="section-arrow-row">
          <button
            type="button"
            className="section-arrow section-arrow--up"
            onClick={() => onScrollToSection("hero")}
            aria-label="Scroll to top section"
          >
            <span>Return</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 20V6" />
              <path d="M6 12l6-6 6 6" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export const WorkHistoryPanel = memo(WorkHistoryPanelImpl);
WorkHistoryPanel.displayName = "WorkHistoryPanel";
