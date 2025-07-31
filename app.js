const SECTIONS_CONFIG = {
  Zombies: {
    icon: "🧟",
    color: "green",
    borderColors: { default: "border-green-400", special: "border-orange-400" },
  },
  Items: {
    icon: "🎒",
    color: "green",
    borderColors: {
      default: "border-green-400",
      explosive: "border-orange-400",
    },
  },
  Weapons: {
    icon: "🔫",
    color: "green",
    borderColors: {
      default: "border-green-300",
      heavy: "border-orange-400",
      melee: "border-red-400",
    },
  },
  Upgrades: {
    icon: "⚡",
    color: "green",
    borderColors: { default: "border-purple-400" },
  },
  Cheats: {
    icon: "🎮",
    color: "green",
    borderColors: { default: "border-red-500" },
  },
  Maps: {
    icon: "🗺️",
    color: "green",
    borderColors: { default: "border-blue-400" },
  },
};

const createElement = (tag, classes = "", content = "") => {
  const element = document.createElement(tag);
  if (classes) element.className = classes;
  if (content) element.innerHTML = content;
  return element;
};

const createCommandElement = (command) => {
  const codeElement = createElement(
    "code",
    "bg-green-100 text-green-800 px-3 py-1 rounded-lg cursor-pointer font-mono text-sm border border-green-200 hover:bg-green-200 transition-colors",
    command
  );
  codeElement.title = "Clic para copiar al portapapeles";
  codeElement.addEventListener("click", () =>
    copyToClipboard(codeElement, command)
  );
  return codeElement;
};

const copyToClipboard = (element, text) => {
  navigator.clipboard.writeText(text).then(() => {
    const original = element.style.backgroundColor;
    element.style.backgroundColor = "#86efac";
    element.textContent = "¡Copiado!";
    setTimeout(() => {
      element.style.backgroundColor = original;
      element.textContent = text;
    }, 1000);
  });
};

const createCard = (
  name,
  command,
  borderColor = "border-green-400",
  note = null
) => {
  const card = createElement(
    "div",
    `bg-white p-6 rounded-lg border-l-4 ${borderColor} shadow-sm hover:shadow-md transition-shadow command-card`
  );
  const title = createElement(
    "h3",
    "text-lg font-semibold mb-2 text-gray-800",
    name
  );
  const codeElement = createCommandElement(command);
  card.appendChild(title);
  card.appendChild(codeElement);
  if (note) {
    codeElement.classList.add("block", "mb-3");
    const noteElement = createElement(
      "p",
      "text-sm text-gray-600 bg-green-50 px-3 py-2 rounded",
      note.includes("Cuidado") ? `⚠️ ${note}` : `💡 ${note}`
    );
    card.appendChild(noteElement);
  }
  return card;
};

const createSection = (sectionName, data, customHandler = null) => {
  const config = SECTIONS_CONFIG[sectionName];
  const section = createElement("section", "mb-12");
  section.id = sectionName.toLowerCase();
  const header = createElement(
    "h2",
    "text-2xl font-bold mb-6 text-green-700 flex items-center",
    `<span class="text-3xl mr-3">${config.icon}</span> ${sectionName}`
  );
  section.appendChild(header);
  if (customHandler) {
    section.appendChild(customHandler(data, config));
  } else {
    const grid = createElement(
      "div",
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    );
    Object.entries(data).forEach(([name, command]) => {
      const borderColor = getBorderColor(sectionName, name);
      const card =
        typeof command === "object"
          ? createCard(name, command.Comando, borderColor, command.Nota)
          : createCard(name, command, borderColor);
      grid.appendChild(card);
    });
    section.appendChild(grid);
  }
  return section;
};

const getBorderColor = (sectionName, itemName) => {
  const config = SECTIONS_CONFIG[sectionName];
  if (
    sectionName === "Items" &&
    ["Bomba Casera", "Molotov", "Bilis de Boomer"].includes(itemName)
  ) {
    return config.borderColors.explosive;
  }
  if (sectionName === "Upgrades") return config.borderColors.default;
  if (sectionName === "Cheats") return config.borderColors.default;
  return config.borderColors.default;
};

