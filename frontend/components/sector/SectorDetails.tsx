import { SectorData } from './types';

export default function SectorDetails({
  sector,
}: {
  sector: SectorData;
}) {
  if (!('market_context' in sector)) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-8">
        <div className="max-w-md text-center">
          <h3 className="mb-2 text-base font-semibold text-slate-800">
            Unlock Full Sector Insights
          </h3>

          <p className="mb-4 text-sm text-slate-600">
            View complete tables, metrics, and detailed market context by logging
            in or creating a free account.
          </p>

          <div className="flex items-center justify-center gap-3">
            <a
              href="/login"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Log in
            </a>

            <a
              href="/signup"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Free Sign Up
            </a>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            No credit card required.
          </p>
        </div>
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