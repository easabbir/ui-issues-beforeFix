import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CampaignForm from "./CampaignForm";
import { formSchema } from "./CampaignForm.schema";
import { accountData, objectiveData, platformData } from "@/lib/data";
import { countries } from "@/lib/countries";

function CampaignFormContainer() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			objective: "",
			platforms: [],
			tracking_link: "",
			countries_iso: [],
			headline: "",
			details: "",
			call_to_action: "",
			instructions: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("values", values);
	}
	console.log("Form errors:", form.formState.errors);
	return (
		<div className="flex justify-center py-8">
			<CampaignForm
				form={form}
				onSubmit={onSubmit}
				accountData={accountData} //test
				objectiveData={objectiveData}
				countriesData={countries}
				platformData={platformData}
			/>
		</div>
	);
}

export default CampaignFormContainer;
