var monthArray = (current) => {

	let thisMonth = [],
			week = [],
			first = new Date(current.getFullYear(), current.getMonth(), 1).getDay(),
			lastMonLastDay = new Date(current.getFullYear(), current.getMonth(), 0).getDate(),
			thisMonLastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate(),
			firstCalDay = lastMonLastDay - (first - 1),
			day = firstCalDay;

	while (thisMonth.length < 6) {
		week = [];
	  if(thisMonth.length === 0) {
	    while(day <= lastMonLastDay) {
	      week.push(day);
	      day++;
	    }
	    day = 1;
	    while(week.length < 7) {
	      week.push(day);
	      day++;
	    }
	  }
	  else {
	    while(week.length < 7) {
	      if(day > thisMonLastDay)
	        day = 1;
	      week.push(day);	
	      day++;
	    }
	  }
	  thisMonth.push(week);
	}

	return thisMonth;
}

export default monthArray;