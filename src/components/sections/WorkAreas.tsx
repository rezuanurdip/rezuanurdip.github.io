import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import {
  FaMap, FaDatabase, FaBrain, FaRobot, FaChartLine, FaCloud
} from 'react-icons/fa';

const iconMap: Record<string, React.ElementType> = {
  FaMap, FaDatabase, FaBrain, FaRobot, FaChartLine, FaCloud
};

interface Area {
  id: string;
  title: string;
  description: string;
  icon: string;
  tools: string[];
}

export default function WorkAreas({ areas }: { areas: Area[] }) {
  return (
    <section className="py-24 lg:py-36 bg-navy-800/40">
      <div className="section-container-wide">
        <div className="text-center mb-16">
          <p className="section-label">What I do</p>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-surface-50 mb-5">Work areas</h2>
          <p className="text-surface-300 text-lg lg:text-xl max-w-2xl mx-auto">
            A cross-stack practitioner — from raw pipeline to deployed model to executive dashboard.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {areas.map((area) => {
            const Icon = iconMap[area.icon] || FaBrain;
            return (
              <div
                key={area.id}
                className="card card-hover group p-10"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mb-7 group-hover:bg-accent-500/20 transition-colors">
                  <Icon className="text-accent-400" size={30} />
                </div>

                <h3 className="font-display font-semibold text-2xl text-surface-100 mb-3">
                  {area.title}
                </h3>

                <p className="text-lg text-surface-400 leading-relaxed mb-7">
                  {area.description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {area.tools.map((t) => (
                    <span key={t} className="text-sm font-mono px-3 py-1.5 rounded bg-navy-700/60 text-surface-400 border border-surface-700/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout banner */}
        <Link
          href="/experience"
          className="mt-12 flex items-center justify-between gap-4 rounded-2xl border border-accent-500/25 bg-accent-500/10 px-8 py-7 hover:bg-accent-500/15 hover:border-accent-500/40 transition-colors group"
        >
          <span className="font-display font-semibold text-lg sm:text-xl text-surface-100">
            Explore my detailed work experience
          </span>
          <span className="flex items-center gap-2 text-accent-400 font-medium text-lg shrink-0 group-hover:translate-x-1 transition-transform">
            View experience <FiArrowRight size={20} />
          </span>
        </Link>
      </div>
    </section>
  );
}
