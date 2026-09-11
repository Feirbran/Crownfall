// Test two clients communicating over Supabase Realtime
const fs = require('fs');
const code = fs.readFileSync('scratch/supabase.umd.js', 'utf8');

global.WebSocket = global.WebSocket || require('ws');
const supabase = new Function('global', code + '; return supabase;')(global);
const createClient = supabase.createClient;

const SUPABASE_URL = "https://bvdsmwylswfxfdzobscn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2ZHNtd3lsc3dmeGZkem9ic2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NDIyMjEsImV4cCI6MjEwNDQxODIyMX0.3NrfBzGJfeJAi7k_sonRdH0EqOICbJL4AddQGf1CzMw";

const roomCode = 'cf_diag_' + Math.floor(1000 + Math.random() * 9000);
const channelName = 'crownfall_room_' + roomCode;

console.log('Testing room:', roomCode, 'channel:', channelName);

// Client 1: Host
const sbHost = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const hostCh = sbHost.channel(channelName, { config: { broadcast: { self: false } } });

// Client 2: Guest
const sbGuest = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const guestCh = sbGuest.channel(channelName, { config: { broadcast: { self: false } } });

hostCh.on('broadcast', { event: 'game_msg' }, ({ payload }) => {
  console.log('HOST received broadcast:', payload);
  if (payload.type === 'HELLO_JOIN') {
    console.log('HOST replying with HELLO_HOST...');
    hostCh.send({
      type: 'broadcast',
      event: 'game_msg',
      payload: { type: 'HELLO_HOST', p1: 'ready' }
    });
  }
});

guestCh.on('broadcast', { event: 'game_msg' }, ({ payload }) => {
  console.log('GUEST received broadcast:', payload);
  if (payload.type === 'HELLO_HOST') {
    console.log('>>> SUCCESS! Two-way communication verified! <<<');
    setTimeout(() => {
      sbHost.removeChannel(hostCh);
      sbGuest.removeChannel(guestCh);
      process.exit(0);
    }, 500);
  }
});

hostCh.subscribe((status) => {
  console.log('Host channel status:', status);
  if (status === 'SUBSCRIBED') {
    console.log('Host subscribed. Now subscribing guest...');
    guestCh.subscribe((gStatus) => {
      console.log('Guest channel status:', gStatus);
      if (gStatus === 'SUBSCRIBED') {
        console.log('Guest subscribed. Guest sending HELLO_JOIN...');
        guestCh.send({
          type: 'broadcast',
          event: 'game_msg',
          payload: { type: 'HELLO_JOIN', username: 'TesterGuest' }
        }).then(res => console.log('Guest send result:', res));
      }
    });
  }
});
