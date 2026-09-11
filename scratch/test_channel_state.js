// Test supabase channel state
const fs = require('fs');
const code = fs.readFileSync('scratch/supabase.umd.js', 'utf8');

global.WebSocket = global.WebSocket || require('ws');
const supabase = new Function('global', code + '; return supabase;')(global);

const createClient = supabase.createClient;
const SUPABASE_URL = "https://bvdsmwylswfxfdzobscn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2ZHNtd3lsc3dmeGZkem9ic2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NDIyMjEsImV4cCI6MjEwNDQxODIyMX0.3NrfBzGJfeJAi7k_sonRdH0EqOICbJL4AddQGf1CzMw";

const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ch = sb.channel('crownfall_test_state_123', {
  config: { broadcast: { self: true } }
});

console.log('Channel initial state:', ch.state, 'subState:', ch.subState);

ch.subscribe((status, err) => {
  console.log('STATUS:', status, 'ERR:', err);
  console.log('Channel state at callback:', ch.state, 'isJoined?:', ch.state === 'joined');
  
  if (status === 'SUBSCRIBED') {
    ch.send({
      type: 'broadcast',
      event: 'game_msg',
      payload: { hello: 'world' }
    }).then(res => {
      console.log('SEND RESULT:', res);
      sb.removeChannel(ch);
      process.exit(0);
    }).catch(e => {
      console.error('SEND ERR:', e);
      sb.removeChannel(ch);
      process.exit(1);
    });
  }
});
