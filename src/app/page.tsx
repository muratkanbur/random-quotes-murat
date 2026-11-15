import { getQuotes } from "./action";
import HomePageClient from "./HomePageClient";

function shuffleQuotes<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

export default async function Home() {
  const quotes = await getQuotes();

  return <HomePageClient quotes={shuffleQuotes(quotes)} />;
}
