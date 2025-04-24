import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Route = {
  path: string;
  description: string;
};

export const getStaticProps: GetStaticProps<{ routes: Route[] }> = async () => {
  const pagesDir = path.join(process.cwd(), "pages");
  const routes: Route[] = [];

  function scanRoutes(dir: string, basePath: string = "") {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Recurse into subdirectories
        scanRoutes(fullPath, `${basePath}/${file}`);
      } else if (file.match(/\.(js|ts|jsx|tsx)$/)) {
        // Skip special files (e.g., _app.ts, _document.ts)
        if (file.startsWith("_")) return;

        let route = `${basePath}/${file.replace(/\.(js|ts|jsx|tsx)$/, "")}`;
        // Convert index to root path
        route = route.replace(/\/index$/, "") || "/";
        // Convert dynamic segments (e.g., [id] to :id)
        route = route.replace(/\[([^\]]+)\]/g, ":$1");

        // Infer HTTP methods and description based on route patterns
        const description = route.includes(":")
          ? `Manage resource by ID`
          : route === "/api/hello"
          ? "Simple hello world endpoint"
          : route.includes("week")
          ? `Manage ${route.includes("weeks") ? "weeks" : "weekly notes"}`
          : `Manage ${route.split("/").pop() || "resources"}`;

        routes.push({ path: route, description });
      }
    });
  }

  try {
    scanRoutes(pagesDir);
    // Sort routes alphabetically for consistency
    routes.sort((a, b) => a.path.localeCompare(b.path));
  } catch (error) {
    console.error("Error scanning routes:", error);
  }

  return { props: { routes } };
};

export default function Home({ routes }: { routes: Route[] }) {
  return (
    <>
      <Head>
        <title>API Routes Documentation - Next.js App</title>
        <meta
          name="description"
          content="Documentation of all API routes in the Next.js application"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1>API Routes Documentation</h1>
          <p>
            Below is a list of all available API routes in the application,
            their supported HTTP methods, and a brief description.
          </p>

          <table className={styles.routesTable}>
            <thead>
              <tr>
                <th>Route</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <tr key={index}>
                  <td>
                    <code>{route.path}</code>
                  </td>
                  <td>{route.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}
