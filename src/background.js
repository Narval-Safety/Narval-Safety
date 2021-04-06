chrome.storage.local.get('config',function (obj){
    if (! obj.config) {
        const config = {
            active: "true",
        }
        chrome.storage.local.set({"config": JSON.stringify(config)},function (){
            console.log("Storage Succesful");
        });
    } else {
        console.log("Config file exist")
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    chrome.storage.local.set({"rate": "charging", "popup" : false},function (){
        console.log("rate update")
        chrome.runtime.sendMessage({greeting: "refresh"});
    });
    chrome.runtime.onMessage.addListener(
        function (msg) {
            console.log("Debug 2 ->", msg.greeting, tabId)
            if (msg.greeting === "popup") {
                chrome.tabs.executeScript(tabId, { file: 
                './notification.js' }, function () {
                    chrome.tabs.executeScript(tabId, { file: 
                    './foreground.bundle.js' }, function () {
                        console.log('INJECTED AND EXECUTED');
                });
            })
        }
    });

    chrome.storage.local.get('config', (obj) => {
        const config = JSON.parse(obj.config)
        console.log(config.active)
        if (config.active) {
            if (changeInfo.status === 'complete' && tab.url.includes('http')) {
                chrome.tabs.executeScript(tabId, { file: 
                    './inject_script.js' }, function () {
                        chrome.tabs.executeScript(tabId, { file: 
                        './foreground.bundle.js' }, function () {
                            console.log('INJECTED AND EXECUTED');
                    });
                })
            }
        }
    });
});
