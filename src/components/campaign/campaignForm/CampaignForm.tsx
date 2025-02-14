import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "./CampaignForm.schema";
import { TypographyH2 } from "@/components/ui/typography";
import { CountryMultiSelect } from "@/components/ui/country-multiselect";

import type {
	AccountType,
	ObjectiveType,
	CountryType,
	PlatformType,
} from "./CampaignForm.type";
import { CircleHelp } from "lucide-react";

type CampaignFormProptypes = {
	form: UseFormReturn<z.infer<typeof formSchema>>;
	onSubmit: (values: z.infer<typeof formSchema>) => void;
	accountData?: AccountType[];
	objectiveData?: ObjectiveType[];
	countriesData?: CountryType[];
	platformData?: PlatformType[];
};

function CampaignForm({
	form,
	onSubmit,
	accountData = [],
	objectiveData = [],
	countriesData,
	platformData = [],
}: CampaignFormProptypes) {
	return (
		<div className="w-full md:w-[800px] px-2 py-4">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-6"
				>
					<TypographyH2>Create Campaign</TypographyH2>
					<FormField
						control={form.control}
						name="advertiser_id"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">Account</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a Account" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{accountData.map((item) => {
												return (
													<SelectItem key={item.value} value={item.value}>
														{item.label}
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Campaign Name
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<Input placeholder="Campaign Name" {...field} />
									</FormControl>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="objective"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Objective
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Choose an Objective" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{objectiveData.map((item) => {
												return (
													<SelectItem key={item.value} value={item.value}>
														{item.label}
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="platforms"
						render={() => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">Platform</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<div className="flex items-center space-x-8 px-1">
										{platformData.map((item) => (
											<FormField
												key={item.value}
												control={form.control}
												name="platforms"
												render={({ field }) => {
													return (
														<FormItem
															key={item.value}
															className="flex flex-row items-start space-x-1 space-y-0"
														>
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(item.value)}
																	onCheckedChange={(checked) => {
																		return checked
																			? field.onChange([
																					...field.value,
																					item.value,
																				])
																			: field.onChange(
																					field.value?.filter(
																						(value) => value !== item.value,
																					),
																				);
																	}}
																/>
															</FormControl>
															<FormLabel className="text-sm font-normal">
																{item.label}
															</FormLabel>
														</FormItem>
													);
												}}
											/>
										))}
									</div>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="bid"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">Bid</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<div className="flex gap-2 overflow-hidden">
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="[&_svg]:size-9"
										>
											<CircleHelp className="stroke-1" />
										</Button>
										<FormControl>
											<NumberInput
												placeholder="$0.00"
												thousandSeparator=","
												prefix="$"
												decimalScale={2}
												onValueChange={(values) => {
													field.onChange(values);
												}}
												{...field}
											/>
										</FormControl>
									</div>

									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="budget"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Lifetime Budget
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<div className="flex gap-2 overflow-hidden">
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="[&_svg]:size-9"
										>
											<CircleHelp className="stroke-1" />
										</Button>
										<FormControl>
											<NumberInput
												placeholder="$0.00"
												thousandSeparator=","
												prefix="$"
												decimalScale={2}
												onValueChange={(values) => {
													field.onChange(values);
												}}
												{...field}
											/>
										</FormControl>
									</div>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>

					<TypographyH2>Tracking and Targeting</TypographyH2>
					<FormField
						control={form.control}
						name="tracking_link"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Tracking Link
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<Textarea
											placeholder="Tracking Link"
											className="resize-none"
											rows={6}
											readOnly
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="countries_iso"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Countries
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<CountryMultiSelect
											placeholder="Countries"
											{...field}
											countriesData={countriesData}
										/>
									</FormControl>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="headline"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">Headline</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<Input placeholder="Headline" {...field} />
									</FormControl>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="details"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">Details</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<Textarea
											placeholder="Details"
											className="resize-none"
											rows={4}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="call_to_action"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Call to Action
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<Input placeholder="Call to Action" {...field} />
									</FormControl>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="instructions"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Instructions
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<Textarea
											placeholder="Instructions"
											className="resize-none"
											rows={9}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<Button type="submit" size="lg" className="text-lg">
						Save Changes
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default CampaignForm;
