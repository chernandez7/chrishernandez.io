"use client";

import { memo } from "react";
import { promotionTracks } from "../../lib/home-content";
import { SectionGlyphFields } from "./SectionGlyphFields";

function WorkHistoryPanelImpl() {
  const chronologicalTracks = [...promotionTracks].sort((a, b) => {
    const getFirstYear = (period: string) => {
      const match = period.match(/(\d{4})/);
      return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
    };
    return (
      getFirstYear(b.stages[0]?.period ?? "") -
      getFirstYear(a.stages[0]?.period ?? "")
    );
  });
  const newestFirstTracks = chronologicalTracks.map((track) => ({
    ...track,
    stages: [...track.stages].sort((a, b) => {
      const getFirstYear = (period: string) => {
        const match = period.match(/(\d{4})/);
        return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
      };
      return getFirstYear(b.period) - getFirstYear(a.period);
    }),
  }));

  const emphasizeConsoleText = (text: string) => {
    const pattern =
      /(Infectious disease|team of one|frameworks|AI|CIAM|COVID|Fortune 500|machine vision|Contract|30k|word-of-mouth|Liquid Studios)/gi;
    const parts = text.split(pattern);

    return parts.map((part, index) => {
      if (part.match(pattern)) {
        return (
          <span key={`${text}-${index}`} className="work-history__hl">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <>
      <SectionGlyphFields variant="history" />
      <div className="work-history">
        <div className="work-history__header">
          <p className="work-history__eyebrow">Experience</p>
          <h2 className="work-history__title">Career Path</h2>
          <p className="work-history__lede">
            Roles and progression across startups, consulting, and
            platform-scale engineering.
          </p>
          <p className="work-history__margin-note">
            A chronological field log of companies and roles across each era.
          </p>
        </div>

        <ul
          className="work-history__list"
          aria-label="Career timeline newest first"
        >
          {newestFirstTracks.map((track) => (
            <li
              key={track.company}
              className="work-history__item work-history__item--track"
            >
              <p className="work-history__company">
                {track.company}
                {track.subtitle ? (
                  <span className="work-history__company-subtitle">
                    {track.subtitle}
                  </span>
                ) : null}
              </p>
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
              {track.highlights && track.highlights.length > 0 ? (
                <ul
                  className="work-history__highlights"
                  aria-label={`${track.company} highlights`}
                >
                  {track.highlights.map((item) => (
                    <li key={`${track.company}-${item}`}>
                      {emphasizeConsoleText(item)}
                    </li>
                  ))}
                </ul>
              ) : null}
              {track.evidenceUrl ? (
                <a
                  className="work-history__evidence"
                  href={track.evidenceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {track.evidenceLabel ?? "Evidence"}
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const WorkHistoryPanel = memo(WorkHistoryPanelImpl);
WorkHistoryPanel.displayName = "WorkHistoryPanel";
