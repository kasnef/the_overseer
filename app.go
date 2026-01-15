package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"runtime"
	"time"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// GetOS returns the current operating system
func (a *App) GetOS() string {
	return runtime.GOOS
}

// SelectAppFile opens a file dialog to select an application based on OS
func (a *App) SelectAppFile() (string, error) {
	var filters []wailsRuntime.FileFilter

	switch runtime.GOOS {
	case "windows":
		filters = []wailsRuntime.FileFilter{
			{DisplayName: "Executables (*.exe)", Pattern: "*.exe"},
		}
	case "darwin": // macOS
		filters = []wailsRuntime.FileFilter{
			{DisplayName: "Applications (*.app)", Pattern: "*.app"},
		}
	default: // linux and others
		filters = []wailsRuntime.FileFilter{
			{DisplayName: "All Files", Pattern: "*"},
		}
	}

	selection, err := wailsRuntime.OpenFileDialog(a.ctx, wailsRuntime.OpenDialogOptions{
		Title:   "Select Application",
		Filters: filters,
	})

	return selection, err
}
const configFileName = "config.json"
const rickRollURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

// Config struct
type Config struct {
	AutoOpenURLs []string `json:"auto_open_urls"`
	AllowedApps  []string `json:"allowed_apps"`
}

// LoadSettings loads config from file or returns default
func (a *App) LoadSettings() Config {
	file, err := os.ReadFile(configFileName)
	if err != nil {
		// Return default config with Rick Roll
		return Config{
			AutoOpenURLs: []string{rickRollURL, "tiktok.com", "facebook.com"},
			AllowedApps:  []string{},
		}
	}

	var config Config
	err = json.Unmarshal(file, &config)
	if err != nil {
		return Config{
			AutoOpenURLs: []string{rickRollURL},
			AllowedApps:  []string{},
		}
	}
	return config
}

// SaveSettings saves config to file
func (a *App) SaveSettings(config Config) string {
	data, err := json.MarshalIndent(config, "", "  ")
	if err != nil {
		return fmt.Sprintf("Error marshalling config: %s", err)
	}
	err = os.WriteFile(configFileName, data, 0644)
	if err != nil {
		return fmt.Sprintf("Error writing config: %s", err)
	}
	return "Settings saved successfully"
}

// OpenBrowser opens a URL in the default browser
func (a *App) OpenBrowser(url string) error {
	var cmd string
	var args []string

	switch runtime.GOOS {
	case "windows":
		cmd = "cmd"
		args = []string{"/c", "start", url}
	case "darwin":
		cmd = "open"
		args = []string{url}
	default: // "linux", "freebsd", "openbsd", "netbsd"
		cmd = "xdg-open"
		args = []string{url}
	}
	return exec.Command(cmd, args...).Start()
}

// SendNotification sends a system notification
func (a *App) SendNotification(title string, message string) error {
	var cmd string
	var args []string

	switch runtime.GOOS {
	case "windows":
		// Powerhell BurntToast or just msg
		// Simple approach: PowerShell balloon tip or msg
		cmd = "powershell"
		script := fmt.Sprintf(`[reflection.assembly]::loadwithpartialname("System.Windows.Forms"); [system.windows.forms.messagebox]::show("%s", "%s")`, message, title)
		args = []string{"-Command", script}
	case "darwin":
		// macOS AppleScript
		cmd = "osascript"
		script := fmt.Sprintf(`display notification "%s" with title "%s" sound name "Ping"`, message, title)
		args = []string{"-e", script}
	default: // linux use notify-send
		cmd = "notify-send"
		args = []string{title, message, "-u", "critical"}
	}

	return exec.Command(cmd, args...).Start()
}

// Task struct
type Task struct {
	ID         string    `json:"id"`
	Title      string    `json:"title"`
	Deadline   time.Time `json:"deadline"`
	Status     string    `json:"status"`
	AlertLevel int       `json:"alertLevel"`
}

const tasksFileName = "tasks.json"

// LoadTasks loads tasks from file
func (a *App) LoadTasks() []Task {
	file, err := os.ReadFile(tasksFileName)
	if err != nil {
		return []Task{}
	}

	var tasks []Task
	err = json.Unmarshal(file, &tasks)
	if err != nil {
		return []Task{}
	}
	return tasks
}

// SaveTasks saves tasks to file
func (a *App) SaveTasks(tasks []Task) string {
	data, err := json.MarshalIndent(tasks, "", "  ")
	if err != nil {
		return fmt.Sprintf("Error marshalling tasks: %s", err)
	}
	err = os.WriteFile(tasksFileName, data, 0644)
	if err != nil {
		return fmt.Sprintf("Error writing tasks: %s", err)
	}
	return "Tasks saved successfully"
}
