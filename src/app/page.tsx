import HeroSection from '@/components/sections/HeroSection';
import MetricsBand from '@/components/sections/MetricsBand';
import BlogSlideshow from '@/components/sections/BlogSlideshow';
import WorkAreas from '@/components/sections/WorkAreas';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import FeaturedPublications from '@/components/sections/FeaturedPublications';
import OpenSourceSection from '@/components/sections/OpenSourceSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import CTASection from '@/components/sections/CTASection';

import profile from '../../data/profile.json';
import blogPosts from '../../data/blog.json';
import workAreas from '../../data/workAreas.json';
import projects from '../../data/projects.json';
import publications from '../../data/publications.json';
import opensource from '../../data/opensource.json';
import achievements from '../../data/achievements.json';

export default function HomePage() {
  const featuredPosts     = blogPosts.filter((p) => p.featured);
  const featuredProjects  = projects.filter((p) => p.featured);

  return (
    <>
      <HeroSection profile={profile} />
      <MetricsBand />
      <BlogSlideshow posts={featuredPosts} />
      <WorkAreas areas={workAreas} />
      <FeaturedProjects projects={featuredProjects} />
      <FeaturedPublications publications={publications.slice(0, 3)} />
      <OpenSourceSection items={opensource} />
      <AchievementsSection achievements={achievements} />
      <CTASection profile={profile} />
    </>
  );
}
