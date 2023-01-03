const catalog = document.querySelector(".catalog__main");
const itemsCount = document.querySelector("#items-count");
const searchInput = document.querySelector(".catalog__search-input");
const prevButton = document.querySelector("#back");
const nextButton = document.querySelector("#next");
const rootButton = document.querySelector("#root");
const catalogAdressInput = document.querySelector(".catalog__adress-input");

let data = {
  folders: [
    {
      name: "Pictures",
      files: [{ name: "Sun", id: 4293 }],
      id: 0,
      folders: [],
    },
    {
      name: "Music",
      files: [],
      id: 1,
      folders: [
        {
          name: "Rap",
          files: [],
          id: 24,
          folders: [],
        },
        {
          name: "Rock",
          files: [{ name: "AC/DC", id: 421421 }],
          id: 22,
          folders: [],
        },
      ],
    },
  ],
  files: [
    {
      name: "Tasks",
      id: 42,
    },
    {
      name: "Book",
      id: 4332,
    },
    {
      name: "Recept",
      id: 533,
    },
  ],
};

let currentPath = "./";
let historyNextPath = "./";

function disablePanel() {
  let panel = document.querySelector(".panel");
  if(panel) panel.remove();
}

function constructPanel(name) {
  let element = document.createElement("span");
  element.textContent = `Create ${name}`;
  element.classList.add("panel__item");
  element.addEventListener("click", () => {
    const newFolder = document.createElement("div");
    newFolder.classList.add("catalog__element");
    newFolder.classList.add(`${name}`);
    newFolder.innerHTML = `<img class='catalog__element-icon' src='./img/${name}.png'/>
        <input class="catalog__element-name-input" type="text"/>
        `;
    catalog.append(newFolder);
    document
      .querySelector(`.catalog__element-name-input`)
      .addEventListener("blur", (e) => {
        if (name === "file") {
          repairAdress({ name: e.target.value, id: 53 }, name);
        } else if (name === "folder") {
          repairAdress(
            { name: e.target.value, files: [], folders: [], id: 103 },
            name
          );
        }
      });
    disablePanel();
  });
  return element;
}

function constructRepairPanel(name, rename = false, el) {
  let element = document.createElement("span");
  element.classList.add("panel__item");
  element.textContent = rename ? `Rename ${name}` : `Delete ${name}`;
  element.addEventListener("click", () => {
    if (!rename) {
      deleteFromData(el, name);
      repairAdress();
    } else {
      renameCatalogElement(el, name);
    }
  });
  return element;
}




if (data.folders) {
  repairAdress();
}

function displayCatalogElements(folders, files) {
  catalog.innerHTML = "";
  itemsCount.textContent = `${folders.length + files.length}`;
  folders.forEach((folder) => {
    let imgAdress;
    if (folder.folders.length!=0 || folder.files!=0) {
      imgAdress = "./img/filled_folder.png";
    } else {
      imgAdress = "./img/folder.png";
    }
    let element = constructCatalogElement(folder.name, imgAdress, "folder");
    element.addEventListener("click", (e) => {
      let currentFolder = changeData();
      currentFolder.folders.forEach((el) => {
        if (el.name === e.target.parentElement.innerText) {
          currentPath += `${e.target.parentElement.innerText}/`;
          repairAdress();
        }
      });
    });
    catalog.append(element);
  });
  files.forEach((file) => {
    let imgAdress = "./img/file.png";
    let element = constructCatalogElement(file.name, imgAdress, "file");
    catalog.append(element);
  });
}

searchInput.addEventListener("change", (e) => {
  if (e.target.value === "") displayCatalogElements(data.folders, data.files);
  else {
    let filesArr = searchElements(e.target.value, "files");
    let foldersArr = searchElements(e.target.value, "folders");
    displayCatalogElements(foldersArr, filesArr);
  }
});

function constructCatalogElement(title, image, type) {
  let element = document.createElement("div");
  element.classList.add(`catalog__element`);
  element.classList.add(`${type}`);
  let name = document.createElement("span");
  name.classList.add("catalog__element-name");
  name.textContent = title;
  let img = document.createElement("img");
  img.classList.add("catalog__element-image");
  img.src = image;
  element.append(img);
  element.append(name);
  return element;
}

function searchElements(searchText, type) {
  let newArr;
  if (type == "files") newArr = [...data.files];
  if (type == "folders") newArr = [...data.folders];
  newArr = newArr.filter((el) => {
    let fileName = el.name.toLowerCase();
    let searchRequest = searchText.toLowerCase();
    return fileName.includes(searchRequest);
  });
  return newArr;
}

