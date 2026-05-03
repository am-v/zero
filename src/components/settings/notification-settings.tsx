
import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/lib/toast";
import {
  checkNotificationPermission,
  getNotificationSettings,
  NotificationSettings as NotificationSettingsType,
} from "@/lib/notification";

export function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettingsType>(() => getNotificationSettings());
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notification_settings", JSON.stringify(settings));
    // Dispatch event for other components (like PomodoroTimer)
    window.dispatchEvent(new CustomEvent("notification_settings_changed", { detail: settings }));
  }, [settings]);

  const handleRequestPermission = async () => {
    const hasPermission = await checkNotificationPermission();
    setPermission(Notification.permission);
    
    if (hasPermission) {
      toast.success("Notifications enabled", {
        description: "You will now receive alerts for your focus sessions.",
      });
    } else if (Notification.permission === "denied") {
      toast.error("Permission denied", {
        description: "Please enable notifications in your browser settings.",
      });
    }
  };

  const toggleSetting = (key: keyof NotificationSettingsType) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Enable Notifications</Label>
          <p className="text-sm text-muted-foreground">
            Get notified when focus sessions and breaks end.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {permission !== "granted" && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRequestPermission}
              className="h-8"
            >
              Request Permission
            </Button>
          )}
          <Switch
            checked={settings.enabled}
            onCheckedChange={() => toggleSetting("enabled")}
          />
        </div>
      </div>

      <div className={settings.enabled ? "space-y-4" : "space-y-4 opacity-50 pointer-events-none"}>
        <div className="flex items-center justify-between">
          <Label htmlFor="pomodoro-notif">Pomodoro Notifications</Label>
          <Switch
            id="pomodoro-notif"
            checked={settings.pomodoroNotifications}
            onCheckedChange={() => toggleSetting("pomodoroNotifications")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="habit-notif">Habit Reminders</Label>
          <Switch
            id="habit-notif"
            checked={settings.habitReminders}
            onCheckedChange={() => toggleSetting("habitReminders")}
          />
        </div>
      </div>
      
      {permission === "denied" && (
        <p className="text-xs text-destructive flex items-center gap-1.5 mt-2">
          <X className="h-3 w-3" />
          Browser notifications are blocked. Please enable them in your browser settings.
        </p>
      )}
      {permission === "granted" && (
        <p className="text-xs text-green-500 flex items-center gap-1.5 mt-2">
          <Check className="h-3 w-3" />
          Browser notification permission granted.
        </p>
      )}
    </div>
  );
}
