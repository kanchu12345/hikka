import { MetadataRoute } from 'next';
import { getActivities, getTours } from '@/lib/db';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hikkasurfschool.com';
  const activities = getActivities();
  const tours = getTours();

  const staticRoutes = [
    '',
    '/tours',
    '/transfers',
    '/gallery',
    '/reviews',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const activityRoutes = activities.map((act) => ({
    url: `${baseUrl}/activities/${act.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: act.slug === 'surf-lessons' ? 0.95 : 0.85,
  }));

  const tourRoutes = tours.map((t) => ({
    url: `${baseUrl}/tours/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...activityRoutes, ...tourRoutes];
}
