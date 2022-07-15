export const deepClone: any = (obj: any) => {
	if (Array.isArray(obj)) {
		var arr = [];
		for (var i = 0; i < obj.length; i++) {
			arr[i] = deepClone(obj[i]);
		}
		return arr;
	}

	if (typeof(obj) === "object"){
		var cloned = {} as any;
		for(let key in obj){
			cloned[key] = deepClone(obj[key])
		}
		return cloned;	
	}
	return obj;
}

export const cutString = (str: string, length: number) => {
	if (str.length <= length) return str;
	return str.substring(0, length) + "...";
}

export const randomIndex = (max = 5) => {
	return Math.floor(Math.random() * max);
}

export const delay = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const onlyAlphaNumeric = (str: string) => {
	return str.replace(/[^a-zA-Z0-9]/g, "");
}