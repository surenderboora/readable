export function dynamicSort(property, order) {
    var sortOrder = 1;
    if(order === "desc") {
        sortOrder = -1;
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export function timestampToDate(timestamp) {
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
						'August', 'September', 'October', 'November', 'December'];
	const shortMonthNames = monthNames.map((name) => name.substr(0,3));
	const d = new Date(timestamp);
	return  shortMonthNames[d.getMonth()] + ' '+ d.getDate() + ', ' + d.getFullYear()
}

export function getUniqueId() {
  let id = '';
  for (let i = 0; i < 20; i++) {
    let index = parseInt(Math.random() * 1000000) % 36;
    id += 'abcdefghijklmnopqrstuvwxyz0123456789'[index]
  }
  return id
}