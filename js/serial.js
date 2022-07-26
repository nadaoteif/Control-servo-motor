let isConnect = false;
let port;
let writer;
const enc = new TextEncoder();

async function arduino() {
    if (!isConnect) {
        alert(" يرجى القيام بتوصيل الجهاز! ");
        return;
    }
    try {
        const encoder = new TextEncoder();
        await writer.write(encoder.encode(transcript));
    } 
    catch (e) {
        console.log(e);
    }
}
async function onConnect() {
    try {
        const items = [ { usbVendorId: 0x2341, usbProductId: 0x0043 },
            { usbVendorId: 0x2341, usbProductId: 0x0001 }];
        const port = await navigator.serial.requestPort({ items });
        await port.open({ baudRate: 115200 });
        writer = port.writable.getWriter();
        isConnect = true;
    } 
    catch (e) {
        console.log("err", e);
    }
}
