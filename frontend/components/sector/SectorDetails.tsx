import { SectorData } from './types';

export default function SectorDetails({
  sector,
}: {
  sector: SectorData;
}) {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
      <Block title="Market Context" text={'market_context' in sector ? sector.market_context : ''} />
      <Block title="Phase & Health" text={'phase_and_health' in sector ? sector.phase_and_health : ''} />
      <Block
        title="Rationale & Elliott Wave"
        text={'rationale_and_elliott_wave' in sector ? sector.rationale_and_elliott_wave : ''}
      />
      <Block
        title="Risk & Volume"
        text={'risk_and_volume_profile' in sector ? sector.risk_and_volume_profile : ''}
      />
      <Block
        title="Execution"
        text={'execution_protocol' in sector ? sector.execution_protocol : ''}
      />
      <Block
        title="Allocation"
        text={'sector_portfolio_percentage' in sector ? `${sector.sector_portfolio_percentage}%` : ''}
      />
      <Block title="Targets" text={'week_targets' in sector ? sector.week_targets : ''} />
      <Block title="Top Tickers" text={'top_3_tickers' in sector ? sector.top_3_tickers : ''} />
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