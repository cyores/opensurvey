export default function checkDates(openDate, closeDate) {
    if (!openDate && !closeDate)
        return { isOpen: true, dateText: "Open", dateColor: "green" };

    let now = new Date();
    let open = new Date(openDate);
    let close = new Date(closeDate);

    // pasted close date
    if (closeDate && close < now) return { isOpen: false, dateText: "Closed", dateColor: "#d30930" };;

    let nowMS = now.getTime();
    let openMS = open.getTime();
    let closeMS = close.getTime();

    // open in x days
    let daysToOpen = (openMS - nowMS) / (1000 * 3600 * 24);
    if (daysToOpen > 0) {
        return {
            isOpen: false,
            dateText: "Opens in  " + Math.ceil(daysToOpen) + " days",
            dateColor: "green"
        };
    }

    // close in x days (x < 7)
    let daysToClose = (closeMS - nowMS) / (1000 * 3600 * 24);
    if (daysToClose > 0 && daysToClose < 7) {
        return {
            isOpen: true,
            dateText: "Closes in " + Math.ceil(daysToClose) + " days",
            dateColor: "#d30930"
        };
    }

    // currently open and close in more than 7 days
    if (open <= now && close >= now)
        return { isOpen: true, dateText: "Open", dateColor: "green" };

    return { isOpen: false, dateText: "", dateColor: "#d30930" };
}
