export function addCommas(number) {
    const formattedNumber = new Intl.NumberFormat().format(number);
    return formattedNumber;
}

export function formatNumber(number) {
    const formattedNumberK = number / 1000;
    if (formattedNumberK < 1) {
        // console.log("Smaller than 1K");
        // console.log(`RETURN: ${number}`);
        return number;
    }
    const formattedNumberM = number / 1000000;
    if (formattedNumberM < 1 && number < 10000) {
        // console.log("Smaller than 1M");
        // console.log(`RETURN: ${Math.round((number / 1000) * 10) / 10}K`);
        let shortNumber = `${Math.round((number / 1000) * 10) / 10}K`;
        return shortNumber;
    }
    if (formattedNumberM < 1) {
        // console.log(`RETURN: ${Math.round(number / 1000)}K`);
        let shortNumber = `${Math.round(number / 1000)}K`;
        return shortNumber;
    }

    const formattedNumberB = number / 1000000000;
    if (formattedNumberB < 1 && number < 10000000) {
        // console.log("Smaller than 1B");
        // console.log(`RETURN: ${Math.round((number / 1000000) * 10) / 10}M`);
        let shortNumber = `${Math.round((number / 1000000) * 10) / 10}M`;
        return shortNumber;
    }
    if (formattedNumberB < 1) {
        // console.log(`RETURN: ${Math.round(number / 1000000)}M`);
        let shortNumber = `${Math.round(number / 1000000)}M`;
        return shortNumber;
    }
    if (formattedNumberB > 1 && number < 10000000000) {
        // console.log("Larger than 1B");
        // console.log(`RETURN: ${Math.round((number / 1000000000) * 10) / 10}B`);
        let shortNumber = `${Math.round((number / 1000000000) * 10) / 10}B`;
        return shortNumber;
    } else {
        // console.log(`RETURN: ${Math.round(number / 1000000000)}B`);
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
