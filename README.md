<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TALOS Operations Console</title>

  <script src="https://cdn.tailwindcss.com"></script>

  <style>
    body {
      background-color: black;
      overflow-x: hidden;
    }

    .scrollbar::-webkit-scrollbar {
      width: 6px;
    }

    .scrollbar::-webkit-scrollbar-thumb {
      background: #3f3f46;
      border-radius: 9999px;
    }
  </style>
</head>
<body class="bg-black text-zinc-200 font-mono min-h-screen p-6">

  <div class="max-w-7xl mx-auto space-y-6">

    <!-- HEADER -->
    <header class="border border-zinc-800 rounded-3xl p-6 bg-zinc-950 shadow-2xl">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>
          <h1 class="text-5xl font-bold tracking-[0.3em] text-zinc-100">
            TALOS
          </h1>

          <p class="text-zinc-500 mt-3 text-sm">
            Persistent Operational Intelligence System
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="border border-zinc-800 rounded-2xl p-4 bg-black text-center">
            <div class="text-xs text-zinc-500">STATUS</div>
            <div class="text-lg font-bold mt-1">ACTIVE</div>
          </div>

          <div class="border border-zinc-800 rounded-2xl p-4 bg-black text-center">
            <div class="text-xs text-zinc-500">TASKS</div>
            <div class="text-lg font-bold mt-1">04</div>
          </div>

          <div class="border border-zinc-800 rounded-2xl p-4 bg-black text-center">
            <div class="text-xs text-zinc-500">MEMORY</div>
            <div class="text-lg font-bold mt-1">SYNCED</div>
          </div>

          <div class="border border-zinc-800 rounded-2xl p-4 bg-black text-center">
            <div class="text-xs text-zinc-500">UPTIME</div>
            <div class="text-lg font-bold mt-1">99.9%</div>
          </div>
        </div>
      </div>
    </header>

    <!-- MAIN -->
    <main class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- LEFT SIDE -->
      <section class="lg:col-span-2 space-y-6">

        <!-- OBJECTIVE TERMINAL -->
        <div class="border border-zinc-800 rounded-3xl bg-zinc-950 p-6 shadow-xl">

          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold tracking-wide">
              OBJECTIVE TERMINAL
            </h2>

            <span class="text-xs text-zinc-500">
              HUMAN AUTHORIZATION REQUIRED
            </span>
          </div>

          <textarea
            id="objectiveInput"
            placeholder="Enter objective for Talos..."
            class="w-full h-48 bg-black border border-zinc-800 rounded-2xl p-4 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-700 resize-none"
          ></textarea>

          <div class="flex justify-end mt-4">
            <button
              onclick="sendObjective()"
              class="px-6 py-3 rounded-2xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition"
            >
              EXECUTE OBJECTIVE
            </button>
          </div>
        </div>

        <!-- RESPONSE PANEL -->
        <div class="border border-zinc-800 rounded-3xl bg-zinc-950 p-6 shadow-xl">

          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold tracking-wide">
              TALOS RESPONSE
            </h2>

            <span class="text-xs text-zinc-500">
              LIVE OUTPUT STREAM
            </span>
          </div>

          <div
            id="responseBox"
            class="bg-black border border-zinc-800 rounded-2xl p-4 min-h-[200px] text-zinc-300 whitespace-pre-wrap"
          >
Talos awaiting instructions.
          </div>
        </div>

        <!-- TASK QUEUE -->
        <div class="border border-zinc-800 rounded-3xl bg-zinc-950 p-6 shadow-xl">

          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold tracking-wide">
              ACTIVE TASK QUEUE
            </h2>

            <span class="text-xs text-zinc-500">
              LIVE WORKFLOW STATUS
            </span>
          </div>

          <div class="space-y-3">

            <div class="border border-zinc-800 rounded-2xl p-4 bg-black">
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-semibold">Weekly Operational Summary</div>
                  <div class="text-sm text-zinc-500 mt-1">Priority: Low</div>
                </div>

                <div class="text-sm px-3 py-1 rounded-xl border border-zinc-700 bg-zinc-900">
                  Completed
                </div>
              </div>
            </div>

            <div class="border border-zinc-800 rounded-2xl p-4 bg-black">
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-semibold">Repository Monitoring</div>
                  <div class="text-sm text-zinc-500 mt-1">Priority: Medium</div>
                </div>

                <div class="text-sm px-3 py-1 rounded-xl border border-zinc-700 bg-zinc-900">
                  Running
                </div>
              </div>
            </div>

            <div class="border border-zinc-800 rounded-2xl p-4 bg-black">
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-semibold">Notification Archive</div>
                  <div class="text-sm text-zinc-500 mt-1">Priority: Low</div>
                </div>

                <div class="text-sm px-3 py-1 rounded-xl border border-zinc-700 bg-zinc-900">
                  Queued
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- RIGHT SIDE -->
      <aside class="space-y-6">

        <!-- SYSTEM LOGS -->
        <div class="border border-zinc-800 rounded-3xl bg-zinc-950 p-6 shadow-xl">

          <h2 class="text-xl font-semibold tracking-wide mb-4">
            SYSTEM LOGS
          </h2>

          <div class="space-y-3 text-sm text-zinc-400 max-h-[400px] overflow-auto scrollbar">
            <div>[09:14] Talos initialized successfully.</div>
            <div>[09:15] Memory synchronization completed.</div>
            <div>[09:16] GitHub webhook connected.</div>
            <div>[09:17] Monitoring active workflows.</div>
            <div>[09:18] AI reasoning layer online.</div>
          </div>
        </div>

        <!-- DIRECTIVES -->
        <div class="border border-zinc-800 rounded-3xl bg-zinc-950 p-6 shadow-xl">

          <h2 class="text-xl font-semibold tracking-wide mb-4">
            TALOS DIRECTIVES
          </h2>

          <ul class="space-y-3 text-sm text-zinc-400 list-disc list-inside">
            <li>Maintain operational continuity.</li>
            <li>Reduce informational overload.</li>
            <li>Prioritize human-approved actions.</li>
            <li>Archive redundant notifications.</li>
            <li>Monitor workflow degradation.</li>
          </ul>
        </div>
      </aside>
    </main>

    <!-- FOOTER -->
    <footer class="text-center text-xs text-zinc-600 pt-2">
      TALOS v0.1 // OPERATIONAL ASSISTANCE FRAMEWORK
    </footer>
  </div>

  <script>
    async function sendObjective() {
      const input = document.getElementById('objectiveInput');
      const responseBox = document.getElementById('responseBox');

      const objective = input.value.trim();

      if (!objective) {
        responseBox.innerText = 'No objective detected.';
        return;
      }

      responseBox.innerText = 'Talos processing objective...';

      try {

        // REPLACE THIS URL WITH YOUR N8N WEBHOOK
        const webhookURL = 'https://YOUR-N8N-ENDPOINT/webhook/talos-objective';

        const response = await fetch(webhookURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            objective: objective,
            timestamp: new Date().toISOString()
          })
        });

        const data = await response.json();

        responseBox.innerText = data.reply || JSON.stringify(data, null, 2);

      } catch (error) {
        console.error(error);

        responseBox.innerText =
          'Connection failure. Talos backend unreachable.\n\nCheck your n8n webhook URL.';
      }
    }
  </script>

</body>
</html>
