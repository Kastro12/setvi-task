import { getRequest } from './api';

export interface QuoteProps {
  author: string;
  id: number;
  quote: string;
}

export interface QuotesProps {
  limit: number;
  quotes: QuoteProps[];
  skip: number;
  total: number;
}

export const getMergedQuotes = async () => {
  const res = await getRequest<QuotesProps>(`/quotes`);

  return res.quotes.map((q: QuoteProps) => q.quote).join(' ');
};
