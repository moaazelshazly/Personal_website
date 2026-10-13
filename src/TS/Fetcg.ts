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

// In-memory & sessionStorage cache to prevent redundant API calls during client navigation
let cachedProjects: Project[] | null = null;
let cachedProfile: GitHubUserRaw | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes fresh cache
const STORAGE_KEY_PROJECTS = 'portfolio_cached_projects_v3';
const STORAGE_KEY_PROFILE = 'portfolio_cached_profile_v3';

// Clear legacy session storage cache to ensure newly added token and repos take immediate effect
try {
  sessionStorage.removeItem('portfolio_cached_projects_v2');
  sessionStorage.removeItem('portfolio_cached_profile_v2');
} catch {
  // Ignore in SSR / non-browser environments
}

function readSessionCache<T>(key: string): { data: T; timestamp: number } | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeSessionCache<T>(key: string, data: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Fetch all repositories for moaazelshazly with timeout protection and authenticated support
 */
export async function fetchGitHubRepos(): Promise<GitHubRepoRaw[]> {
  const authHeader = GITHUB_TOKEN
    ? (GITHUB_TOKEN.startsWith('ghp_') ? `token ${GITHUB_TOKEN}` : `Bearer ${GITHUB_TOKEN}`)
    : '';

  const userReposUrl = `https://api.github.com/user/repos?affiliation=owner,collaborator&sort=updated&per_page=100`;
  const publicReposUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (authHeader) {
      headers.Authorization = authHeader;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const primaryUrl = authHeader ? userReposUrl : publicReposUrl;
    const res = await fetch(primaryUrl, { headers, signal: controller.signal }).finally(() => {
      clearTimeout(timeoutId);
    });

    if (!res.ok) {
      // If primary fails or user/repos forbidden, fallback to public endpoint
      const fallbackController = new AbortController();
      const fallbackTimeoutId = setTimeout(() => fallbackController.abort(), 4000);
      const fallbackRes = await fetch(publicReposUrl, {
        headers: { Accept: 'application/vnd.github.v3+json' },
        signal: fallbackController.signal,
      }).finally(() => {
        clearTimeout(fallbackTimeoutId);
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
 * Fetch GitHub user profile for moaazelshazly with persistent caching & timeout
 */
export async function fetchGitHubProfile(): Promise<GitHubUserRaw | null> {
  const now = Date.now();
  if (cachedProfile && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedProfile;
  }

  // Check sessionStorage
  const sessionItem = readSessionCache<GitHubUserRaw>(STORAGE_KEY_PROFILE);
  if (sessionItem && now - sessionItem.timestamp < CACHE_TTL_MS) {
    cachedProfile = sessionItem.data;
    return cachedProfile;
  }

  const url = `https://api.github.com/users/${GITHUB_USERNAME}`;

  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (GITHUB_TOKEN) {
      headers.Authorization = GITHUB_TOKEN.startsWith('ghp_')
        ? `token ${GITHUB_TOKEN}`
        : `Bearer ${GITHUB_TOKEN}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(url, { headers, signal: controller.signal }).finally(() => {
      clearTimeout(timeoutId);
    });

    if (!res.ok) {
      if (sessionItem?.data) {
        cachedProfile = sessionItem.data;
        return cachedProfile;
      }
      return null;
    }

    cachedProfile = (await res.json()) as GitHubUserRaw;
    writeSessionCache(STORAGE_KEY_PROFILE, cachedProfile);
    return cachedProfile;
  } catch (err) {
    console.warn('Unable to fetch live GitHub profile:', err);
    if (sessionItem?.data) {
      cachedProfile = sessionItem.data;
      return cachedProfile;
    }
    return null;
  }
}

/**
 * Fetch detected languages for a specific repository via GitHub API
 */
async function fetchRepoLanguages(languagesUrl: string): Promise<string[]> {
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json' };
    if (GITHUB_TOKEN) {
      headers.Authorization = GITHUB_TOKEN.startsWith('ghp_')
        ? `token ${GITHUB_TOKEN}`
        : `Bearer ${GITHUB_TOKEN}`;
    }
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(languagesUrl, { headers, signal: controller.signal }).finally(() => clearTimeout(t));
    if (res.ok) {
      const data = (await res.json()) as Record<string, number>;
      return Object.keys(data);
    }
  } catch {
    // Graceful fallback if rate limited or network timeout
  }
  return [];
}

/**
 * Maps and enriches GitHub repo data dynamically with live GitHub API data and fallback case studies
 */
export function enrichProjectsWithGitHubData(
  liveRepos: GitHubRepoRaw[],
  baseProjects: Project[] = PORTFOLIO_DATA.projects,
  repoLanguagesMap?: Map<string, string[]>
): Project[] {
  if (!liveRepos || liveRepos.length === 0) {
    return baseProjects;
  }

  // Create lookup by normalized repo name
  const repoLookup = new Map<string, GitHubRepoRaw>();
  liveRepos.forEach((repo) => {
    repoLookup.set(repo.name.toLowerCase(), repo);
    // Also store normalized versions (without hyphens or underscores)
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
        const slug = match[1].toLowerCase();
        matchedRepo = repoLookup.get(slug) || repoLookup.get(slug.replace(/[-_]/g, ''));
      }
    }

    if (matchedRepo) {
      const liveLanguages = repoLanguagesMap?.get(matchedRepo.name.toLowerCase()) || [];
      const dynamicTech = Array.from(new Set([
        ...project.technologies,
        ...liveLanguages,
        ...(matchedRepo.topics || []),
      ])).slice(0, 8);

      return {
        ...project,
        stars: matchedRepo.stargazers_count,
        forks: matchedRepo.forks_count,
        openIssues: matchedRepo.open_issues_count,
        updatedAt: matchedRepo.updated_at,
        language: matchedRepo.language || project.language || 'TypeScript',
        defaultBranch: matchedRepo.default_branch || 'main',
        githubUrl: matchedRepo.html_url || project.githubUrl,
        demoUrl: project.demoUrl || (matchedRepo.homepage ? matchedRepo.homepage : undefined),
        repoFullName: matchedRepo.full_name,
        tagline: project.tagline || matchedRepo.description || `Software repository engineered by ${GITHUB_USERNAME}.`,
        technologies: dynamicTech.length > 0 ? dynamicTech : project.technologies,
      };
    }

    return project;
  });

  // Automatically add any newly discovered repositories from GitHub that aren't yet in baseProjects
  liveRepos.forEach((repo) => {
    const isAlreadyIncluded = enriched.some((p) => {
      const pName = p.name.toLowerCase().replace(/[-_]/g, '');
      const rName = repo.name.toLowerCase().replace(/[-_]/g, '');
      const pId = p.id.toLowerCase().replace(/[-_]/g, '');
      return pName === rName || pId === rName || p.githubUrl.toLowerCase().includes(repo.name.toLowerCase());
    });

    if (!isAlreadyIncluded && !repo.fork) {
      const liveLanguages = repoLanguagesMap?.get(repo.name.toLowerCase()) || [];
      const dynamicTech = Array.from(new Set([
        repo.language || '',
        ...liveLanguages,
        ...(repo.topics || []),
        'Git',
      ])).filter(Boolean).slice(0, 7);

      const formattedName = repo.name
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      enriched.push({
        id: repo.name.toLowerCase().replace(/_/g, '-'),
        name: formattedName,
        category: inferCategoryFromRepo(repo),
        tagline: repo.description || `Dynamic software repository engineered by ${GITHUB_USERNAME}.`,
        description:
          repo.description ||
          `Open source software repository hosted at github.com/${repo.full_name}. Built with ${repo.language || 'modern web technologies'} and structured version control.`,
        problemSolved:
          `Engineered modular software architecture in ${repo.language || 'TypeScript'} with Git branch management and GitHub API telemetry synchronization.`,
        technologies: dynamicTech,
        githubUrl: repo.html_url,
        demoUrl: repo.homepage || undefined,
        status: repo.archived ? 'Archived' : 'Active Repository',
        highlights: [
          `Primary language: ${repo.language || 'Multi-language'}`,
          `Default branch: ${repo.default_branch || 'main'}`,
          `Last updated: ${formatGitHubDate(repo.updated_at)}`,
          ...(repo.homepage ? [`Live deployment: ${repo.homepage}`] : []),
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

  // Sort: featured projects first, then by latest updatedAt date from GitHub
  enriched.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return dateB - dateA;
  });

  return enriched;
}

function inferCategoryFromRepo(repo: GitHubRepoRaw): Project['category'] {
  const lang = (repo.language || '').toLowerCase();
  const name = repo.name.toLowerCase();
  const topics = (repo.topics || []).map((t) => t.toLowerCase());

  if (
    lang.includes('c++') ||
    lang.includes('c#') ||
    lang.includes('python') ||
    name.includes('algo') ||
    name.includes('neetcode') ||
    name.includes('library')
  ) {
    return 'Performance';
  }
  if (name.includes('design') || name.includes('ui') || name.includes('theme') || topics.includes('design-system')) {
    return 'Design System';
  }
  if (
    name.includes('server') ||
    name.includes('api') ||
    name.includes('backend') ||
    name.includes('full') ||
    name.includes('depi') ||
    topics.includes('backend')
  ) {
    return 'Full Stack';
  }
  return 'Frontend';
}

/**
 * Main project fetcher used by React Router loaders and components
 */
export async function fetchPortfolioProjects(forceRefresh = false): Promise<Project[]> {
  const now = Date.now();
  const isMemoryValid = cachedProjects && now - lastFetchTime < CACHE_TTL_MS && !forceRefresh;
  if (isMemoryValid && cachedProjects) {
    return cachedProjects;
  }

  // Check sessionStorage
  if (!forceRefresh) {
    const sessionItem = readSessionCache<Project[]>(STORAGE_KEY_PROJECTS);
    if (sessionItem && now - sessionItem.timestamp < CACHE_TTL_MS) {
      cachedProjects = sessionItem.data;
      lastFetchTime = sessionItem.timestamp;
      return cachedProjects;
    }
  }

  try {
    const repos = await fetchGitHubRepos();

    // Fetch live detected languages for each repo in parallel (with timeout)
    const repoLanguagesMap = new Map<string, string[]>();
    await Promise.allSettled(
      repos.map(async (repo) => {
        const langUrl = (repo as unknown as { languages_url?: string }).languages_url || `https://api.github.com/repos/${repo.full_name}/languages`;
        const langs = await fetchRepoLanguages(langUrl);
        if (langs.length > 0) {
          repoLanguagesMap.set(repo.name.toLowerCase(), langs);
        }
      })
    );

    const enriched = enrichProjectsWithGitHubData(repos, PORTFOLIO_DATA.projects, repoLanguagesMap);
    cachedProjects = enriched;
    lastFetchTime = Date.now();
    writeSessionCache(STORAGE_KEY_PROJECTS, enriched);
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