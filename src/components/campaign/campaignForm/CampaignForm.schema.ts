import { z } from "zod";

export const formSchema = z.object({
	advertiser_id: z.string().min(1, {
		message: "Account name is required.",
	}),
	name: z.string().min(2, {
		message: "Campaign name must be at least 2 characters.",
	}),
	objective: z.string().min(2, {
		message: "Objective name must be at least 2 characters.",
	}),
	platforms: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: "You have to select at least one item.",
	}),
	bid: z.number({
		required_error: "Bid value is required.",
	}),
	budget: z.number({
		required_error: "Lifetime budget value is required.",
	}),
	tracking_link: z.string(),
	countries_iso: z
		.array(z.string())
		.min(1, { message: "At least one country is required." }),
	headline: z.string().min(2, {
		message: "Objective name must be at least 2 characters.",
	}),
	details: z.string().min(2, {
		message: "Objective name must be at least 2 characters.",
	}),
	call_to_action: z.string().min(2, {
		message: "Objective name must be at least 2 characters.",
	}),
	instructions: z.string().min(2, {
		message: "Objective name must be at least 2 characters.",
	}),
});
