import tkinter as tk
from tkinter import ttk, filedialog, scrolledtext
import subprocess
import threading
import queue
import os


class FFmpegGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("FFmpeg GUI Tool")
        self.root.geometry("720x680")
        self.root.resizable(True, True)
        self.log_queue = queue.Queue()

        notebook = ttk.Notebook(root)
        notebook.pack(fill="both", expand=False, padx=10, pady=10)

        self.tab1 = ttk.Frame(notebook, padding=10)
        notebook.add(self.tab1, text="  1. Fix Video (Scale / Re-encode)  ")
        self._build_fix_tab()

        self.tab2 = ttk.Frame(notebook, padding=10)
        notebook.add(self.tab2, text="  2. Add Background Music  ")
        self._build_bgm_tab()

        log_frame = ttk.LabelFrame(root, text="Output Log", padding=5)
        log_frame.pack(fill="both", expand=True, padx=10, pady=(0, 5))

        self.log = scrolledtext.ScrolledText(
            log_frame, height=10, state="disabled", font=("Courier", 9)
        )
        self.log.pack(fill="both", expand=True)

        self.progress = ttk.Progressbar(root, mode="indeterminate")
        self.progress.pack(fill="x", padx=10, pady=(0, 10))

        self.root.after(100, self._poll_log_queue)

    # ── Tab 1: Fix Video ────────────────────────────────────────────────────

    def _build_fix_tab(self):
        f = self.tab1
        f.columnconfigure(1, weight=1)

        ttk.Label(f, text="Input Video:").grid(row=0, column=0, sticky="w", pady=4)
        self.fix_input = tk.StringVar()
        ttk.Entry(f, textvariable=self.fix_input).grid(
            row=0, column=1, sticky="ew", padx=6, pady=4
        )
        ttk.Button(
            f,
            text="Browse…",
            command=lambda: self._pick_file(
                self.fix_input, [("Video files", "*.mp4 *.mov *.avi *.mkv *.webm")]
            ),
        ).grid(row=0, column=2, pady=4)

        ttk.Label(f, text="Output Video:").grid(row=1, column=0, sticky="w", pady=4)
        self.fix_output = tk.StringVar()
        ttk.Entry(f, textvariable=self.fix_output).grid(
            row=1, column=1, sticky="ew", padx=6, pady=4
        )
        ttk.Button(
            f,
            text="Save as…",
            command=lambda: self._save_file(self.fix_output),
        ).grid(row=1, column=2, pady=4)

        sep = ttk.Separator(f, orient="horizontal")
        sep.grid(row=2, column=0, columnspan=3, sticky="ew", pady=8)

        # Width / Height
        size_frame = ttk.Frame(f)
        size_frame.grid(row=3, column=0, columnspan=3, sticky="w", pady=4)
        ttk.Label(size_frame, text="Output Resolution:").pack(side="left")
        self.fix_width = tk.StringVar(value="1080")
        ttk.Entry(size_frame, textvariable=self.fix_width, width=6).pack(
            side="left", padx=(8, 2)
        )
        ttk.Label(size_frame, text="x").pack(side="left")
        self.fix_height = tk.StringVar(value="1920")
        ttk.Entry(size_frame, textvariable=self.fix_height, width=6).pack(
            side="left", padx=(2, 8)
        )
        ttk.Label(size_frame, text="(width x height)").pack(side="left")

        # CRF slider
        crf_frame = ttk.Frame(f)
        crf_frame.grid(row=4, column=0, columnspan=3, sticky="ew", pady=4)
        ttk.Label(crf_frame, text="CRF Quality (0 = best, 51 = worst):").pack(
            side="left"
        )
        self.fix_crf = tk.IntVar(value=18)
        self._crf_label = ttk.Label(crf_frame, text="18", width=3)
        ttk.Scale(
            crf_frame,
            from_=0,
            to=51,
            variable=self.fix_crf,
            orient="horizontal",
            length=220,
            command=self._update_crf_label,
        ).pack(side="left", padx=8)
        self._crf_label.pack(side="left")

        self.fix_btn = ttk.Button(
            f,
            text="Run Fix Video",
            command=self._run_fix,
        )
        self.fix_btn.grid(row=5, column=0, columnspan=3, pady=14)

    def _update_crf_label(self, val):
        self.fix_crf.set(int(float(val)))
        self._crf_label.config(text=str(int(float(val))))

    # ── Tab 2: Add BGM ──────────────────────────────────────────────────────

    def _build_bgm_tab(self):
        f = self.tab2
        f.columnconfigure(1, weight=1)

        ttk.Label(f, text="Input Video:").grid(row=0, column=0, sticky="w", pady=4)
        self.bgm_video = tk.StringVar()
        ttk.Entry(f, textvariable=self.bgm_video).grid(
            row=0, column=1, sticky="ew", padx=6, pady=4
        )
        ttk.Button(
            f,
            text="Browse…",
            command=lambda: self._pick_file(
                self.bgm_video, [("Video files", "*.mp4 *.mov *.avi *.mkv *.webm")]
            ),
        ).grid(row=0, column=2, pady=4)

        ttk.Label(f, text="BGM Audio:").grid(row=1, column=0, sticky="w", pady=4)
        self.bgm_audio = tk.StringVar()
        ttk.Entry(f, textvariable=self.bgm_audio).grid(
            row=1, column=1, sticky="ew", padx=6, pady=4
        )
        ttk.Button(
            f,
            text="Browse…",
            command=lambda: self._pick_file(
                self.bgm_audio,
                [("Audio files", "*.mp3 *.wav *.aac *.m4a *.flac *.ogg")],
            ),
        ).grid(row=1, column=2, pady=4)

        ttk.Label(f, text="Output Video:").grid(row=2, column=0, sticky="w", pady=4)
        self.bgm_output = tk.StringVar()
        ttk.Entry(f, textvariable=self.bgm_output).grid(
            row=2, column=1, sticky="ew", padx=6, pady=4
        )
        ttk.Button(
            f,
            text="Save as…",
            command=lambda: self._save_file(self.bgm_output),
        ).grid(row=2, column=2, pady=4)

        sep = ttk.Separator(f, orient="horizontal")
        sep.grid(row=3, column=0, columnspan=3, sticky="ew", pady=8)

        # Volume slider
        vol_frame = ttk.Frame(f)
        vol_frame.grid(row=4, column=0, columnspan=3, sticky="ew", pady=4)
        ttk.Label(vol_frame, text="BGM Volume (0.0 – 2.0):").pack(side="left")
        self.bgm_volume = tk.DoubleVar(value=0.3)
        self._vol_label = ttk.Label(vol_frame, text="0.30", width=5)
        ttk.Scale(
            vol_frame,
            from_=0.0,
            to=2.0,
            variable=self.bgm_volume,
            orient="horizontal",
            length=220,
            command=self._update_vol_label,
        ).pack(side="left", padx=8)
        self._vol_label.pack(side="left")

        self.bgm_btn = ttk.Button(
            f,
            text="Run Add BGM",
            command=self._run_bgm,
        )
        self.bgm_btn.grid(row=5, column=0, columnspan=3, pady=14)

    def _update_vol_label(self, val):
        self._vol_label.config(text=f"{float(val):.2f}")

    # ── File dialogs ────────────────────────────────────────────────────────

    def _pick_file(self, var, filetypes):
        path = filedialog.askopenfilename(
            filetypes=filetypes + [("All files", "*.*")]
        )
        if path:
            var.set(path)

    def _save_file(self, var):
        path = filedialog.asksaveasfilename(
            filetypes=[("MP4 video", "*.mp4"), ("All files", "*.*")],
            defaultextension=".mp4",
        )
        if path:
            var.set(path)

    # ── Logging ─────────────────────────────────────────────────────────────

    def _log(self, msg):
        self.log_queue.put(msg)

    def _poll_log_queue(self):
        while not self.log_queue.empty():
            msg = self.log_queue.get_nowait()
            self.log.config(state="normal")
            self.log.insert("end", msg + "\n")
            self.log.see("end")
            self.log.config(state="disabled")
        self.root.after(100, self._poll_log_queue)

    # ── Run commands ─────────────────────────────────────────────────────────

    def _set_buttons(self, enabled):
        state = "normal" if enabled else "disabled"
        self.fix_btn.config(state=state)
        self.bgm_btn.config(state=state)
        if enabled:
            self.progress.stop()
        else:
            self.progress.start(12)

    def _run_ffmpeg(self, cmd):
        self._log("$ " + " ".join(f'"{a}"' if " " in a else a for a in cmd))
        self.root.after(0, self._set_buttons, False)
        try:
            proc = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
            for line in proc.stdout:
                self._log(line.rstrip())
            proc.wait()
            if proc.returncode == 0:
                self._log("\n✓ Done!")
            else:
                self._log(f"\n✗ ffmpeg exited with code {proc.returncode}")
        except FileNotFoundError:
            self._log("✗ Error: ffmpeg not found. Make sure it is installed and on PATH.")
        except Exception as exc:
            self._log(f"✗ Error: {exc}")
        finally:
            self.root.after(0, self._set_buttons, True)

    def _run_fix(self):
        inp = self.fix_input.get().strip()
        if not inp:
            self._log("✗ Please select an input video file.")
            return
        out = self.fix_output.get().strip()
        if not out:
            base, _ = os.path.splitext(inp)
            out = base + "_fixed.mp4"
            self.fix_output.set(out)

        w = self.fix_width.get().strip()
        h = self.fix_height.get().strip()
        crf = str(self.fix_crf.get())

        cmd = [
            "ffmpeg", "-y",
            "-i", inp,
            "-c:v", "libx264",
            "-crf", crf,
            "-vf", f"scale={w}:{h}",
            "-c:a", "copy",
            out,
        ]
        threading.Thread(target=self._run_ffmpeg, args=(cmd,), daemon=True).start()

    def _run_bgm(self):
        video = self.bgm_video.get().strip()
        audio = self.bgm_audio.get().strip()
        if not video:
            self._log("✗ Please select an input video file.")
            return
        if not audio:
            self._log("✗ Please select a BGM audio file.")
            return
        out = self.bgm_output.get().strip()
        if not out:
            base, _ = os.path.splitext(video)
            out = base + "_with_bgm.mp4"
            self.bgm_output.set(out)

        vol = f"{self.bgm_volume.get():.2f}"

        cmd = [
            "ffmpeg", "-y",
            "-i", video,
            "-i", audio,
            "-filter_complex",
            f"[1:a]volume={vol}[bg];[0:a][bg]amix=inputs=2:duration=first[aout]",
            "-map", "0:v",
            "-map", "[aout]",
            "-c:v", "copy",
            "-c:a", "aac",
            "-shortest",
            out,
        ]
        threading.Thread(target=self._run_ffmpeg, args=(cmd,), daemon=True).start()


if __name__ == "__main__":
    root = tk.Tk()
    app = FFmpegGUI(root)
    root.mainloop()
