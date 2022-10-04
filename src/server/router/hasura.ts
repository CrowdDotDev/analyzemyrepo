import { createRouter } from "./context";
import { z } from "zod";

export const hasuraRouter = createRouter()
  .query("get_repo_rank", {
    input: z.object({
      owner: z.string(),
      repo: z.string(),
    }),
    async resolve({ input }) {
      const response = await fetch(
        `${process.env.HASURA_URL as string}/api/rest/get_repo_rank`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": process.env.HASURA_SECRET as string,
          },
          body: JSON.stringify({
            full_name: `${input.owner}/${input.repo}`,
          }),
        }
      );

      return response.json();
    },
  })
  .query("get_repo_contributors_countries", {
    input: z.object({
      owner: z.string(),
      repo: z.string(),
    }),
    async resolve({ input }) {
      const response = await fetch(
        `${
          process.env.HASURA_URL as string
        }/api/rest/get_repo_contributors_countries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": process.env.HASURA_SECRET as string,
          },
          body: JSON.stringify({
            full_name: `${input.owner}/${input.repo}`,
          }),
        }
      );

      // in case of repo is not found, this endpoint will return
      //     {
      //     "github_repos_contributors_countries": []
      //     }

      return response.json();
    },
  });