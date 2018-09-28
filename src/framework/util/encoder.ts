module framework.util {

	// Base64 encoding table
	var b64 = new Array(64);
	// Base64 decoding table
	var s64 = new Array(123);
	// 65..90, 97..122, 48..57, 43, 47
	for (var i = 0; i < 64;) {
		s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
	}

	export class base64 {

		public static encode64(str): string{
			var array = framework.util.tools.stringToByte(str);
			return base64.encode(array, 0, array.length);
		}

		public static encode(buffer, start, end) {
			var string = []; // alt: new Array(Math.ceil((end - start) / 3) * 4);
			var i = 0, // output index
				j = 0, // goto index
				t;     // temporary
			while (start < end) {
				var b = buffer[start++];
				switch (j) {
					case 0:
						string[i++] = b64[b >> 2];
						t = (b & 3) << 4;
						j = 1;
						break;
					case 1:
						string[i++] = b64[t | b >> 4];
						t = (b & 15) << 2;
						j = 2;
						break;
					case 2:
						string[i++] = b64[t | b >> 6];
						string[i++] = b64[b & 63];
						j = 0;
						break;
				}
			}
			if (j) {
				string[i++] = b64[t];
				string[i] = 61;
				if (j === 1)
					string[i + 1] = 61;
			}
			return String.fromCharCode.apply(String, string);
		}

		public static decode64(str): string{
			var buff = new Uint8Array(str.length);
			var length = base64.decode(str, buff, 0);
			var array = new Array(length);
			for(var i = 0; i < length; i++){
				array[i] = buff[i];
			}
			return framework.util.tools.byteToString(array);
		}

		public static decode(string, buffer, offset) {
			var start = offset;
			var j = 0, // goto index
				t;     // temporary
			for (var i = 0; i < string.length;) {
				var c = string.charCodeAt(i++);
				if (c === 61 && j > 1)
					break;
				if ((c = s64[c]) === undefined)
					throw Error("invalid encoding");
				switch (j) {
					case 0:
						t = c;
						j = 1;
						break;
					case 1:
						buffer[offset++] = t << 2 | (c & 48) >> 4;
						t = c;
						j = 2;
						break;
					case 2:
						buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
						t = c;
						j = 3;
						break;
					case 3:
						buffer[offset++] = (t & 3) << 6 | c;
						j = 0;
						break;
				}
			}
			if (j === 1)
				throw Error("invalid encoding");
			return offset - start;
		}
	}

}