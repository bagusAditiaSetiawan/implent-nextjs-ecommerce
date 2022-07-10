export const convertLog = (log) => {
    const logs = {
        'WAITING_PAYMENT': 'Menunggu Pembayaran',
        'WAITING_APPROVE': 'Menunggu Proses',
        'ON_DELIVERY': 'Dalam Perjalanan',
        'DELIVERIED': 'Sampai Tujuan',
        'RECEIVED': 'Selesai',
    };
    return logs[log];
}