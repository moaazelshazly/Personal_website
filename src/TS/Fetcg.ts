import { PORTFOLIO_DATA, type Project } from '../data/portfolioData';

export const GITHUB_TOKEN: string = (import.meta.env.VITE_GITHUB_TOKEN as string) || '';
export const GITHUB_USERNAME = "moaazelshazly";

export interface GitHubRepoRaw {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  homepage: string | null;
  topics?: string[];
  default_branch: string;
  fork: boolean;
  archived: boolean;
}

export interface GitHubUserRaw {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

// In-memory cache to prevent redundant API calls during client navigation
let cachedProjects: Project[] | null = null;
let cachedProfile: GitHubUserRaw | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute fresh cache

/**
 * Fetch all repositories for moaazelshazly
 */
export async function fetchGitHubRepos(): Promise<GitHubRepoRaw[]> {
  const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    const res = await fetch(url, { headers });

    if (!res.ok) {
      // If token rate limits or has issues, try public fallback
      const fallbackRes = await fetch(url, {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });
      if (fallbackRes.ok) {
        return (await fallbackRes.json()) as GitHubRepoRaw[];
      }
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = (await res.json()) as GitHubRepoRaw[];
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('Unable to fetch live GitHub repos, using fallback data:', err);
    return [];
  }
}

/**
 * Fetch GitHub user profile for moaazelshazly
 */
export async function fetchGitHubProfile(): Promise<GitHubUserRaw | null> {
  if (cachedProfile && Date.now() - lastFetchTime < CACHE_TTL_MS) {
    return cachedProfile;
  }

  const url = `https://api.github.com/users/${GITHUB_USERNAME}`;

  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    const res = await fetch(url, { headers });

    if (!res.ok) {
      const fallbackRes = await fetch(url);
      if (fallbackRes.ok) {
        cachedProfile = (await fallbackRes.json()) as GitHubUserRaw;
        return cachedProfile;
      }
      return null;
    }

    cachedProfile = (await res.json()) as GitHubUserRaw;
    return cachedProfile;
  } catch (err) {
    console.warn('Unable to fetch live GitHub profile:', err);
    return null;
  }
}

/**
 * Maps and enriches GitHub repo data with rich curated case studies from portfolioData
 */
export function enrichProjectsWithGitHubData(
  liveRepos: GitHubRepoRaw[],
  baseProjects: Project[] = PORTFOLIO_DATA.projects
): Project[] {
  if (!liveRepos || liveRepos.length === 0) {
    return baseProjects;
  }

  // Create lookup by normalized repo name
  const repoLookup = new Map<string, GitHubRepoRaw>();
  liveRepos.forEach((repo) => {
    repoLookup.set(repo.name.toLowerCase(), repo);
    // Also store normalized versions (e.g. without hyphens or underscores)
    repoLookup.set(repo.name.toLowerCase().replace(/[-_]/g, ''), repo);
  });

  const enriched = baseProjects.map((project) => {
    // Attempt to find matching GitHub repo
    const candidates = [
      project.id.toLowerCase(),
      project.id.toLowerCase().replace(/[-_]/g, ''),
      project.name.toLowerCase(),
      project.name.toLowerCase().replace(/[-_]/g, ''),
    ];

    let matchedRepo: GitHubRepoRaw | undefined;
    for (const c of candidates) {
      if (repoLookup.has(c)) {
        matchedRepo = repoLookup.get(c);
        break;
      }
    }

    // Also match by URL if present
    if (!matchedRepo && project.githubUrl) {
      const match = project.githubUrl.match(/github\.com\/[^/]+\/([^/]+)/);
      if (match && match[1]) {
        matchedRepo = repoLookup.get(match[1].toLowerCase());
      }
    }

    if (matchedRepo) {
      return {
        ...project,
        stars: matchedRepo.stargazers_count,
        forks: matchedRepo.forks_count,
        openIssues: matchedRepo.open_issues_count,
        updatedAt: matchedRepo.updated_at,
        language: matchedRepo.language || project.language || 'TypeScript',
        defaultBranch: matchedRepo.default_branch || 'main',
        githubUrl: matchedRepo.html_url || project.githubUrl,
        repoFullName: matchedRepo.full_name,
        tagline: project.tagline || matchedRepo.description || 'Engineered project repository.',
      };
    }

    return project;
  });

  // Also check if there are any repos on GitHub that aren't yet in baseProjects
  liveRepos.forEach((repo) => {
    const isAlreadyIncluded = enriched.some((p) => {
      const pName = p.name.toLowerCase().replace(/[-_]/g, '');
      const rName = repo.name.toLowerCase().replace(/[-_]/g, '');
      return pName === rName || p.githubUrl.toLowerCase().includes(repo.name.toLowerCase());
    });

    if (!isAlreadyIncluded && !repo.fork) {
      enriched.push({
        id: repo.name.toLowerCase().replace(/_/g, '-'),
        name: repo.name.replace(/[-_]/g, ' '),
        category: inferCategoryFromRepo(repo),
        tagline: repo.description || `Software repository engineered by ${GITHUB_USERNAME}.`,
        description:
          repo.description ||
          `Open source software repository hosted at github.com/${repo.full_name}. Built with ${repo.language || 'modern web technologies'}.`,
        problemSolved:
          'Modular code implementation built with structured Git version control and modern engineering practices.',
        technologies: [repo.language || 'Software', 'Git', 'GitHub API'].filter(Boolean),
        githubUrl: repo.html_url,
        demoUrl: repo.homepage || undefined,
        status: repo.archived ? 'Archived' : 'Active Repository',
        highlights: [
          `Primary language: ${repo.language || 'Multi-language'}`,
          `Branch: ${repo.default_branch}`,
          `Last updated: ${formatGitHubDate(repo.updated_at)}`,
        ],
        featured: false,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        updatedAt: repo.updated_at,
        language: repo.language || 'Code',
        defaultBranch: repo.default_branch,
        repoFullName: repo.full_name,
      });
    }
  });

  return enriched;
}

