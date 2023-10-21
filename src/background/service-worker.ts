import { v4 } from "uuid";

// const { printerProvider: { onPrintRequested }, storage: { local }, notifications: { create }, tabCapture: { capture } } = chrome;

// const callback = (result: any[]) => console.log(result);
// setInterval(() =>
//     chrome.tabCapture.getCapturedTabs(callback)
//     , 1000);

// let i = 0;
// setInterval(() => {
//     create(v4(), {
//         iconUrl: "brain.png",
//         message: i.toString(),
//         type: "basic",
//         title: "RTS Extension Test SW",
//     });
//     i += 1;
// }, 1000);

// let audioTracks: Blob[] = [];

// chrome.tabCapture.capture({ video: true, audio: true }, (stream) => {
//     if (stream !== null) {
//         const audio = stream.getAudioTracks();
//         const media = new MediaRecorder(new MediaStream(audio));

//         media.ondataavailable = (e) => {
//             if (e.data.size > 0) {
//                 audioTracks.push(e.data)
//             }
//         };

//         media.onstop = () => {
//             const audioBlob = new Blob(audioTracks, { type: 'audio/wav' });
//             const url = URL.createObjectURL(audioBlob);
//             const filename = 'audio.wav';

//             chrome.downloads.download({
//                 url: url,
//                 filename: filename,
//                 saveAs: true
//             });
//             audioTracks = [];
//         }

//         media.start();

//         setTimeout(() => media.stop(), 10000);

//     }
// })

chrome.tabs.onActivated.addListener((x) => {
    chrome.tabs.get(x.tabId, (tab) => console.log(tab));
    // console.log(x)
});

chrome.printerProvider.onPrintRequested.addListener((printJob) => {
    chrome.notifications.create(v4(), {
        iconUrl: "brain.png",
        message: "PrintJob detected",
        type: "basic",
        title: "RTS Extension Test SW",
    });
    console.log(printJob);
})