import { Helmet } from "react-helmet-async";

export default function SEO() {
  const title =
    "Yuvaraj R | Full Stack Developer, Technical Trainer & Founder";

  const description =
    "Portfolio of Yuvaraj R — Full Stack Developer, Technical Trainer and Founder building practical software products with Java, Spring Boot, React and modern web technologies.";

  const siteUrl = "https://yuvaraj-developer-portfolio.vercel.app/";

  return (
    <Helmet>
      <html lang="en" />

      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="author"
        content="Yuvaraj R"
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <meta
        name="theme-color"
        content="#070b16"
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={siteUrl}
      />

      <meta
        property="og:site_name"
        content="Yuvaraj R"
      />

      <meta
        property="og:image"
        content={`${siteUrl}/og-image.png`}
      />

      {/* Twitter / X */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={`${siteUrl}/og-image.png`}
      />

      <link
        rel="canonical"
        href={siteUrl}
      />
    </Helmet>
  );
}