function inferCategoryFromRepo(repo: GitHubRepoRaw): Project['category'] {
  const lang = (repo.language || '').toLowerCase();
  const name = repo.name.toLowerCase();

  if (lang.includes('c++') || lang.includes('c#') || lang.includes('python') || name.includes('algo') || name.includes('neetcode')) {
    return 'Performance';
  }
  if (name.includes('design') || name.includes('ui') || name.includes('theme')) {
    return 'Design System';
  }
  if (name.includes('server') || name.includes('api') || name.includes('backend') || name.includes('full')) {
    return 'Full Stack';
  }
  return 'Frontend';
}

/**
 * Main project fetcher used by React Router loaders and components
 */
export async function fetchPortfolioProjects(forceRefresh = false): Promise<Project[]> {
  const isCacheValid = cachedProjects && Date.now() - lastFetchTime < CACHE_TTL_MS && !forceRefresh;
  if (isCacheValid && cachedProjects) {
    return cachedProjects;
  }

  try {
    const repos = await fetchGitHubRepos();
    const enriched = enrichProjectsWithGitHubData(repos, PORTFOLIO_DATA.projects);
    cachedProjects = enriched;
    lastFetchTime = Date.now();
    return enriched;
  } catch (err) {
    console.error('Error in fetchPortfolioProjects:', err);
    return PORTFOLIO_DATA.projects;
  }
}

/**
 * Format ISO GitHub date into user-friendly string
 */
export function formatGitHubDate(isoString?: string): string {
  if (!isoString) return 'Recently';
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return isoString;
  }
}

/**
 * Language color mapping for tags
 */
export function getLanguageColor(language?: string): string {
  switch ((language || '').toLowerCase()) {
    case 'typescript':
      return '#3178c6';
    case 'javascript':
      return '#f7df1e';
    case 'c++':
      return '#f34b7d';
    case 'css':
    case 'html':
      return '#e34c26';
    case 'python':
      return '#3572a5';
    default:
      return '#5e6ad2';
  }
}

// Backward compatibility with user's original Fetcg.ts functions
export const githubToken = GITHUB_TOKEN;

export async function getReop() {
  return await fetchGitHubRepos();
}

export async function main() {
  const data = await getReop();
  console.log('GitHub Repos for', GITHUB_USERNAME, data);
}