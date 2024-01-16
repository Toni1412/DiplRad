const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("web_btn").addEventListener("click", function (e) {
    let racun = document.getElementById("redak").innerText;
    const reply = ipcRenderer.invoke("hotspot-event", racun);
  });
});

contextBridge.exposeInMainWorld("api", {
  equery: async (query, values) => {
    const path = "./mytest.db";
    try {
      const res = await ipcRenderer.invoke("potd", path);
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await ipcRenderer.invoke(
        "executeQuery",
        query,
        fetch,
        values
      );
      document.getElementById("output").innerText = "DODAO SAM GA U BAZU";
      return res;
    } catch (error) {
      console.log(error);
      document.getElementById("output").innerText = "Output: " + error;
    }
  },
  testfetch: async (query, fetch) => {
    const path = "./mytest.db";
    try {
      const res = await ipcRenderer.invoke("potd", path);
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await ipcRenderer.invoke("executeQuery", query, fetch);
      return res;
    } catch (error) {
      document.getElementById("output").innerText = "Output: " + error;
      return error;
    }
  },
  insertValues: async (query, values) => {
    const fetch = "";
    const path = "./mytest.db";
    try {
      const res = await ipcRenderer.invoke("potd", path);
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await ipcRenderer.invoke(
        "executeQuery",
        query,
        fetch,
        values
      );
      document.getElementById("pout1").innerText = "Uspjesno obavljeno";
    } catch (error) {
      document.getElementById("pout1").innerText = "Output: " + error;
    }
  },
});
