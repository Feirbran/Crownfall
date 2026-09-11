// Test Supabase Realtime connection and broadcast from node
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://bvdsmwylswfxfdzobscn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2ZHNtd3lsc3dmeGZkem9ic2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NDIyMjEsImV4cCI6MjEwNDQxODIyMX0.3NrfBzGJfeJAi7k_sonRdH0EqOICbJL4AddQGf1CzMw";

async function run() {
  console.log("Connecting to Supabase...");
  const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  // Test Auth / Session
  const { data: { session }, error: sErr } = await sb.auth.getSession();
  console.log("Session:", session ? "Active" : "None", sErr);

  // Test Realtime channel
  const ch = sb.channel('crownfall_room_test_diag', {
    config: { broadcast: { self: true } }
  });

  ch.on('broadcast', { event: 'game_msg' }, (payload) => {
    console.log("Node Received broadcast:", payload);
  });

  ch.subscribe((status, err) => {
    console.log("Channel subscribe status:", status, "Error:", err, "Channel state:", ch.state);
    if (status === 'SUBSCRIBED') {
      console.log("Sending test broadcast message...");
      ch.send({
        type: 'broadcast',
        event: 'game_msg',
        payload: { test: true, sender: 'node' }
      }).then(res => {
        console.log("Send result:", res);
        setTimeout(() => {
          sb.removeChannel(ch);
          process.exit(0);
        }, 1000);
      }).catch(e => {
        console.error("Send error:", e);
      });
    }
  });
}

run();
