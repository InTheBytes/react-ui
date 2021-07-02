function formatDate(date, excludeYear) {
    let dateObj = new Date(date);
    let arr = dateObj.toDateString().split(" ");
    let year = excludeYear ? "" : `, ${arr[3]}`
    return `${arr[1]}. ${arr[2] + year}`;
  };

function formatWindow(start, end) {
    return `${formatTime(start)} - ${formatTime(end)}`;
  };

function formatTime(time) {
    let timeObj = new Date(time);
    let str = timeObj.toLocaleTimeString();
    let arr = str.split(":");
    let ampm = arr.pop().split(" ");
    return `${arr.join(":")} ${ampm[1].toLowerCase()}`;
};

function formatStatus(status) {
    let desc = status.split(" ")[2].toLowerCase();
    let firstLetter = desc[0].toUpperCase();
    return `${firstLetter + desc.substring(1)}`;
};

export {formatDate, formatWindow, formatTime, formatStatus};