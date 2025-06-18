var link;
const runtime =
  typeof browser === "undefined" ? chrome.runtime : browser.runtime;
runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  // const link = ({message.link,message.image});
  const response = fetch(``, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });
  return true;
});
