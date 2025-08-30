
export interface Project {
  projectName: string;
  websiteUrl: string;
  shortDescription: string;
  twitterUrl: string | null;
  telegramUrl: string | null;
  discordUrl: string | null;
  githubUrl: string | null;
  docsUrl: string | null;
  contactEmails: string | null;
  ecosystem: string;
  lastGithubActivity: string | null;
  launchSignal: string | null;
  source: string;
}
