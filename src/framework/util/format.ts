module framework.util{
	export enum formatType{
		Normal = 0, 	// 10000000
		Value = 1,  	// 10,000,000
		Short = 2,      // 1000万，1.02亿
		MaxLength = 3,  // 按最大显示长度调整单位
	}
	
	export class format{
		public static number(value: number, type: formatType = formatType.Normal, format: string = ""): string{
			var str = "";
			var unit = "";
			if(type == formatType.Normal){
				str = value.toString();
			} else if(type == formatType.Value){
				str = value.toLocaleString();
			} else if(type == formatType.Short){
				var val = value;
				var absVal = Math.abs(value);
				if(absVal > 100000000){
					unit = "亿";
					val = val / 100000000;
				} else if(absVal > 10000){
					unit = "万";
					val = val / 10000;
				}
				str = val.toFixed(2).toString() + unit;
				str = str.replace(".00", "");
			} else if(type == formatType.MaxLength){
				str = value.toString();
				var val = value;
				if(Math.abs(val) >= 1000000){
					val = val / 10000;
					str = val.toFixed(0).toString() + "万";
				}
			}
			if(util.type.isString(format) && format.length > 0){
				return format.replace('{0}', str);
			}
			return str;
		}
	}
}