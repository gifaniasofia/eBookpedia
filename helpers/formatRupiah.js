function formatRupiah(money){
	let number_string = String(money).replace(/[^,\d]/g, '')
	let split   		= number_string.split(',')
	let sisa     		= split[0].length % 3
	let rupiah     		= split[0].substr(0, sisa)
	let ribuan     		= split[0].substr(sisa).match(/\d{3}/gi)

	if(ribuan){
		let separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}
 
	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return `Rp. ${rupiah},00`;
}

module.exports = formatRupiah;