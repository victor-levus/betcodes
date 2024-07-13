import z from "zod";

export const betSchema = z.object({
  home_team: z.string().min(1, "Home Team is required").max(255),
  away_team: z.string().min(1, "Away Team is required").max(255),
  bet: z.string().min(1, "Bet Event is required").max(255),
  odd: z.coerce
    .number({
      required_error: "Odd is required",
      invalid_type_error: "That's not a number!",
    })
    .positive(),
  match_time: z.coerce.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  bet_status: z.enum(["SUCCESS", "IN_PROGRESS", "LOST"]),
  ht_home_score: z.custom(),
  ht_away_score: z.custom(),
  ft_home_score: z.custom(),
  ft_away_score: z.custom(),
});

export const postSchema = z.object({
  description: z.string().min(1, "Description is required").max(65532),
});
