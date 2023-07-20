export function addCommas(number) {
    const formattedNumber = new Intl.NumberFormat().format(number);
    return formattedNumber;
}

export function formatNumber(number) {
    const formattedNumberK = number / 1000;
    if (formattedNumberK < 1) {
        return number;
    }
    const formattedNumberM = number / 1000000;
    if (formattedNumberM < 1 && number < 10000) {
        let shortNumber = `${Math.round((number / 1000) * 10) / 10}K`;
        return shortNumber;
    }
    if (formattedNumberM < 1) {
        let shortNumber = `${Math.round(number / 1000)}K`;
        return shortNumber;
    }

    const formattedNumberB = number / 1000000000;
    if (formattedNumberB < 1 && number < 10000000) {
        let shortNumber = `${Math.round((number / 1000000) * 10) / 10}M`;
        return shortNumber;
    }
    if (formattedNumberB < 1) {
        let shortNumber = `${Math.round(number / 1000000)}M`;
        return shortNumber;
    }
    if (formattedNumberB > 1 && number < 10000000000) {
        let shortNumber = `${Math.round((number / 1000000000) * 10) / 10}B`;
        return shortNumber;
    } else {
        let shortNumber = `${Math.round(number / 1000000000)}B`;
        return shortNumber;
    }
}

export function calculateTimeDifference(date) {
    const currentDate = new Date();
    const givenDate = new Date(date);
    const timeDifference = currentDate - givenDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return `${years} year${years !== 1 ? "s" : ""} ago`;
    } else if (months > 0) {
        return `${months} month${months !== 1 ? "s" : ""} ago`;
    } else if (weeks > 0) {
        return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
    } else if (days > 0) {
        return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else {
        return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
}

export function formatDuration(duration) {
    const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!matches) {
        return "Invalid duration format";
    }

    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
    const seconds = matches[3] ? parseInt(matches[3], 10) : 0;

    let formattedDuration = "";

    if (hours > 0) {
        formattedDuration += `${hours}:`;
    }

    formattedDuration += minutes.toString().padStart(2, "0");
    formattedDuration += `:${seconds.toString().padStart(2, "0")}`;

    return formattedDuration;
}

export function formatDescription(inputString) {
    // Handle single asterisks on different lines (separated by \n or <br/>)
    let boldText = inputString.replace(
        /(?:\n|<br\/>)(\*[^<\n*]+\*)/g,
        (match) => {
            return match.replace(/\*/g, "");
        }
    );

    // Replace single asterisks (*) with <strong> tags only if they are on the same line and not part of a pair
    boldText = boldText.replace(
        /(?<!\*)\*{1}(?!\*)([^*\n]+?)\*{1}(?!\*)/g,
        "<strong>$1</strong>"
    );

    // Replace links starting with 'http' and stopping at space or <br/> with <a> tags
    boldText = boldText.replace(
        /(http[s]?:\/\/[^\s<]+)/g,
        '<a href="$1">$1</a>'
    );

    // Replace \n with <br/>
    boldText = boldText.replace(/\n/g, "<br/>");

    // Wrap the boldText in <p> tags
    const finalHtml = `<p>${boldText}</p>`;

    return finalHtml;
}

export function formatDate(inputDate) {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const date = new Date(inputDate);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
}
