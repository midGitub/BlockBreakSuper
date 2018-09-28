module csprotos {

	function stringToByte(str) {
		var bytes = new Array();
		if (str == null) {
			return bytes;
		}
		var len, c;
		len = str.length;
		for (var i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if (c >= 0x010000 && c <= 0x10FFFF) {
				bytes.push(((c >> 18) & 0x07) | 0xF0);
				bytes.push(((c >> 12) & 0x3F) | 0x80);
				bytes.push(((c >> 6) & 0x3F) | 0x80);
				bytes.push((c & 0x3F) | 0x80);
			} else if (c >= 0x000800 && c <= 0x00FFFF) {
				bytes.push(((c >> 12) & 0x0F) | 0xE0);
				bytes.push(((c >> 6) & 0x3F) | 0x80);
				bytes.push((c & 0x3F) | 0x80);
			} else if (c >= 0x000080 && c <= 0x0007FF) {
				bytes.push(((c >> 6) & 0x1F) | 0xC0);
				bytes.push((c & 0x3F) | 0x80);
			} else {
				bytes.push(c & 0xFF);
			}
		}
		return bytes;
	}

	function utf8ArrayToStr(array) {
		var out, i, len, c;
		var char2, char3;

		out = "";
		len = array.length;
		i = 0;
		while (i < len) {
			c = array[i++];
			switch (c >> 4) {
				case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
					// 0xxxxxxx
					out += String.fromCharCode(c);
					break;
				case 12: case 13:
					// 110x xxxx   10xx xxxx
					char2 = array[i++];
					out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
					break;
				case 14:
					// 1110 xxxx  10xx xxxx  10xx xxxx
					char2 = array[i++];
					char3 = array[i++];
					out += String.fromCharCode(((c & 0x0F) << 12) |
						((char2 & 0x3F) << 6) |
						((char3 & 0x3F) << 0));
					break;
			}
		}

		return out;
	}

	function byteToString(arr) {
		if (typeof arr === 'string') {
			return arr;
		}
		var str = '',
			_arr = arr;
		for (var i = 0; i < _arr.length; i++) {
			var one = _arr[i].toString(2),
				v = one.match(/^1+?(?=0)/);
			if (v && one.length == 8) {
				var bytesLength = v[0].length;
				var store = _arr[i].toString(2).slice(7 - bytesLength);
				for (var st = 1; st < bytesLength; st++) {
					store += _arr[st + i].toString(2).slice(2);
				}
				str += String.fromCharCode(parseInt(store, 2));
				i += bytesLength - 1;
			} else {
				str += String.fromCharCode(_arr[i]);
			}
		}
		return str;
	}

	export class LongBits {
		public lo: number = 0;
		public hi: number = 0;

		constructor(lo, hi) {
			this.lo = lo >>> 0;
			this.hi = hi >>> 0;
		}


		public static fromNumber(value) {
			if (value === 0)
				return new LongBits(0, 0);
			var sign = value < 0;
			if (sign)
				value = -value;
			var lo = value >>> 0,
				hi = (value - lo) / 4294967296 >>> 0;
			if (sign) {
				hi = ~hi >>> 0;
				lo = ~lo >>> 0;
				if (++lo > 4294967295) {
					lo = 0;
					if (++hi > 4294967295)
						hi = 0;
				}
			}
			return new LongBits(lo, hi);
		};

		public toNumber(unsigned) {
			if (!unsigned && this.hi >>> 31) {
				var lo = ~this.lo + 1 >>> 0,
					hi = ~this.hi >>> 0;
				if (!lo)
					hi = hi + 1 >>> 0;
				return -(lo + hi * 4294967296);
			}
			return this.lo + this.hi * 4294967296;
		};
	}

	export class EncodeBuffer {
		private _buffer: ArrayBuffer = null;
		private _offset: number = 0;
		private _length: number = 0;
		private _dataView: DataView = null;

		public constructor(buffer: ArrayBuffer, offset: number) {
			this._buffer = buffer;
			this._offset = offset;
			this._dataView = new DataView(this._buffer);
		}

		public buffer(): ArrayBuffer {
			return this._buffer;
		}

		public offset(): number {
			return this._offset + this._length;
		}

		public length(): number {
			return this._length;
		}

		public skip(length: number) {
			this._length += length;
		}

		private _write(type: any, val: number) {
			if (type == Float32Array) {
				this._dataView.setFloat32(this.offset(), val);
			} else if (type == Float64Array) {
				var longBits = LongBits.fromNumber(val);
				this._dataView.setInt32(this.offset(), longBits.hi);
				this._length += Int32Array.BYTES_PER_ELEMENT;
				this._dataView.setUint32(this.offset(), longBits.lo);
				this._length += Uint32Array.BYTES_PER_ELEMENT;
				return;
			} else if (type == Int8Array) {
				this._dataView.setInt8(this.offset(), val);
			} else if (type == Int16Array) {
				this._dataView.setInt16(this.offset(), val);
			} else if (type == Int32Array) {
				this._dataView.setInt32(this.offset(), val);
			} else if (type == Uint8Array) {
				this._dataView.setUint8(this.offset(), val);
			} else if (type == Uint16Array) {
				this._dataView.setUint16(this.offset(), val);
			} else if (type == Uint32Array) {
				this._dataView.setUint32(this.offset(), val);
			}
			this._length += type.BYTES_PER_ELEMENT;
		}

		public write(type: any, value: any) {
			if (Array.isArray(value)) {
				for (var i = 0; i < value.length; i++) {
					this._write(type, value[i]);
				}
				return;
			}
			this._write(type, value);
		}

		public writeString(value: string, maxLength: number) {
			var data = stringToByte(value);
			var size = data.length > maxLength - 1 ? maxLength - 1 : data.length;
			data.length = size;
			data.push(0);
			this.write(Uint16Array, size + 1);
			this.write(Uint8Array, data);
		}
	}

	export class DecodeBuffer {
		private _buffer: ArrayBuffer = null;
		private _offset: number = 0;
		private _length: number = 0;
		private _dataView: DataView = null;

		public constructor(buffer: ArrayBuffer, offset: number) {
			this._buffer = buffer;
			this._offset = offset;
			this._dataView = new DataView(this._buffer);
		}

		public buffer(): ArrayBuffer {
			return this._buffer;
		}

		public offset(): number {
			return this._offset + this._length;
		}

		public length(): number {
			return this._length;
		}

		public skip(length: number) {
			this._length += length;
		}

		private _read(type: any) {
			var num = 0;
			if (type == Float32Array) {
				num = this._dataView.getFloat32(this.offset());
			} else if (type == Float64Array) {
				var h = this._dataView.getInt32(this.offset());
				this._length += Int32Array.BYTES_PER_ELEMENT;
				var l = this._dataView.getUint32(this.offset());
				this._length += Uint32Array.BYTES_PER_ELEMENT;
				var longBits = new LongBits(l, h);
				return longBits.toNumber(true);
			} else if (type == Int8Array) {
				num = this._dataView.getInt8(this.offset());
			} else if (type == Int16Array) {
				num = this._dataView.getInt16(this.offset());
			} else if (type == Int32Array) {
				num = this._dataView.getInt32(this.offset());
			} else if (type == Uint8Array) {
				num = this._dataView.getUint8(this.offset());
			} else if (type == Uint16Array) {
				num = this._dataView.getUint16(this.offset());
			} else if (type == Uint32Array) {
				num = this._dataView.getUint32(this.offset());
			}
			this._length += type.BYTES_PER_ELEMENT;
			return num;
		}

		public read(type: any, length: number = 1): any {
			if (length > 1) {
				var val = new Array<number>(length);
				for (var i = 0; i < length; i++) {
					val[i] = this._read(type);
				}
				return val;
			}
			return this._read(type);
		}

		public readString(maxLength: number): string {
			var length = this.read(Uint16Array, 1);
			if (length >= 1) {
				var bytes = this.read(Uint8Array, length);
				// 去除字符串后的\0
				//bytes.length = bytes.length - 1;
				return utf8ArrayToStr(bytes);
			}
			return "";
		}
	}

	export interface message {
		messageName(): string;
		messageValue(): number;
		encode(buffer: ArrayBuffer, offset: number): number;
		decode(buffer: ArrayBuffer, offset: number): number;
	}
}