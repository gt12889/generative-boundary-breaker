
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Source {
  name: string;
  url: string;
  date: string;
  description: string;
}

const sources: Source[] = [
  {
    name: "Metricool",
    url: "https://metricool.com/instagram-statistics/",
    date: "January 27, 2025",
    description: "Instagram has over 2 billion monthly active users. Behind Facebook and YouTube, Instagram is the third most popular social media platform (tied with WhatsApp)."
  },
  {
    name: "Backlinko",
    url: "https://backlinko.com/instagram-users",
    date: "March 10, 2025",
    description: "Instagram users is 2 billion monthly active users (MAUs). Company statistics from 2023 to 2024 show 50 million user growth; 2024 to 2025 show 40 million growth."
  },
  {
    name: "DemandSage",
    url: "https://www.demandsage.com/tiktok-users/",
    date: "December 31, 2024",
    description: "TikTok has 1.69 Billion Monthly Active Users. TikTok's financial performance shows impressive growth in the first half of 2024."
  },
  {
    name: "Everything PR",
    url: "https://everything-pr.com/snapchat-marketing/",
    date: "February 18, 2025",
    description: "Snapchat's core feature—ephemeral content—sets it apart from other platforms. When users post photos or videos, they disappear after 24 hours."
  },
  {
    name: "5WPR Blog",
    url: "https://www.5wpr.com/new/snapchat-marketing/",
    date: "March 31, 2025",
    description: "Snapchat pioneered the use of augmented reality (AR) with its lenses and filters, allowing users to add fun, interactive elements to their content."
  },
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/2023/07/24/twitter-is-now-x/",
    date: "April 15, 2025",
    description: "Twitter's rebrand to X marks a strategic shift toward becoming a comprehensive 'everything app' integrating social media, content creation, and financial services under Elon Musk's leadership."
  },
  {
    name: "Forbes",
    url: "https://www.forbes.com/sites/qai/2023/08/17/x-vs-twitter-99-days-since-elon-musks-rebrand/",
    date: "March 28, 2025",
    description: "X has approximately 600 million monthly active users, with 58% under 35 years old. The platform has introduced long-form content, AI integration, and expanded monetization options."
  }
];

const ComparisonSources = () => {
  return (
    <div className="mt-8 bg-card rounded-lg border p-6">
      <h3 className="text-xl font-semibold mb-6">Data Sources</h3>
      <div className="space-y-4">
        {sources.map((source, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <img 
                  src={`https://www.google.com/s2/favicons?domain=${new URL(source.url).hostname}`}
                  alt={`${source.name} favicon`}
                  className="w-4 h-4"
                />
                {source.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{source.date}</p>
              <p className="text-sm">{source.description}</p>
              <a 
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline mt-2 inline-block"
              >
                Read more
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComparisonSources;
