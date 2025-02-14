import { Check, X } from "lucide-react";
import * as React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import type { CountryType } from "../campaign/campaignForm/CampaignForm.type";

type CountryMultiSelectProps = {
	placeholder?: string;
	onChange?: (value: string[]) => void;
	value?: string[];
	countriesData?: CountryType[];
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
		registration?: Partial<UseFormRegisterReturn>;
	};

export function CountryMultiSelect({
	placeholder = "Search...",
	onChange,
	value = [],
	registration,
	countriesData = [],
	...props
}: CountryMultiSelectProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = React.useState<CountryType[]>(
		countriesData.filter((country) => value.includes(country.iso_code)),
	);
	const [inputValue, setInputValue] = React.useState("");

	// Use useCallback to memoize the handleChange function
	const handleChange = React.useCallback(
		(newSelected: CountryType[]) => {
			setSelected(newSelected);
			onChange?.(newSelected.map((country) => country.iso_code));
		},
		[onChange],
	);

	React.useEffect(() => {
		if (
			value !== undefined &&
			JSON.stringify(value) !== JSON.stringify(selected)
		) {
			setSelected(
				countriesData.filter((country) => value.includes(country.iso_code)),
			);
		}
	}, [value, countriesData]);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleUnselect = React.useCallback(
		(isoCode: string) => {
			handleChange(selected.filter((s) => s.iso_code !== isoCode));
		},
		[selected, handleChange],
	);

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (input) {
				if (e.key === "Delete" || e.key === "Backspace") {
					if (input.value === "" && selected.length > 0) {
						handleChange(selected.slice(0, -1));
					}
				}
				// This prevents the cursor from moving in the input when using the arrow keys
				if (e.key === "ArrowUp" || e.key === "ArrowDown") {
					e.preventDefault();
				}
			}
		},
		[selected, handleChange],
	);

	const selectables = React.useMemo(
		() =>
			countriesData.filter(
				(country) => !selected.some((s) => s.iso_code === country.iso_code),
			),
		[selected, countriesData],
	);

	return (
		<Command
			onKeyDown={handleKeyDown}
			className="overflow-visible bg-transparent"
			ref={containerRef}
		>
			<div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-1 focus-within:ring-ring">
				<div className="flex gap-1 flex-wrap">
					{selected.map((country) => {
						return (
							<Badge
								key={country.iso_code}
								variant="secondary"
								onClick={() => handleUnselect(country.iso_code)}
								className="cursor-pointer"
							>
								{country.name} (
								<span className="uppercase">{country.iso_code}</span>)
								<button
									type="button"
									className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleUnselect(country.iso_code);
										}
									}}
									onMouseDown={(e) => {
										e.preventDefault();
										e.stopPropagation();
									}}
								>
									<X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
								</button>
							</Badge>
						);
					})}
					<CommandInput
						ref={inputRef}
						value={inputValue}
						onValueChange={setInputValue}
						onFocus={() => setOpen(true)}
						placeholder={placeholder}
						className="bg-transparent outline-none placeholder:text-muted-foreground flex-1 w-full"
						{...props}
						{...registration}
					/>
				</div>
			</div>
			<div className="relative mt-2">
				{open && selectables.length > 0 ? (
					<div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup className="max-h-60 overflow-auto">
								{selectables.map((country) => {
									return (
										<CommandItem
											key={country.iso_code}
											onMouseDown={(e) => {
												e.preventDefault();
												e.stopPropagation();
											}}
											onSelect={(_value) => {
												setInputValue("");
												handleChange([...selected, country]);
												inputRef.current?.focus();
											}}
											className={"cursor-pointer"}
										>
											{country.name}{" "}
											<span className="uppercase">({country.iso_code})</span>
											<Check
												className={cn(
													"ml-auto h-4 w-4",
													selected.some((s) => s.iso_code === country.iso_code)
														? "opacity-100"
														: "opacity-0",
												)}
											/>
										</CommandItem>
									);
								})}
							</CommandGroup>
						</CommandList>
					</div>
				) : null}
			</div>
		</Command>
	);
}
