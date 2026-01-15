import { useState, useEffect } from "react";
import { Plus, X, Globe, AppWindow, Save, FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
  SelectAppFile,
  GetOS,
  LoadSettings,
  SaveSettings,
} from "@wailsjs/go/main/App";
import { main } from "@wailsjs/go/models";

const RICK_ROLL_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

export function Settings() {
  const [urls, setUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState("");

  const [apps, setApps] = useState<string[]>([]);
  const [newApp, setNewApp] = useState("");
  const [os, setOs] = useState<string>("");

  useEffect(() => {
    GetOS().then(setOs);
    LoadSettings().then((config: main.Config) => {
      if (config) {
        setUrls(config.auto_open_urls || []);
        setApps(config.allowed_apps || []);
      }
    });
  }, []);

  const handleSave = async () => {
    const config = new main.Config({
      auto_open_urls: urls,
      allowed_apps: apps,
    });
    try {
      const msg = await SaveSettings(config);
      console.log(msg); // Optional: Add toast notification
    } catch (err) {
      console.error("Failed to save settings:", err);
    }
  };

  const handleBrowseApp = async () => {
    try {
      const path = await SelectAppFile();
      if (path) {
        setNewApp(path);
      }
    } catch (err) {
      console.error("Failed to select file:", err);
    }
  };

  const handleAddUrl = () => {
    if (newUrl && !urls.includes(newUrl)) {
      setUrls([...urls, newUrl]);
      setNewUrl("");
    }
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    setUrls(urls.filter((url) => url !== urlToRemove));
  };

  const handleAddApp = () => {
    if (newApp && !apps.includes(newApp)) {
      setApps([...apps, newApp]);
      setNewApp("");
    }
  };

  const handleRemoveApp = (appToRemove: string) => {
    setApps(apps.filter((app) => app !== appToRemove));
  };

  return (
    <div className="flex flex-col gap-6 h-full pb-6">
      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">Settings</h1>
          <p className="text-secondary">
            Configure blocking and monitoring rules.
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-6 overflow-y-auto pr-2">
        {/* URL Configuration */}
        <section className="bg-surface rounded-3xl p-6 shadow-soft border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <Globe size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">Auto-Open URLs</h2>
              <p className="text-sm text-secondary">
                Websites to automatically launch on startup
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Enter domain (e.g., youtube.com)"
              className="flex-1 bg-main text-primary border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-mono text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleAddUrl()}
            />
            <Button onClick={handleAddUrl} disabled={!newUrl}>
              <Plus className="w-4 h-4 mr-2" /> Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {urls.map((url) => (
                <motion.div
                  key={url}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-main border border-border rounded-xl pl-3 pr-1 py-1 flex items-center gap-2"
                >
                  <span className="text-sm font-medium text-primary">
                    {/* Troll Masking: Show as youtube.com if it's the Rick Roll URL */}
                    {url === RICK_ROLL_URL ? "youtube.com" : url}
                  </span>
                  <button
                    onClick={() => handleRemoveUrl(url)}
                    className="p-1 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {urls.length === 0 && (
              <p className="text-secondary text-sm italic py-2">
                No URLs configured.
              </p>
            )}
          </div>
        </section>

        {/* App Configuration */}
        <section className="bg-surface rounded-3xl p-6 shadow-soft border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <AppWindow size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">
                Allowed Applications
              </h2>
              <p className="text-sm text-secondary">
                Apps permitted during focus sessions
                {os && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-accent/10 text-accent text-xs font-mono uppercase border border-accent/20">
                    {os} Detected
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newApp}
              onChange={(e) => setNewApp(e.target.value)}
              placeholder={
                os === "windows"
                  ? "Enter path (e.g., C:\\Program Files\\App.exe)"
                  : "Enter path (e.g., /usr/bin/app or /Applications/App.app)"
              }
              className="flex-1 bg-main text-primary border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleAddApp()}
            />
            <Button
              onClick={handleBrowseApp}
              variant="secondary"
              title="Browse File"
            >
              <FolderSearch className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleAddApp}
              disabled={!newApp}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Add
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <AnimatePresence>
              {apps.map((app) => (
                <motion.div
                  key={app}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="bg-main border border-border rounded-xl p-3 flex items-center justify-between group"
                >
                  <code className="text-xs sm:text-sm text-secondary font-mono break-all">
                    {app}
                  </code>
                  <button
                    onClick={() => handleRemoveApp(app)}
                    className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {apps.length === 0 && (
              <p className="text-secondary text-sm italic py-2">
                No specific apps allow-listed.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
