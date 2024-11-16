import { ActivityCalendar, ThemeInput } from "react-activity-calendar";
import "./style.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import React from "react";
import {
	format,
	eachDayOfInterval,
	startOfYear,
	endOfYear,
	eachMonthOfInterval,
	startOfMonth,
	endOfMonth,
} from "date-fns";

// Function to map the number of activities to corresponding levels
const mapActivityToLevel = (count: number): number => {
	if (count === 0) return 0; // No activity
	if (count <= 5) return 1; // Low activity
	if (count <= 10) return 2; // Moderate activity
	return 3; // High activity
};

const ActivityCalendarComponent = () => {
	const explicitTheme: ThemeInput = {
		light: [
			"#383838",
			"#109932", // darker light green
			"#28c244", // darker medium light green
			"#7fe18b", // darker standard green (moderate activity)
			"#d8ffda",
		],
		dark: [
			"#383838",
			"#109932", // darker light green
			"#28c244", // darker medium light green
			"#7fe18b", // darker standard green (moderate activity)
			"#d8ffda",
		],
	};

	// Example activity data
	const activityData = [
		{ date: "2023-01-01", count: 10 },
		{ date: "2023-06-01", count: 0 },
		{ date: "2023-05-14", count: 5 },
		{ date: "2023-05-18", count: 11 },
		{ date: "2023-05-29", count: 11 },
		{ date: "2023-05-20", count: 6 },
		{ date: "2023-05-23", count: 2 },
		{ date: "2023-05-25", count: 1 },
	];

	// Generate activity data for the whole year, filling in any missing dates with 0 activity
	const generateYearData = (year: number) => {
		const startDate = startOfYear(new Date(year, 0));
		const endDate = endOfYear(new Date(year, 0));
		const allDates = eachDayOfInterval({ start: startDate, end: endDate });

		return allDates.map((date) => {
			const formattedDate = format(date, "yyyy-MM-dd");
			const activity = activityData.find(
				(activity) => activity.date === formattedDate
			);
			const level = activity ? mapActivityToLevel(activity.count) : 0;

			return {
				date: formattedDate,
				count: activity ? activity.count : 0,
				level: level,
			};
		});
	};

	// Generate month intervals
	const generateMonthIntervals = (year: number) => {
		const startDate = startOfYear(new Date(year, 0));
		const endDate = endOfYear(new Date(year, 0));
		return eachMonthOfInterval({ start: startDate, end: endDate }).map(
			(monthStart) => {
				const monthEnd = endOfMonth(monthStart);
				return { start: monthStart, end: monthEnd };
			}
		);
	};

	const year = 2023;
	const yearData = generateYearData(year);
	const monthIntervals = generateMonthIntervals(year);

	return (
		<div className="activity-graph-container">
			<div className="month-container">
				{monthIntervals.map((month, index) => {
					const monthName = format(month.start, "MMMM yyyy");
					const monthData = yearData.filter(
						(data) =>
							new Date(data.date) >= month.start &&
							new Date(data.date) <= month.end
					);

					return (
						<div key={index} className="month-section">
							<div style={{ fontSize: "var(--font-size-small)" }}>
								{monthName.split(" ")[0].substring(0, 3)}
							</div>
							<ActivityCalendar
								blockMargin={4}
								blockRadius={2}
								blockSize={10}
								renderBlock={(block, activity) =>
									React.cloneElement(block, {
										"data-tooltip-id": "react-tooltip",
										"data-tooltip-html": `${activity.count} activities on ${activity.date}`,
									})
								}
								colorScheme="dark"
								data={monthData}
								fontSize={14}
								maxLevel={4}
								hideTotalCount={true}
								weekStart={0}
								hideColorLegend={true}
								theme={explicitTheme}
							/>
						</div>
					);
				})}
			</div>
			<ReactTooltip id="react-tooltip" />
		</div>
	);
};

export default ActivityCalendarComponent;
