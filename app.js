/*
  TALOS app.js
  Core client-side logic layer for static Talos modules.
  Handles:
  - Navigation utilities
  - Local storage (demo persistence)
  - n8n webhook communication layer
  - Shared UI helpers
*/

// =========================
// CONFIG
// =========================

const TALOS_CONFIG = {
  // Replace with your deployed n8n webhook base URL
  N8N_BASE_URL: "https://YOUR-N8N-ENDPOINT/webhook",

  ENDPOINTS: {
    objective: "/talos-objective",
    memory: "/talos-memory",
    task: "/talos-task"
  }
};

// =========================
// N8N CLIENT
// =========================

async function talosRequest(endpoint, payload = {}) {
  try {
    const res = await fetch(TALOS_CONFIG.N8N_BASE_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    return await res.json();
  } catch (err) {
    console.error("TALOS request failed:", err);
    return { error: "Backend unreachable" };
  }
}

// =========================
// LOCAL STORAGE LAYER (fallback persistence)
// =========================

const Storage = {
  get(key, fallback = []) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// =========================
// MEMORY MODULE
// =========================

function saveMemoryEntry(title, content) {
  const memories = Storage.get("talos_memories");

  const entry = {
    id: Date.now(),
    title,
    content,
    timestamp: new Date().toISOString()
  };

  memories.unshift(entry);
  Storage.set("talos_memories", memories);

  return entry;
}

// =========================
// TASK MODULE
// =========================

function createTaskEntry(title, description, priority = "Low") {
  const tasks = Storage.get("talos_tasks");

  const task = {
    id: Date.now(),
    title,
    description,
    priority,
    status: "Pending",
    timestamp: new Date().toISOString()
  };

  tasks.unshift(task);
  Storage.set("talos_tasks", tasks);

  return task;
}

function updateTaskStatus(id, status) {
  const tasks = Storage.get("talos_tasks");

  const updated = tasks.map(t =>
    t.id === id ? { ...t, status } : t
  );

  Storage.set("talos_tasks", updated);
  return updated;
}

// =========================
// OBJECTIVE HANDLER (console integration)
// =========================

async function submitObjective(objective) {
  return await talosRequest(TALOS_CONFIG.ENDPOINTS.objective, {
    objective,
    timestamp: new Date().toISOString()
  });
}

// =========================
// UI HELPERS
// =========================

function setActiveNav() {
  const path = window.location.pathname.split("/").pop();

  document.querySelectorAll("nav a").forEach(a => {
    if (a.getAttribute("href") === path) {
      a.classList.add("text-white");
      a.classList.remove("text-zinc-400");
    }
  });
}

function logToConsole(message) {
  console.log(`[TALOS] ${message}`);
}

// =========================
// INIT
// =========================

window.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  logToConsole("System UI initialized");
});

// =========================
// EXPORT GLOBAL ACCESS (for inline HTML usage)
// =========================

window.Talos = {
  talosRequest,
  saveMemoryEntry,
  createTaskEntry,
  updateTaskStatus,
  submitObjective
};