const weaponsHandler = (data, config) => {
  const container = createElement("div");
  const firearmsDiv = createElement("div", "mb-8");
  firearmsDiv.appendChild(
    createElement(
      "h3",
      "text-xl font-bold mb-4 text-green-700",
      "Armas de Fuego"
    )
  );
  const firearms = data["Armas de Fuego"];
  Object.entries(firearms).forEach(([category, weapons]) => {
    if (category === "Armas Pesadas") return;
    const subsection = createElement("div", "mb-6");
    subsection.appendChild(
      createElement("h4", "text-lg font-semibold mb-3 text-green-700", category)
    );
    const gridClass =
      category === "Escopetas"
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        : category === "Rifles"
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2";
    const grid = createElement("div", `grid ${gridClass} gap-4`);
    Object.entries(weapons).forEach(([name, command]) => {
      const card = createElement(
        "div",
        "bg-white p-4 rounded-lg border-l-4 border-green-300 shadow-sm command-card"
      );
      card.appendChild(
        createElement("h5", "font-medium mb-2 text-gray-800", name)
      );
      const codeEl = createCommandElement(command);
      if (command.length > 15) codeEl.classList.add("text-xs");
      card.appendChild(codeEl);
      grid.appendChild(card);
    });
    subsection.appendChild(grid);
    firearmsDiv.appendChild(subsection);
  });
  const heavyDiv = createElement("div", "mb-6");
  heavyDiv.appendChild(
    createElement(
      "h4",
      "text-lg font-semibold mb-3 text-green-700",
      "Armas Pesadas"
    )
  );
  const heavyGrid = createElement(
    "div",
    "grid grid-cols-1 md:grid-cols-2 gap-4"
  );
  Object.entries(firearms["Armas Pesadas"]).forEach(([name, command]) => {
    const card = createElement(
      "div",
      "bg-white p-4 rounded-lg border-l-4 border-orange-400 shadow-sm command-card"
    );
    card.appendChild(
      createElement("h5", "font-medium mb-2 text-gray-800", name)
    );
    const codeEl = createCommandElement(command);
    if (command.length > 15) codeEl.classList.add("text-xs");
    card.appendChild(codeEl);
    heavyGrid.appendChild(card);
  });
  heavyDiv.appendChild(heavyGrid);
  firearmsDiv.appendChild(heavyDiv);
  const meleeDiv = createElement("div");
  meleeDiv.appendChild(
    createElement(
      "h3",
      "text-xl font-bold mb-4 text-green-700",
      "Armas Cuerpo a Cuerpo"
    )
  );
  const meleeGrid = createElement(
    "div",
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  );
  Object.entries(data["Armas Cuerpo a Cuerpo"]).forEach(([name, command]) => {
    const card = createElement(
      "div",
      "bg-white p-4 rounded-lg border-l-4 border-red-400 shadow-sm command-card"
    );
    card.appendChild(
      createElement("h5", "font-medium mb-2 text-gray-800", name)
    );
    const codeEl = createCommandElement(command);
    codeEl.classList.add("text-xs");
    card.appendChild(codeEl);
    meleeGrid.appendChild(card);
  });
  meleeDiv.appendChild(meleeGrid);
  container.appendChild(firearmsDiv);
  container.appendChild(meleeDiv);
  return container;
};

const mapsHandler = (data) => {
  const grid = createElement("div", "grid grid-cols-1 lg:grid-cols-2 gap-8");
  Object.entries(data).forEach(([campaignName, maps]) => {
    const card = createElement(
      "div",
      "bg-white p-6 rounded-lg border-l-4 border-blue-400 shadow-sm hover:shadow-md transition-shadow"
    );
    card.appendChild(
      createElement(
        "h3",
        "text-lg font-semibold mb-4 text-gray-800",
        campaignName
      )
    );
    const mapsList = createElement("div", "space-y-2");
    maps.forEach((mapCode) => {
      const mapDiv = createElement("div");
      // Añadir el comando "map " antes del código del mapa
      const fullCommand = `map ${mapCode}`;
      const codeEl = createCommandElement(fullCommand);
      codeEl.classList.add("text-sm");
      mapDiv.appendChild(codeEl);
      mapsList.appendChild(mapDiv);
    });
    card.appendChild(mapsList);
    grid.appendChild(card);
  });
  return grid;
};

const generateNavigation = (data) => {
  const navLinks = document.getElementById("nav-links");
  navLinks.innerHTML = "";
  Object.keys(data).forEach((sectionName) => {
    const config = SECTIONS_CONFIG[sectionName];
    if (!config) return;
    const link = createElement(
      "a",
      "px-4 py-2 bg-white text-green-700 hover:bg-green-50 rounded-lg transition-colors border border-green-200 font-medium nav-link",
      `${config.icon} ${sectionName}`
    );
    link.href = `#${sectionName.toLowerCase()}`;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById(sectionName.toLowerCase())
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    navLinks.appendChild(link);
  });
};

const loadData = async () => {
  try {
    const response = await fetch("Data.json");
    const data = await response.json();
    generateNavigation(data);
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = "";
    mainContent.appendChild(createSection("Zombies", data.Zombies));
    mainContent.appendChild(createSection("Items", data.Items));
    mainContent.appendChild(
      createSection("Weapons", data.Weapons, weaponsHandler)
    );
    const upgradesSection = createSection("Upgrades", data.Upgrades);
    upgradesSection.querySelector(".grid").className =
      "grid grid-cols-1 md:grid-cols-3 gap-6";
    upgradesSection.querySelectorAll("code").forEach((code) => {
      if (code.textContent.length > 20) code.classList.add("text-xs");
    });
    mainContent.appendChild(upgradesSection);

    // Añadir sección de Cheats
    mainContent.appendChild(createSection("Cheats", data.Cheats));

    mainContent.appendChild(createSection("Maps", data.Maps, mapsHandler));
    const refSection = createElement(
      "section",
      "mb-12 bg-green-50 p-6 rounded-lg border border-green-200"
    );
    refSection.appendChild(
      createElement(
        "h2",
        "text-xl font-bold mb-4 text-green-700",
        "📚 Referencias"
      )
    );
    refSection.appendChild(
      createElement(
        "p",
        "text-gray-600 mb-2",
        "Información adicional sobre mapas:"
      )
    );
    const link = createElement(
      "a",
      "text-green-600 hover:text-green-800 underline transition-colors",
      "What are the map names so I can change a map by name? - Reddit"
    );
    link.href =
      "https://www.reddit.com/r/l4d2/comments/16towbu/what_are_the_map_names_so_i_can_change_a_map_by/";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    refSection.appendChild(link);
    mainContent.appendChild(refSection);
    document.getElementById("loading").style.display = "none";
    mainContent.style.display = "block";
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    document.getElementById("loading").innerHTML =
      '<div class="text-xl text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">❌ Error al cargar los comandos. Verifica que el archivo Data.json existe.</div>';
  }
};

document.addEventListener("DOMContentLoaded", loadData);
