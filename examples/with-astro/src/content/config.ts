/* eslint import/prefer-default-export: off */
import { z, defineCollection } from "astro:content";

const placeCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    lon: z.number(),
    lat: z.number(),
  }),
});

export const collections = {
  place: placeCollection,
};
