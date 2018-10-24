import AppClient from "./client";
import { ServerGlobal } from "../server";

// Below is a hack to NOT use the `initialState` functionality
// in choo, but instead defining globals that the client can
// then interpret for itself / load up / etc. OUTSIDE of just
// initial state...

const server = ((window as any) as {
  __SERVER: ServerGlobal;
}).__SERVER;

new AppClient({
  appServerState: server.appServerState,
  isDev: server.isDev,
  isServer: false,
  initialRoute: server.initialRoute
});

delete (window as any).__SERVER;
