import { SectorData } from './types';

export default function SectorDetails({
  sector,
}: {
  sector: SectorData;
}) {
  if (!('market_context' in sector)) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Upgrade to PRO to unlock full sector analysis.
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
      <Block title="Market Context" text={sector.market_context} />
      <Block title="Phase & Health" text={sector.phase_and_health} />
      <Block
        title="Rationale & Elliott Wave"
        text={sector.rationale_and_elliott_wave}
      />
      <Block
        title="Risk & Volume"
        text={sector.risk_and_volume_profile}
      />
      <Block
        title="Execution"
        text={sector.execution_protocol}
      />
      <Block
        title="Allocation"
        text={`${sector.sector_portfolio_percentage}%`}
      />
      <Block title="Targets" text={sector.week_targets} />
      <Block title="Top Tickers" text={sector.top_3_tickers} />
    </div>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <div className="text-xs uppercase font-semibold text-slate-400 mb-1">
        {title}
      </div>
      <div className="leading-relaxed">{text}</div>
    </div>
  );
}
