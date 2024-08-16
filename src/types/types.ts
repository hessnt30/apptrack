export type Application = {
  id?: number;
  user_id?: string;
  title: string;
  company: string;
  description?: string;
  application_date: string;
  stage?: string;
  last_updated?: string;
  is_favorite?: boolean;
};
