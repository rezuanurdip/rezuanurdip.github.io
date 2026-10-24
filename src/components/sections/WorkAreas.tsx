import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import FigureHeader from '@/components/ui/FigureHeader';
import LegendTags from '@/components/ui/LegendTags';
import {
  HexbinGlyph,
  DagGlyph,
  DecisionBoundaryGlyph,
  EmbeddingClusterGlyph,
  BarSeriesGlyph,
  NodeGraphGlyph,
} from '@/components/viz/Glyphs';

const glyphMap: Record<string, React.ComponentType> = {
  FaMap: HexbinGlyph,
  FaDatabase: DagGlyph,
  FaBrain: DecisionBoundaryGlyph,
  FaRobot: EmbeddingClusterGlyph,
  FaChartLine: BarSeriesGlyph,
  FaCloud: NodeGraphGlyph,
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
    <section className="py-24 lg:py-40 border-t border-rule">
      <div className="section-container">
        <FigureHeader
          label="WORK AREAS"
          title="A cross-stack practitioner"
          subheading="From raw pipeline to deployed model to executive dashboard."
        />

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 border-t border-l border-rule">
          {areas.map((area) => {
            const Glyph = glyphMap[area.icon] || DecisionBoundaryGlyph;
            return (
              <div key={area.id} className="group border-r border-b border-rule p-8 lg:p-10">
                <Glyph />
                <h3 className="text-h3 text-ink mt-6 mb-3">{area.title}</h3>
                <p className="text-ink/80 text-sm leading-[1.6] mb-6 max-w-[34ch]">{area.description}</p>
                <LegendTags items={area.tools.map((t) => t.toLowerCase())} />
              </div>
            );
          })}
        </div>

        <Link
          href="/experience"
          className="mt-10 flex items-center justify-between gap-4 border-t border-b border-rule py-6 group hover:border-accent transition-colors"
        >
          <span className="text-lg text-ink">Explore my detailed work experience</span>
          <span className="flex items-center gap-2 text-graphite group-hover:text-accent transition-colors shrink-0">
            View experience
            <FiArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </section>
  );
}
