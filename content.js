/*###################### make pop up and extract all the links ####################################*/

//############## popup menu for droping ###############
const dropbody = document.createElement("div");
dropbody.contains;
dropbody.style.position = "fixed";

dropbody.style.backgroundColor = "black";
dropbody.style.height = "125px";
dropbody.style.width = "125px";
dropbody.style.borderRadius = "10px";
dropbody.style.display = "none";
dropbody.style.justifyContent = "center";
dropbody.style.alignContent = "center";
dropbody.style.zIndex = "999";
//########## background and styling ############
const runtime =
  typeof browser === "undefined" ? chrome.runtime : browser.runtime;
const cloudopng = document.createElement("img");
cloudopng.src = runtime.getURL("/images/Space.png");
cloudopng.style.objectFit = "contain";
cloudopng.style.borderRadius = "12px";

dropbody.appendChild(cloudopng);
document.body.appendChild(dropbody);
//############## variable ####################3

let elememt = null;
let link = null;
let image = null;

const WinWidth = window.screen.width;

function LinknImg(elememt) {
  // #### parent =  <a> and element = <img>
  if (elememt.tagName === "IMG") {
    let parent = elememt.parentElement;
    if (parent.tagName === "A") {
      return {
        image: elememt.src,
        link: parent.href,
      };
    } else {
      let i = 0;
      let link = null;
      while (i < 8 && parent) {
        if (parent.querySelector("a")) {
          let foundtag = parent.querySelector("a");
          link = foundtag.href;
          break;
        }
        parent = parent.parentElement;
        i++;
      }

      return {
        image: elememt.src,
        link: link,
      };
    }
  } // #### parent -> child -> grandchild = <img> and element = <a>
  else {
    let searchedNode = elememt.querySelector("img");
    return {
      image: searchedNode.src,
      link: elememt.href,
    };
  }
}

function MousePos(xcor) {
  let requireWid = 4 * (WinWidth / 5);
  if (xcor > requireWid) {
    return xcor - 175;
  } else {
    return xcor + 50;
  }
}

document.addEventListener("dragstart", (e) => {
  let leftpos = MousePos(e.clientX);
  console.log(leftpos);
  dropbody.style.top = `${e.clientY - 50}px`;
  dropbody.style.left = `${leftpos}px`;
  dropbody.style.display = "flex";
  elememt = e.target;
  console.log("##############################");
  console.log(elememt);
  console.log("##############################");
});

document.addEventListener("dragend", (e) => {
  dropbody.style.display = "none";
});
document.addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.addEventListener("drop", (e) => {
  const data = LinknImg(elememt);
  const runtime =
    typeof browser === "undefined" ? chrome.runtime : browser.runtime;
  runtime.sendMessage({
    link: data.link,
    image: data.image,
  });
  console.log(
    "########################################### Message sent to your prfile ##############################"
  );
});

document.addEventListener("dragend", (e) => {
  dropbody.style.display = "none";
});