function changeData(changes = 0, type = 0) {
  let currentFolder = { ...data };
  let path = currentPath.split("/");
  let globalData = { ...data };
  if (path.length === 2 && changes) {
    if (type === "folder") {
      globalData.folders = [...globalData.folders, changes];
    } else if (type === "file") {
      globalData.files = [...globalData.files, changes];
    }
    data = { ...globalData };
    return globalData;
  }
  path.forEach((el, i) => {
    if (el)
      currentFolder.folders.forEach((folder) => {
        if (folder.name === el) {
          currentFolder = folder;
          for (let key in globalData) {
            if (globalData[key].id === folder.id){
              globalData[key] = folder;
            }
            if (i === path.length - 2 && changes) {
              console.log(changes);
              if (type == "folder") {
                currentFolder.folders = [...currentFolder.folders, changes];
                globalData[key].folders = currentFolder.folders;
                break;
              }
              if (type == "file") {
                currentFolder.files = [...currentFolder.files, changes];
                globalData[key].files = currentFolder.files;
                break;
              }
            }
          }
        }
      });
  });

  data = { ...globalData };
  return currentFolder;
}

function repairAdress(changes = 0, type = 0) {
  catalogAdressInput.value = currentPath;
  let currentFolder = changeData(changes, type);
  displayCatalogElements(currentFolder.folders, currentFolder.files);
}

function deleteFromData(el, name) {
  let find;
  let currentData = { ...data };
  function rideObject(arr) {
    arr.forEach((el, number) => {
      if (el.name === name) {
        currentData["folders"].forEach((element, index) => {
          if (name === element.name) find = index;
        });
        currentData["folders"].splice(find, 1);
        console.log(currentData["folders"]);
        return;
      } else {
        for (let i in currentData) {
          if (i == "folders" && number === arr.length - 1) {
            currentData[i] = el.folders;
            rideObject(el.folders);
          }
        }
      }
    });
  }
  function rideFiles(arr) {
    arr.forEach((el, number) => {
      if (el.name === name) {
        currentData["files"].forEach((element, index) => {
          if (name === element.name) find = index;
        });
        currentData["files"].splice(find, 1);
        console.log(currentData["files"]);
        return;
      }
    });
  }
  historyNextPath = currentPath;
  if (el.classList.contains("file")) rideFiles(data.files);
  else rideObject(data.folders);
}

function renameCatalogElement(el, name) {
  disablePanel();
  const renameInput = document.createElement("input");
  renameInput.value = name;
  renameInput.classList.add("catalog__element-name-input");
  renameInput.addEventListener("blur", (e) => {
    let currentData = { ...data };
    function rideFolders(arr) {
      arr.forEach((el, number) => {
        if (el.name === name) {
          currentData["folders"].forEach((element) => {
            if (name === element.name) element.name = e.target.value;
          });
          console.log(currentData);
          return;
        } else {
          for (let i in currentData) {
            if (i == "folders" && number === arr.length - 1) {
              currentData[i] = el.folders;
              rideFolders(el.folders);
            }
          }
        }
      });
    }

    function rideFiles(arr) {
      console.log(arr);
      arr.forEach((el) => {
        if (el.name === name) {
          currentData["files"].forEach((element) => {
            if (name === element.name) element.name = e.target.value;
          });
          console.log(currentData);
          return;
        }
      });
    }

    if (el.classList.contains("folder")) rideFolders(data.folders);
    else rideFiles(data.files);
    renameInput.remove();
    el.lastChild.style.display = "block";
    repairAdress();
  });

  el.lastChild.style.display = "none";
  el.append(renameInput);
}

prevButton.addEventListener("click", () => {
  if (currentPath === "./") {
    historyNextPath = "./";
    return;
  }
  historyNextPath = currentPath;
  let copyPath = currentPath.split("/");
  currentPath = "";
  console.log(copyPath);
  let i = 0;
  while (i < copyPath.length - 2) {
    currentPath += copyPath[i];
    currentPath += "/";
    i++;
  }
  repairAdress();
});

nextButton.addEventListener("click", () => {
  currentPath = historyNextPath;
  repairAdress();
});

rootButton.addEventListener("click", () => {
  currentPath = "./";
  historyNextPath = "./";
  repairAdress();
});

catalogAdressInput.addEventListener("blur", (e)=>{
  if(e.target.value[e.target.value.length-1] != "/") e.target.value+="/";
  currentPath = e.target.value;
  repairAdress();
})

window.oncontextmenu = function (event) {
  disablePanel();
  let panel = document.createElement("div");
  panel.classList.add("panel");
  panel.style.position = "absolute";
  panel.style.left = `${event.x}px`;
  panel.style.top = `${event.y}px`;
  console.log(event.target);
  if (
    event.target.className === "catalog__element-name" ||
    event.target.className === "catalog__element-image"
  ) {
    let elementName;
    let parentElement;
    parentElement = event.target.parentNode;
    if (event.target.className === "catalog__element-name") {
      elementName = event.target.textContent;
    } else if (event.target.className === "catalog__element-image") {
      elementName = event.target.parentNode.children[1].textContent;
    }
    let renameTab = constructRepairPanel(elementName, true, parentElement);
    let deleteTab = constructRepairPanel(elementName, false, parentElement);
    panel.append(renameTab);
    panel.append(deleteTab);
  } else {
    let fileTab = constructPanel("file");
    let folderTab = constructPanel("folder");
    panel.append(fileTab);
    panel.append(folderTab);
  }
  catalog.append(panel);
  return false;
};
